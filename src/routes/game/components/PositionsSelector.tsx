import { HANDS } from '@/utils/types';
import { HStack } from '@chakra-ui/react';
import { PickPositionButton } from './PickPositionButton';

export const PositionsSelector = () => {
    return (
        <HStack gap={6}>
            <PickPositionButton id={`${HANDS.ROCK}-bet`} label="ROCK" color="blue" hand={HANDS.ROCK} />
            <PickPositionButton id={`${HANDS.PAPER}-bet`} label="PAPER" color="green" hand={HANDS.PAPER} />
            <PickPositionButton id={`${HANDS.SCISSORS}-bet`} label="SCISSORS" color="red" hand={HANDS.SCISSORS} />
        </HStack>
    );
};
