import { HAND } from './game.constats';

import { Flex, Text } from '@chakra-ui/react';

export const SelectedHands = () => {
    const computerHand = HAND.PAPER;
    const playerHand = HAND.ROCK;
    return (
        <Flex gap={6} alignItems="center" justifyContent="center">
            <Text>Selected Hands</Text>
            <Text>{computerHand}</Text>
            <Text>{playerHand}</Text>
        </Flex>
    );
};
