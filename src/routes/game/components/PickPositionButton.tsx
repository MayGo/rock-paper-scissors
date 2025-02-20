import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { CoinChip } from '@/components/ui/CoinChip';
import { useGameState } from '@/state/gameState';
import { getPlayerWinningHand, sumChips } from '@/state/gameState.utils';
import { CHIP_VALUE } from '@/utils/constants';
import { Hand } from '@/utils/types';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';

interface Props {
    label: string;
    color: string;
    hand: Hand;
}

export const PickPositionButton = ({ label, color, hand }: Props) => {
    const playerHand = useGameState((state) => state.playerHand);
    const computerHand = useGameState((state) => state.computerHand);
    const winningHand = getPlayerWinningHand(playerHand, computerHand);

    const currentBet = useGameState((state) => state.currentBets[hand]);
    const addBet = useGameState((state) => state.addBet);
    const clearBet = useGameState((state) => state.clearBet);

    const [isHovered, setIsHovered] = useState(false);

    const totalBet = sumChips(currentBet);

    const highlight = winningHand === hand;

    return (
        <Button
            bg={`${color}.950`}
            borderWidth={highlight ? 4 : 2}
            borderColor={highlight ? `${color}.500` : `${color}.800`}
            color={`${color}.500`}
            w="200px"
            h="160px"
            rounded="lg"
            onClick={() => {
                addBet(hand, CHIP_VALUE);
            }}
            py={6}
            px={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {totalBet > 0 && isHovered && (
                <IconButton
                    as="div"
                    position="absolute"
                    top={2}
                    right={2}
                    size="sm"
                    aria-label="Clear bet"
                    variant="ghost"
                    color={`${color}.500`}
                    onClick={(e) => {
                        e.stopPropagation();
                        clearBet(hand);
                    }}
                >
                    <AiOutlineClear />
                </IconButton>
            )}
            <VStack gap={4} alignItems="center" justifyContent="space-between" h="full" w="full">
                <HStack overflow="hidden" w="full" h="full" justifyContent="center" alignItems="center">
                    {currentBet.map((bet, index) => (
                        <Box key={index} w="6px" justifyItems="center">
                            <CoinChip value={bet} />
                        </Box>
                    ))}
                </HStack>
                <Text fontSize="2xl" fontWeight="bold">
                    {label}
                </Text>
            </VStack>
        </Button>
    );
};
