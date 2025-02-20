import { HANDS } from '@/utils/types';

import { Flex, Text } from '@chakra-ui/react';

export const SelectedHands = () => {
    const computerHand = HANDS.PAPER;
    const playerHand = HANDS.ROCK;
    return (
        <Flex gap={6} alignItems="center" justifyContent="center">
            <Text>Selected Hands</Text>
            <Text>{computerHand}</Text>
            <Text>{playerHand}</Text>
        </Flex>
    );
};
