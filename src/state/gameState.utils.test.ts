import { WIN_RATE_1_POSITION, WIN_RATE_2_POSITIONS } from '@/utils/constants';
import { Hand, HANDS } from '@/utils/types';
import { describe, expect, test } from 'vitest';
import type { CurrentBets } from './gameState.types';
import {
    didPlayerWin,
    getBetsWithValues,
    getPlayerRoundResult,
    getPlayerWinningHand,
    getRandomHand,
    getWinningHand,
    sumChips
} from './gameState.utils';

describe('gameState.utils', () => {
    describe('sumChips', () => {
        test('sums array of numbers', () => {
            expect(sumChips([1, 2, 3])).toBe(6);
            expect(sumChips([0, 0, 0])).toBe(0);
            expect(sumChips([])).toBe(0);
        });
    });

    describe('getRandomHand', () => {
        test('returns valid hand', () => {
            const hand = getRandomHand();
            expect(Object.values(HANDS)).toContain(hand);
        });

        test('covers all possible hands', () => {
            const hands = new Set(Object.values(HANDS));
            const results = new Set<Hand>();

            // Run multiple times to ensure all possibilities are covered
            for (let i = 0; i < 100; i++) {
                results.add(getRandomHand());
            }

            expect(results.size).toBe(hands.size);
        });
    });

    describe('didPlayerWin', () => {
        test('returns true for winning combinations', () => {
            expect(didPlayerWin(HANDS.ROCK, HANDS.SCISSORS)).toBe(true);
            expect(didPlayerWin(HANDS.SCISSORS, HANDS.PAPER)).toBe(true);
            expect(didPlayerWin(HANDS.PAPER, HANDS.ROCK)).toBe(true);
        });

        test('returns false for losing combinations', () => {
            expect(didPlayerWin(HANDS.ROCK, HANDS.PAPER)).toBe(false);
            expect(didPlayerWin(HANDS.SCISSORS, HANDS.ROCK)).toBe(false);
            expect(didPlayerWin(HANDS.PAPER, HANDS.SCISSORS)).toBe(false);
        });

        test('returns false for ties', () => {
            expect(didPlayerWin(HANDS.ROCK, HANDS.ROCK)).toBe(false);
        });
    });

    describe('getWinningHand', () => {
        test('returns correct winner', () => {
            expect(getWinningHand(HANDS.ROCK, HANDS.SCISSORS)).toBe(HANDS.ROCK);
            expect(getWinningHand(HANDS.SCISSORS, HANDS.ROCK)).toBe(HANDS.ROCK);
            expect(getWinningHand(HANDS.ROCK, HANDS.ROCK)).toBeUndefined();
        });
    });

    describe('getPlayerWinningHand', () => {
        test('returns player hand when player wins', () => {
            expect(getPlayerWinningHand(HANDS.ROCK, HANDS.SCISSORS)).toBe(HANDS.ROCK);
        });

        test('returns undefined when player loses or ties', () => {
            expect(getPlayerWinningHand(HANDS.ROCK, HANDS.PAPER)).toBeUndefined();
            expect(getPlayerWinningHand(HANDS.ROCK, HANDS.ROCK)).toBeUndefined();
        });
    });

    describe('getBetsWithValues', () => {
        test('filters and sums bets correctly', () => {
            const bets: CurrentBets = {
                [HANDS.ROCK]: [1, 2, 3],
                [HANDS.PAPER]: [0, 0, 0],
                [HANDS.SCISSORS]: [5]
            };

            const result = getBetsWithValues(bets);
            expect(result).toEqual([
                { hand: HANDS.ROCK, amount: 6 },
                { hand: HANDS.SCISSORS, amount: 5 }
            ]);
        });
    });

    describe('getPlayerRoundResult', () => {
        test('returns default for no bets', () => {
            const result = getPlayerRoundResult(
                { [HANDS.ROCK]: [0], [HANDS.PAPER]: [0], [HANDS.SCISSORS]: [0] },
                HANDS.ROCK
            );
            expect(result).toEqual({
                amount: 0,
                bestHand: undefined,
                playerWon: false
            });
        });

        test('calculates single winning bet', () => {
            const bets: CurrentBets = {
                [HANDS.ROCK]: [10],
                [HANDS.PAPER]: [0],
                [HANDS.SCISSORS]: [0]
            };
            const result = getPlayerRoundResult(bets, HANDS.SCISSORS);
            expect(result.amount).toBe(10 * WIN_RATE_1_POSITION);
            expect(result.bestHand).toBe(HANDS.ROCK);
            expect(result.playerWon).toBe(true);
        });

        test('handles tie with single bet', () => {
            const bets: CurrentBets = {
                [HANDS.ROCK]: [10],
                [HANDS.PAPER]: [0],
                [HANDS.SCISSORS]: [0]
            };
            const result = getPlayerRoundResult(bets, HANDS.ROCK);
            expect(result.amount).toBe(10);
            expect(result.bestHand).toBe(HANDS.ROCK);
            expect(result.playerWon).toBe(false);
        });

        test('prioritizes winning hand in multiple bets', () => {
            const bets: CurrentBets = {
                [HANDS.ROCK]: [10],
                [HANDS.PAPER]: [20],
                [HANDS.SCISSORS]: [0]
            };
            const result = getPlayerRoundResult(bets, HANDS.ROCK);
            expect(result.amount).toBe(20 * WIN_RATE_2_POSITIONS);
            expect(result.bestHand).toBe(HANDS.PAPER);
            expect(result.playerWon).toBe(true);
        });
    });
});
