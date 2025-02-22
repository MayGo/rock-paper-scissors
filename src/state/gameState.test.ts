import {
    CASHING_OUT_ANIMATION_DURATION,
    CHIP_VALUE,
    START_BALANCE,
    THINKING_TIME,
    WAIT_UNTIL_CASCHED
} from '@/utils/constants';
import { showMaxBetsReachedMessage } from '@/utils/messages';
import { HANDS } from '@/utils/types';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useGameState } from './gameState';
import * as gameStateRandomizer from './gameState.randomizer';
import { PHASES } from './gameState.types';
import { sumChips } from './gameState.utils';

vi.mock('@/utils/messages', () => ({
    showMaxBetsReachedMessage: vi.fn()
}));

vi.mock('./gameState.randomizer', () => ({
    getRandomHand: vi.fn()
}));

const stateFunctions = {
    addBet: expect.any(Function),
    clearBet: expect.any(Function),
    incrementWinCount: expect.any(Function),
    increaseBalance: expect.any(Function),
    decreaseBalance: expect.any(Function),
    resetRound: expect.any(Function),
    startGame: expect.any(Function),
    playRound: expect.any(Function)
};

const BET_AMOUNT = CHIP_VALUE;

describe('Game State Management', () => {
    beforeEach(() => {
        useGameState.setState(useGameState.getInitialState());
        vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    describe('Initial State', () => {
        test('should have correct initial values', () => {
            const state = useGameState.getState();
            expect(state).toEqual({
                balance: 0,
                phase: PHASES.INITIAL,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: undefined,
                playerHand: undefined,
                roundResult: undefined,
                ...stateFunctions
            });
        });
    });

    describe('Game Flow', () => {
        test('should start game with correct values', () => {
            const { startGame } = useGameState.getState();
            startGame();

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE,
                phase: PHASES.ROUND_STARTED,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: undefined,
                playerHand: undefined,
                roundResult: undefined,
                ...stateFunctions
            });
        });

        test('should handle betting flow', () => {
            const { startGame, addBet } = useGameState.getState();

            startGame();
            addBet(HANDS.ROCK, BET_AMOUNT);

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT,
                phase: PHASES.ROUND_STARTED,
                currentBets: {
                    [HANDS.ROCK]: [BET_AMOUNT],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: undefined,
                playerHand: undefined,
                roundResult: undefined,
                ...stateFunctions
            });
        });

        test('should handle full round flow', () => {
            const { startGame, addBet, playRound } = useGameState.getState();
            startGame();
            addBet(HANDS.ROCK, BET_AMOUNT);
            playRound();

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT,
                phase: PHASES.ROUND_THINKING,
                currentBets: {
                    [HANDS.ROCK]: [BET_AMOUNT],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: undefined,
                playerHand: undefined,
                roundResult: undefined,
                ...stateFunctions
            });

            vi.advanceTimersByTime(THINKING_TIME);

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT,
                phase: PHASES.ROUND_RESULTS,
                currentBets: {
                    [HANDS.ROCK]: [BET_AMOUNT],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: HANDS.PAPER,
                playerHand: HANDS.ROCK,
                roundResult: {
                    playerWon: false,
                    amount: 0,
                    bestHand: HANDS.ROCK
                },
                ...stateFunctions
            });

            vi.advanceTimersByTime(WAIT_UNTIL_CASCHED);
            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT,
                phase: PHASES.ROUND_CASHED,
                currentBets: {
                    [HANDS.ROCK]: [BET_AMOUNT],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: HANDS.PAPER,
                playerHand: HANDS.ROCK,
                roundResult: {
                    playerWon: false,
                    amount: 0,
                    bestHand: HANDS.ROCK
                },
                ...stateFunctions
            });

            vi.advanceTimersByTime(CASHING_OUT_ANIMATION_DURATION);
            // Clear bets
            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT,
                phase: PHASES.ROUND_CASHED,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 0,
                computerHand: HANDS.PAPER,
                playerHand: HANDS.ROCK,
                roundResult: {
                    playerWon: false,
                    amount: 0,
                    bestHand: HANDS.ROCK
                },
                ...stateFunctions
            });
        });

        test('should handle win counting correctly', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.SCISSORS, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED);

            const winAmount = BET_AMOUNT * 14;

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT + winAmount,
                phase: PHASES.ROUND_CASHED,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: [BET_AMOUNT]
                },
                winCount: 1,
                computerHand: HANDS.PAPER,
                playerHand: HANDS.SCISSORS,
                roundResult: {
                    playerWon: true,
                    amount: winAmount,
                    bestHand: HANDS.SCISSORS
                },
                ...stateFunctions
            });

            expect(useGameState.getState().winCount).toBe(1);
        });
    });

    describe('Betting Rules', () => {
        test('should enforce minimum bet amount', () => {
            const { startGame, addBet } = useGameState.getState();
            startGame();

            addBet(HANDS.ROCK, 0);
            expect(useGameState.getState().currentBets[HANDS.ROCK]).toEqual([]);

            addBet(HANDS.ROCK, -100);
            expect(useGameState.getState().currentBets[HANDS.ROCK]).toEqual([]);
        });

        test('should not allow betting on all three positions', () => {
            const { startGame, addBet } = useGameState.getState();
            startGame();

            addBet(HANDS.ROCK, BET_AMOUNT);
            addBet(HANDS.PAPER, BET_AMOUNT);
            addBet(HANDS.SCISSORS, BET_AMOUNT);

            const state = useGameState.getState();
            expect(showMaxBetsReachedMessage).toHaveBeenCalled();
            // Should only allow first two bets
            expect(sumChips(state.currentBets[HANDS.ROCK])).toBe(BET_AMOUNT);
            expect(sumChips(state.currentBets[HANDS.PAPER])).toBe(BET_AMOUNT);
            expect(sumChips(state.currentBets[HANDS.SCISSORS])).toBe(0);
        });
    });

    describe('Winning Mechanics', () => {
        test('should apply 14x multiplier for single position win', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.SCISSORS, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED);

            const winAmount = BET_AMOUNT * 14;

            expect(useGameState.getState().balance).toBe(START_BALANCE - BET_AMOUNT + winAmount);
        });

        test('should apply 3x multiplier for two position win', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.SCISSORS, BET_AMOUNT);
            addBet(HANDS.ROCK, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED);

            const winAmount = BET_AMOUNT * 3;

            expect(useGameState.getState().balance).toBe(START_BALANCE - BET_AMOUNT * 2 + winAmount);
        });

        test('should return bet amount on tie', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.PAPER, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED);

            // Should return original bet on tie
            expect(useGameState.getState().balance).toBe(START_BALANCE);
        });

        test('should not return bet amount on tie if 2 bets', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.PAPER, BET_AMOUNT);
            addBet(HANDS.ROCK, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED);
            expect(useGameState.getState().balance).toBe(START_BALANCE - BET_AMOUNT * 2);
        });
    });

    describe('Betting Mechanics', () => {
        test('should not allow bets when not in ROUND_STARTED phase', () => {
            const { startGame, addBet, playRound } = useGameState.getState();
            startGame();
            playRound();

            addBet(HANDS.ROCK, BET_AMOUNT);
            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE);
        });

        test('should clear bets and refund balance', () => {
            const { startGame, addBet, clearBet } = useGameState.getState();
            startGame();

            expect(useGameState.getState().balance).toBe(START_BALANCE);
            addBet(HANDS.ROCK, BET_AMOUNT);
            clearBet(HANDS.ROCK);

            expect(useGameState.getState().balance).toBe(START_BALANCE);
            expect(useGameState.getState().currentBets[HANDS.ROCK]).toEqual([]);
        });

        test('should not return bet amount on loss', () => {
            const { startGame, addBet, playRound } = useGameState.getState();

            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);

            startGame();
            addBet(HANDS.ROCK, BET_AMOUNT);
            playRound();

            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED + CASHING_OUT_ANIMATION_DURATION);

            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE - BET_AMOUNT);
        });

        test('should prevent bets when insufficient balance', () => {
            const { startGame, addBet } = useGameState.getState();
            startGame();

            // Try to bet more than balance
            addBet(HANDS.ROCK, START_BALANCE + BET_AMOUNT);

            const state = useGameState.getState();
            expect(state.balance).toBe(START_BALANCE);
            expect(state.currentBets[HANDS.ROCK]).toEqual([]);
        });
    });

    describe('Round Management', () => {
        test('should reset round state correctly', () => {
            const { startGame, addBet, playRound, resetRound } = useGameState.getState();
            startGame();
            vi.spyOn(gameStateRandomizer, 'getRandomHand').mockReturnValue(HANDS.PAPER);
            addBet(HANDS.SCISSORS, BET_AMOUNT);
            playRound();
            vi.advanceTimersByTime(THINKING_TIME + WAIT_UNTIL_CASCHED + CASHING_OUT_ANIMATION_DURATION);
            const winAmount = BET_AMOUNT * 14;

            resetRound();

            expect(useGameState.getState()).toEqual({
                balance: START_BALANCE - BET_AMOUNT + winAmount,
                phase: PHASES.ROUND_STARTED,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                winCount: 1,
                computerHand: undefined,
                playerHand: undefined,
                roundResult: undefined,
                ...stateFunctions
            });
        });
    });
});
