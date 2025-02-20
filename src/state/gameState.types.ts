import { Hand } from '../utils/types';
import { Phase } from './gameState.utils';

export type CurrentBets = {
    [key in Hand]: number[];
};

export interface GameState {
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
