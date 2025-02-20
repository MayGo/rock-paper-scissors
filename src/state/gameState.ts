import { START_BALANCE, WIN_RATE_1_POSITION, WIN_RATE_2_POSITIONS } from '@/utils/constants';
import { showLoseMessage, showTieMessage, showWinMessage } from '@/utils/messages';
import { create } from 'zustand';
import { Hand, HANDS } from '../utils/types';
import { didPlayerWin, getRandomHand, Phase, PHASES, sumChips } from './gameState.utils';

interface GameState {
    balance: number;
    winAmount: number;
    currentBets: { [key in Hand]: number[] };
    phase: Phase;
    computerHand: Hand | null;
    startGame: () => void;
    playRound: () => void;
    resetRound: () => void;
    increaseBalance: (by: number) => void;
    decreaseBalance: (by: number) => void;
    increaseWinAmount: (by: number) => void;
    addBet: (bet: Hand, amount: number) => void;
    clearBet: (bet: Hand) => void;
}

export const useGameState = create<GameState>((set, get) => ({
    balance: 0,
    winAmount: 0,
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
    startGame: () =>
        set({
            balance: START_BALANCE,
            winAmount: 0,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            },
            computerHand: null,
            phase: PHASES.ROUND_STARTED
        }),
    playRound: () => {
        set({ phase: PHASES.ROUND_THINKING }); // Set phase to ROUND_THINKING

        // Use setTimeout to transition to ROUND_ENDED after 2 seconds
        setTimeout(() => {
            const totalBets = Object.values(get().currentBets).reduce((sum, bet) => sum + sumChips(bet), 0);
            if (totalBets === 0) return;

            const computerHand = getRandomHand();
            console.log('computerHand....', computerHand);

            const betsWithValue = Object.entries(get().currentBets)
                .filter(([, chips]) => sumChips(chips) > 0)
                .map(([hand, chips]) => ({
                    hand: hand as Hand,
                    amount: sumChips(chips)
                }));

            let toastShown = false;

            betsWithValue.forEach(({ hand, amount }) => {
                if (hand === computerHand) {
                    if (betsWithValue.length === 1) {
                        get().increaseBalance(amount);
                        toastShown = true;
                        showTieMessage(amount);
                    }
                } else if (didPlayerWin(hand, computerHand)) {
                    const winRate = betsWithValue.length === 1 ? WIN_RATE_1_POSITION : WIN_RATE_2_POSITIONS;
                    const winAmount = amount * winRate;
                    get().increaseBalance(winAmount);
                    toastShown = true;
                    showWinMessage(winAmount);
                }
            });

            if (!toastShown) {
                showLoseMessage();
            }

            set({
                phase: PHASES.ROUND_ENDED,
                currentBets: {
                    [HANDS.ROCK]: [],
                    [HANDS.PAPER]: [],
                    [HANDS.SCISSORS]: []
                },
                computerHand: null
            });
        }, 2000); // 2000 milliseconds = 2 seconds
    },
    resetRound: () =>
        set(() => ({
            phase: PHASES.ROUND_STARTED,
            computerHand: null,
            currentBets: {
                [HANDS.ROCK]: [],
                [HANDS.PAPER]: [],
                [HANDS.SCISSORS]: []
            }
        })),
    increaseBalance: (by: number) => set((state) => ({ balance: state.balance + by })),
    decreaseBalance: (by: number) => set((state) => ({ balance: state.balance - by })),
    increaseWinAmount: (by: number) => set((state) => ({ winAmount: state.winAmount + by })),

    addBet: (bet: Hand, amount: number) =>
        set((state) => {
            if (amount <= 0) return state;

            const newBalance = state.balance - amount;
            if (newBalance < 0) return state;

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
