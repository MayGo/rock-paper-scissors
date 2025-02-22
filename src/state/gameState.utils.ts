import { WIN_RATE_1_POSITION, WIN_RATE_2_POSITIONS } from '@/utils/constants';
import { Hand, HANDS } from '@/utils/types';
import { CurrentBets, RoundResult } from './gameState.types';

export const sumChips = (chips: number[]) => chips.reduce((acc, curr) => acc + curr, 0);

export const didPlayerWin = (playerHand?: Hand, computerHand?: Hand) => {
    if (!playerHand || !computerHand || playerHand === computerHand) return false;

    // Use index-based calculation for win determination
    const hands = [HANDS.ROCK, HANDS.PAPER, HANDS.SCISSORS];
    const playerIndex = hands.indexOf(playerHand);
    const computerIndex = hands.indexOf(computerHand);

    return (playerIndex - computerIndex + 3) % 3 === 1;
};

export const getWinningHand = (playerHand?: Hand, computerHand?: Hand) => {
    if (!playerHand || !computerHand || playerHand === computerHand) return;
    return didPlayerWin(playerHand, computerHand) ? playerHand : computerHand;
};

export const getPlayerWinningHand = (userHand?: Hand, computerHand?: Hand) =>
    didPlayerWin(userHand, computerHand) ? userHand : undefined;

interface Bet {
    hand: Hand;
    amount: number;
}

export const getBetsWithValues = (bets: CurrentBets) =>
    Object.entries(bets).reduce((acc, [hand, chips]) => {
        const sum = sumChips(chips);
        return sum > 0 ? [...acc, { hand: hand as Hand, amount: sum }] : acc;
    }, [] as Bet[]);

export const getPlayerRoundResult = (currentBets: CurrentBets, computerHand: Hand) => {
    const betsWithValue = getBetsWithValues(currentBets);
    if (!betsWithValue.length) return { amount: 0, bestHand: undefined, playerWon: false } as RoundResult;

    let bestHand: Hand | undefined;
    let amount = 0;
    let playerWon = false;

    for (const { hand, amount: betAmount } of betsWithValue) {
        if (hand === computerHand) {
            bestHand ||= hand;
            if (betsWithValue.length === 1) amount = betAmount;
        } else if (didPlayerWin(hand, computerHand)) {
            const winRate = betsWithValue.length === 1 ? WIN_RATE_1_POSITION : WIN_RATE_2_POSITIONS;
            amount = betAmount * winRate;
            bestHand = hand;
            playerWon = true;
            break; // Early exit when winning hand found
        }
    }

    return {
        amount,
        bestHand: bestHand || betsWithValue[0].hand,
        playerWon
    } as RoundResult;
};
