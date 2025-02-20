import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.types';
import { useTotalBets } from '@/state/useTotalBets';
import { ActionButton } from './ActionButton';

export const PlayButton = () => {
    const playRound = useGameState((state) => state.playRound);
    const phase = useGameState((state) => state.phase);
    const roundStarted = phase === PHASES.ROUND_STARTED;
    const totalBets = useTotalBets();

    return (
        <ActionButton
            label="PLAY"
            onClick={playRound}
            disabled={!roundStarted || totalBets === 0}
            title={totalBets === 0 ? 'Place your bets first' : ''}
        />
    );
};
