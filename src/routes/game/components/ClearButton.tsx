import { useGameState } from '@/state/gameState';
import { Button } from '@chakra-ui/react';

export const ClearButton = () => {
    const resetRound = useGameState((state) => state.resetRound);

    return (
        <Button
            mt={6}
            borderColor="primary"
            size="2xl"
            color="primary"
            bg="almostBlack"
            rounded="full"
            w="150px"
            onClick={resetRound}
        >
            CLEAR
        </Button>
    );
};
