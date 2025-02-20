import { WIN_RATE_1_POSITION, WIN_RATE_2_POSITIONS } from '@/utils/constants';
import { Hand, HANDS } from '@/utils/types';
import { CurrentBets } from './gameState.types';

export const sumChips = (chips: number[]) => chips.reduce((acc, curr) => acc + curr, 0);

export const getRandomHand = () => {
    // Use crypto.getRandomValues() for better randomization
    const hands = Object.values(HANDS);
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return hands[array[0] % hands.length];
};

export const didPlayerWin = (playerHand?: Hand, computerHand?: Hand) => {
    if (!playerHand || !computerHand) return false;
    if (playerHand === computerHand) return false;
    if (playerHand === HANDS.ROCK && computerHand === HANDS.SCISSORS) return true;
    if (playerHand === HANDS.SCISSORS && computerHand === HANDS.PAPER) return true;
    if (playerHand === HANDS.PAPER && computerHand === HANDS.ROCK) return true;
    return false;
};

export const getWinningHand = (playerHand?: Hand, computerHand?: Hand) => {
    if (!playerHand || !computerHand) return null;
    if (playerHand === computerHand) return null;
    if (didPlayerWin(playerHand, computerHand)) return playerHand;
    return computerHand;
};

export const getPlayerWinningHand = (userHand?: Hand, computerHand?: Hand) => {
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

type PlayerRoundResult = {
    amount: number;
    bestHand?: Hand;
    playerWon: boolean;
};

export const getPlayerRoundResult = (currentBets: CurrentBets, computerHand: Hand) => {
    const betsWithValue = getBetsWithValues(currentBets);

    if (betsWithValue.length === 0) return { amount: 0, bestHand: undefined, playerWon: false };
    const result: PlayerRoundResult = {
        amount: 0,
        bestHand: undefined,
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

    if (result.bestHand === null) {
        result.bestHand = betsWithValue[0].hand;
    }
    return result;
};
