import { useGameState } from '@/state/gameState';

import { Flex, Text } from '@chakra-ui/react';

export const SelectedHands = () => {
    const computerHand = useGameState((state) => state.computerHand);
    const playerHand = useGameState((state) => state.playerHand);

    return (
        <Flex gap={10} alignItems="baseline" w="full">
            <Text fontSize="6xl" fontWeight="bold" color="white" flex={1} textAlign="right">
                {computerHand}
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="primary" flex={0.5} textAlign="center">
                VS
            </Text>
            <Text fontSize="6xl" fontWeight="bold" color="white" flex={1} textAlign="left">
                {playerHand}
            </Text>
        </Flex>
    );
};
