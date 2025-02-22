import { largeFontSize } from '@/components/theme/theme.utils';
import { useGameState } from '@/state/gameState';
import { getBetsWithValues } from '@/state/gameState.utils';
import { HANDS } from '@/utils/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { HandText } from './HandText';
import { ScrollingText } from './ScrollingText';

const allHands = [HANDS.ROCK, HANDS.PAPER, HANDS.SCISSORS];

export const SelectedHands = ({ animating }: { animating?: boolean }) => {
    const computerHand = useGameState((state) => state.computerHand);
    const currentBets = useGameState((state) => state.currentBets);
    const playerHand = useGameState((state) => state.playerHand);

    const betHands = getBetsWithValues(currentBets).map(({ hand }) => hand);

    return (
        <Flex direction={['column', 'row']} gap={[2, 5, 10]} alignItems={['center', 'baseline']} w="full">
            <Box flex={1}>
                {animating ? (
                    <ScrollingText align="right" values={allHands} />
                ) : (
                    <HandText align="right">{computerHand}</HandText>
                )}
            </Box>
            <Text fontSize={largeFontSize} fontWeight="bold" color="primary" textAlign="center">
                VS
            </Text>
            <Box flex={1}>
                {animating ? (
                    <ScrollingText align="left" values={betHands} />
                ) : (
                    <HandText align="left">{playerHand}</HandText>
                )}
            </Box>
        </Flex>
    );
};
