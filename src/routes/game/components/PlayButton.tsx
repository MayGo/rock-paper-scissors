import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.utils';
import { useTotalBets } from '@/state/useTotalBets';
import { Button } from '@chakra-ui/react';

export const PlayButton = () => {
    const playRound = useGameState((state) => state.playRound);
    const phase = useGameState((state) => state.phase);
    const roundStarted = phase === PHASES.ROUND_STARTED;
    const totalBets = useTotalBets();

    return (
        <Button
            mt={6}
            borderColor="primary"
            size="2xl"
            color="primary"
            bg="almostBlack"
            rounded="full"
            w="150px"
            onClick={playRound}
            disabled={!roundStarted || totalBets === 0}
            title={totalBets === 0 ? 'Place your bets first' : ''}
        >
            PLAY
        </Button>
    );
};
