import { HANDS } from '@/utils/types';
import { HStack } from '@chakra-ui/react';
import { PickPositionButton } from './PickPositionButton';

export const PositionsSelector = () => {
    return (
        <HStack gap={6}>
            <PickPositionButton label="ROCK" color="blue" hand={HANDS.ROCK} />
            <PickPositionButton label="PAPER" color="green" hand={HANDS.PAPER} />
            <PickPositionButton label="SCISSORS" color="red" hand={HANDS.SCISSORS} />
        </HStack>
    );
};
