import { WIN_RATE_1_POSITION, WIN_RATE_2_POSITIONS } from '@/utils/constants';
import { Hand, HANDS } from '@/utils/types';
import { CurrentBets } from './gameState.types';

export const PHASES = {
    INITIAL: 'INITIAL',
    ROUND_STARTED: 'ROUND_STARTED',
    ROUND_THINKING: 'ROUND_THINKING',
    ROUND_RESULTS: 'ROUND_RESULTS',
    ROUND_CASHED: 'ROUND_CASHED',
    GAME_OVER: 'GAME_OVER'
} as const;

export type Phase = (typeof PHASES)[keyof typeof PHASES];

export const sumChips = (chips: number[]) => chips.reduce((acc, curr) => acc + curr, 0);

export const getRandomHand = () => {
    const hands = Object.values(HANDS);
    return hands[Math.floor(Math.random() * hands.length)];
};

export const didPlayerWin = (userHand: Hand | null, computerHand: Hand | null) => {
    if (!userHand || !computerHand) return false;
    if (userHand === computerHand) return false;
    if (userHand === HANDS.ROCK && computerHand === HANDS.SCISSORS) return true;
    if (userHand === HANDS.SCISSORS && computerHand === HANDS.PAPER) return true;
    if (userHand === HANDS.PAPER && computerHand === HANDS.ROCK) return true;
    return false;
};

export const getWinningHand = (userHand: Hand | null, computerHand: Hand | null) => {
    if (!userHand || !computerHand) return null;
    if (userHand === computerHand) return null;
    if (didPlayerWin(userHand, computerHand)) return userHand;
    return computerHand;
};

export const getPlayerWinningHand = (userHand: Hand | null, computerHand: Hand | null) => {
    if (!userHand || !computerHand) return null;
    if (userHand === computerHand) return null;
    if (didPlayerWin(userHand, computerHand)) return userHand;
    return null;
};

interface Bet {
    hand: Hand;
    amount: number;
}

export const getBetsWithValues = (bets: { [key in Hand]: number[] }) => {
    return Object.entries(bets)
        .filter(([, chips]) => sumChips(chips) > 0)
        .map(
            ([hand, chips]) =>
                ({
                    hand: hand as Hand,
                    amount: sumChips(chips)
                } as Bet)
        );
};

export const getPlayerRoundResult = (currentBets: CurrentBets, computerHand: Hand) => {
    const betsWithValue = getBetsWithValues(currentBets);

    if (betsWithValue.length === 0) return { amount: 0, bestHand: null, playerWon: false };
    const result = {
        amount: 0,
        bestHand: betsWithValue[0].hand,
        playerWon: false
    };

    betsWithValue.forEach(({ hand, amount }) => {
        if (hand === computerHand) {
            if (result.bestHand === null) {
                // If we already have winning hand
                result.bestHand = hand;
            }
            if (betsWithValue.length === 1) {
                result.amount = amount;
            }
        } else if (didPlayerWin(hand, computerHand)) {
            const winRate = betsWithValue.length === 1 ? WIN_RATE_1_POSITION : WIN_RATE_2_POSITIONS;
            const winAmount = amount * winRate;

            result.amount = winAmount;
            result.bestHand = hand;
            result.playerWon = true;
        }
    });
    return result;
};
