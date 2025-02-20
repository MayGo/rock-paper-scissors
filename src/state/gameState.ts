import { START_BALANCE } from '@/utils/constants';
import { showMaxBetsReachedMessage } from '@/utils/messages';
import { create } from 'zustand';
import { Hand, HANDS } from '../utils/types';
import { getBetsWithValues, getPlayerRoundResult, getRandomHand, Phase, PHASES, sumChips } from './gameState.utils';

type CurrentBets = {
    [key in Hand]: number[];
};

interface GameState {
    balance: number;
    winCount: number;
    currentBets: CurrentBets;
    phase: Phase;
    computerHand: Hand | null;
    playerHand: Hand | null;
    startGame: () => void;
    playRound: () => void;
    resetRound: () => void;
    increaseBalance: (by: number) => void;
    decreaseBalance: (by: number) => void;
    incrementWinCount: () => void;
    addBet: (bet: Hand, amount: number) => void;
    clearBet: (bet: Hand) => void;
}

const THINKING_TIME = 2000;
const WAIT_UNTIL_RESET = 3000;
const MAX_BETS = 2;

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
    computerHand: null as Hand | null,
    playerHand: null as Hand | null,
    startGame: () =>
        set({
            balance: START_BALANCE,
            winCount: 0,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            },
            computerHand: null,
            playerHand: null,
            phase: PHASES.ROUND_STARTED
        }),
    playRound: () => {
        set({ phase: PHASES.ROUND_THINKING });

        // Use setTimeout to transition to ROUND_ENDED after 2 seconds
        setTimeout(() => {
            const computerHand = getRandomHand();

            const playerRoundResult = getPlayerRoundResult(get().currentBets, computerHand);

            if (playerRoundResult.playerWon) {
                get().incrementWinCount();
            }

            const playerHand = playerRoundResult.bestHand;

            if (playerRoundResult.amount > 0) {
                get().increaseBalance(playerRoundResult.amount);
            }

            set({
                phase: PHASES.ROUND_RESULTS,
                computerHand,
                playerHand
            });

            setTimeout(() => {
                set({ phase: PHASES.ROUND_CASHED });
            }, WAIT_UNTIL_RESET);
        }, THINKING_TIME);
    },
    resetRound: () =>
        set(() => ({
            phase: PHASES.ROUND_STARTED,
            computerHand: null,
            playerHand: null,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            }
        })),
    increaseBalance: (by: number) => set((state) => ({ balance: state.balance + by })),
    decreaseBalance: (by: number) => set((state) => ({ balance: state.balance - by })),
    incrementWinCount: () => set((state) => ({ winCount: state.winCount + 1 })),

    addBet: (bet: Hand, amount: number) =>
        set((state) => {
            if (amount <= 0) return state;

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
        set((state) => ({
            balance: state.balance + sumChips(state.currentBets[bet]),
            currentBets: {
                ...state.currentBets,
                [bet]: []
            }
        }))
}));
