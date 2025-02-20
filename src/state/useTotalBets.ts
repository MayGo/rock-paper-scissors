import { useGameState } from './gameState';

export const useTotalBets = () => {
    const currentBets = useGameState((state) => state.currentBets);
    return Object.values(currentBets).reduce((sum, bet) => sum + bet.reduce((acc, curr) => acc + curr, 0), 0);
};
