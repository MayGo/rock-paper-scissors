import {
    CASHING_OUT_ANIMATION_DURATION,
    MAX_BETS,
    START_BALANCE,
    THINKING_TIME,
    WAIT_UNTIL_CASCHED
} from '@/utils/constants';
import { showMaxBetsReachedMessage } from '@/utils/messages';
import { create } from 'zustand';
import { Hand, HANDS } from '../utils/types';
import { getRandomHand } from './gameState.randomizer';
import { GameState, Phase, PHASES, RoundResult } from './gameState.types';
import { getBetsWithValues, getPlayerRoundResult, sumChips } from './gameState.utils';

export const useGameState = create<GameState>((set, get) => ({
    balance: 0,
    winCount: 0,
    currentBets: {
        // Keep track of all bets for each hand, each bet is an array of numbers, or chips
        // At some point we could only add different chip constants in here. Currently we have only one chip value.
        // Using this to show the total bets for each hand. And in UI show the Chips visually.
        [HANDS.ROCK]: [] as number[],
        [HANDS.PAPER]: [] as number[],
        [HANDS.SCISSORS]: [] as number[]
    },
    phase: PHASES.INITIAL as Phase,
    computerHand: undefined,
    playerHand: undefined,
    roundResult: undefined as RoundResult | undefined,
    startGame: () =>
        set({
            balance: START_BALANCE,
            winCount: 0,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            },
            computerHand: undefined,
            playerHand: undefined,
            phase: PHASES.ROUND_STARTED
        }),
    playRound: () => {
        set({ phase: PHASES.ROUND_THINKING });

        // Use setTimeout to transition to ROUND_ENDED after 2 seconds
        setTimeout(() => {
            const computerHand = getRandomHand();

            const playerRoundResult = getPlayerRoundResult(get().currentBets, computerHand);

            const playerHand = playerRoundResult.bestHand;

            set({
                phase: PHASES.ROUND_RESULTS,
                computerHand,
                playerHand,
                roundResult: playerRoundResult
            });

            setTimeout(() => {
                set({
                    phase: PHASES.ROUND_CASHED
                });

                if (playerRoundResult.playerWon) {
                    get().incrementWinCount();
                }

                if (playerRoundResult.amount > 0) {
                    get().increaseBalance(playerRoundResult.amount);
                }

                setTimeout(() => {
                    set({
                        currentBets: {
                            [HANDS.ROCK]: [],
                            [HANDS.PAPER]: [],
                            [HANDS.SCISSORS]: []
                        }
                    });
                }, CASHING_OUT_ANIMATION_DURATION);
            }, WAIT_UNTIL_CASCHED);
        }, THINKING_TIME);
    },
    resetRound: () =>
        set(() => ({
            phase: PHASES.ROUND_STARTED,
            computerHand: undefined,
            playerHand: undefined,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            },
            roundResult: undefined
        })),
    increaseBalance: (by: number) => set((state) => ({ balance: state.balance + by })),
    decreaseBalance: (by: number) => set((state) => ({ balance: state.balance - by })),
    incrementWinCount: () => set((state) => ({ winCount: state.winCount + 1 })),

    addBet: (bet: Hand, amount: number) =>
        set((state) => {
            if (amount <= 0) return state;

            if (state.phase !== PHASES.ROUND_STARTED) return state;

            const newBalance = state.balance - amount;
            if (newBalance < 0) return state;

            const handsThatHaveBets = getBetsWithValues(state.currentBets).map(({ hand }) => hand);
            if (handsThatHaveBets.length >= MAX_BETS && !handsThatHaveBets.includes(bet)) {
                showMaxBetsReachedMessage();
                return state;
            }

            return {
                balance: newBalance,
                currentBets: { ...state.currentBets, [bet]: [...state.currentBets[bet], amount] }
            };
        }),
    clearBet: (bet: Hand) =>
        set((state) => {
            if (state.phase !== PHASES.ROUND_STARTED) return state;

            return {
                balance: state.balance + sumChips(state.currentBets[bet]),
                currentBets: {
                    ...state.currentBets,
                    [bet]: []
                }
            };
        })
}));
