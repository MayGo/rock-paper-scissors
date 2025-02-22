import {
    CASHING_OUT_ANIMATION_DURATION,
    MAX_BETS,
    START_BALANCE,
    THINKING_TIME,
    WAIT_UNTIL_CASCHED
} from '@/utils/constants';
import { showMaxBetsReachedMessage } from '@/utils/messages';
import { HANDS } from '@/utils/types';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useGameState } from './gameState';
import { PHASES } from './gameState.types';

vi.mock('@/utils/messages', () => ({
    showMaxBetsReachedMessage: vi.fn()
}));

describe('Game State Management', () => {
    beforeEach(() => {
        useGameState.setState(useGameState.getInitialState());
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('Initial State', () => {
        test('should have correct initial values', () => {
            const state = useGameState.getState();
            expect(state.balance).toBe(0);
            expect(state.phase).toBe(PHASES.INITIAL);
            expect(state.currentBets).toEqual({
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            });
        });
    });

    describe('Game Flow', () => {
        test('should start game with correct values', () => {
            const { startGame } = useGameState.getState();
            startGame();

            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE);
            expect(state.winCount).toBe(0);
            expect(state.phase).toBe(PHASES.ROUND_STARTED);
        });

        test('should handle betting flow', () => {
            const { startGame, addBet } = useGameState.getState();
            startGame();

            addBet(HANDS.ROCK, 10);

            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE - 10);
            expect(state.currentBets[HANDS.ROCK]).toEqual([10]);
        });

        test('should handle full round flow', () => {
            const { startGame, addBet, playRound } = useGameState.getState();
            startGame();
            addBet(HANDS.ROCK, 10);
            playRound();

            expect(useGameState.getState().phase).toBe(PHASES.ROUND_THINKING);

            vi.advanceTimersByTime(THINKING_TIME);
            expect(useGameState.getState().phase).toBe(PHASES.ROUND_RESULTS);
            expect(useGameState.getState().computerHand).toBeDefined();
            expect(useGameState.getState().playerHand).toBeDefined();

            vi.advanceTimersByTime(WAIT_UNTIL_CASCHED);
            expect(useGameState.getState().phase).toBe(PHASES.ROUND_CASHED);

            vi.advanceTimersByTime(CASHING_OUT_ANIMATION_DURATION);
            expect(useGameState.getState().currentBets).toEqual({
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            });
        });
    });

    describe('Betting Mechanics', () => {
        test('should not allow bets when not in ROUND_STARTED phase', () => {
            const { startGame, addBet, playRound } = useGameState.getState();
            startGame();
            playRound();

            addBet(HANDS.ROCK, 10);
            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE);
        });

        test('should enforce max bets limit', () => {
            const { startGame, addBet } = useGameState.getState();
            startGame();

            for (let i = 0; i < MAX_BETS + 1; i++) {
                addBet(Object.values(HANDS)[i % 3], 10);
            }

            expect(showMaxBetsReachedMessage).toHaveBeenCalled();
            expect(useGameState.getState().balance).toBe(START_BALANCE - 10 * MAX_BETS);
        });

        test('should clear bets and refund balance', () => {
            const { startGame, addBet, clearBet } = useGameState.getState();
            startGame();

            expect(useGameState.getState().balance).toBe(START_BALANCE);
            addBet(HANDS.ROCK, 10);
            clearBet(HANDS.ROCK);

            expect(useGameState.getState().balance).toBe(START_BALANCE);
            expect(useGameState.getState().currentBets[HANDS.ROCK]).toEqual([]);
        });
    });

    describe('Round Management', () => {
        test('should reset round state correctly', () => {
            const { startGame, addBet, playRound, resetRound } = useGameState.getState();
            startGame();
            addBet(HANDS.ROCK, 10);
            playRound();
            resetRound();

            const state = useGameState.getState();
            expect(state.phase).toBe(PHASES.ROUND_STARTED);
            expect(state.computerHand).toBeUndefined();
            expect(state.playerHand).toBeUndefined();
            expect(state.currentBets).toEqual({
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            });
        });
    });
});
