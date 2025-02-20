import { Hand } from '../utils/types';

export const PHASES = {
    INITIAL: 'INITIAL',
    ROUND_STARTED: 'ROUND_STARTED',
    ROUND_THINKING: 'ROUND_THINKING',
    ROUND_RESULTS: 'ROUND_RESULTS',
    ROUND_CASHED: 'ROUND_CASHED',
    GAME_OVER: 'GAME_OVER'
} as const;

export type Phase = (typeof PHASES)[keyof typeof PHASES];

export type CurrentBets = {
    [key in Hand]: number[];
};

export interface GameState {
    balance: number;
    winCount: number;
    currentBets: CurrentBets;
    phase: Phase;
    computerHand?: Hand;
    playerHand?: Hand;
    startGame: () => void;
    playRound: () => void;
    resetRound: () => void;
    increaseBalance: (by: number) => void;
    decreaseBalance: (by: number) => void;
    incrementWinCount: () => void;
    addBet: (bet: Hand, amount: number) => void;
    clearBet: (bet: Hand) => void;
}
