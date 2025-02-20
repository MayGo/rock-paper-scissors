import { useGameState } from '@/state/gameState';
import { ActionButton } from './ActionButton';

export const ClearButton = () => {
    const resetRound = useGameState((state) => state.resetRound);

    return <ActionButton label="CLEAR" onClick={resetRound} disabled={false} title="" />;
};
