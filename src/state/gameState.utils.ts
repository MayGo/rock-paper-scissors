import { Hand, HANDS } from '@/utils/types';

export const PHASES = {
    INITIAL: 'INITIAL',
    ROUND_STARTED: 'ROUND_STARTED',
    ROUND_THINKING: 'ROUND_THINKING',
    ROUND_ENDED: 'ROUND_ENDED',
    GAME_OVER: 'GAME_OVER'
} as const;

export type Phase = (typeof PHASES)[keyof typeof PHASES];

export const sumChips = (chips: number[]) => chips.reduce((acc, curr) => acc + curr, 0);

export const getRandomHand = () => {
    const hands = Object.values(HANDS);
    return hands[Math.floor(Math.random() * hands.length)];
};

export const didPlayerWin = (userHand: Hand, computerHand: Hand) => {
    if (userHand === computerHand) return false;
    if (userHand === HANDS.ROCK && computerHand === HANDS.SCISSORS) return true;
    if (userHand === HANDS.SCISSORS && computerHand === HANDS.PAPER) return true;
    if (userHand === HANDS.PAPER && computerHand === HANDS.ROCK) return true;
    return false;
};

export const getBetsWithValues = (bets: { [key in Hand]: number[] }) => {
    return Object.entries(bets)
        .filter(([, chips]) => sumChips(chips) > 0)
        .map(([hand, chips]) => ({
            hand: hand as Hand,
            amount: sumChips(chips)
        }));
};
