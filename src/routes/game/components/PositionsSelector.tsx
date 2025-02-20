import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.utils';
import { HANDS } from '@/utils/types';
import { HStack } from '@chakra-ui/react';
import { PickPositionButton } from './PickPositionButton';

export const PositionsSelector = () => {
    const phase = useGameState((state) => state.phase);

    const isRoundStarted = phase === PHASES.ROUND_STARTED;

    return (
        <HStack gap={6}>
            <PickPositionButton label="ROCK" colorPalette="blue" hand={HANDS.ROCK} disabled={!isRoundStarted} />
            <PickPositionButton label="PAPER" colorPalette="green" hand={HANDS.PAPER} disabled={!isRoundStarted} />
            <PickPositionButton label="SCISSORS" colorPalette="red" hand={HANDS.SCISSORS} disabled={!isRoundStarted} />
        </HStack>
    );
};
