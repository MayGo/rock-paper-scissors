import { HANDS } from '@/utils/types';
import { HStack } from '@chakra-ui/react';
import { PickPositionButton } from './PickPositionButton';

export const PositionsSelector = () => {
    return (
        <HStack gap={6}>
            <PickPositionButton label="ROCK" colorPalette="blue" hand={HANDS.ROCK} />
            <PickPositionButton label="PAPER" colorPalette="green" hand={HANDS.PAPER} />
            <PickPositionButton label="SCISSORS" colorPalette="red" hand={HANDS.SCISSORS} />
        </HStack>
    );
};
