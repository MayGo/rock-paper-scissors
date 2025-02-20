export const HANDS = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS'
} as const;

export type Hand = (typeof HANDS)[keyof typeof HANDS];
