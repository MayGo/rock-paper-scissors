import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { CoinChip } from '@/components/ui/CoinChip';
import { useGameState } from '@/state/gameState';
import { sumChips } from '@/state/gameState.utils';
import { CHIP_VALUE } from '@/utils/constants';
import { Hand } from '@/utils/types';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';

export const PickPositionButton = ({
    label,
    colorPalette,
    hand,
    disabled
}: {
    label: string;
    colorPalette: string;
    hand: Hand;
    disabled: boolean;
}) => {
    const currentBet = useGameState((state) => state.currentBets[hand]);
    const addBet = useGameState((state) => state.addBet);
    const clearBet = useGameState((state) => state.clearBet);

    const [isHovered, setIsHovered] = useState(false);

    const totalBet = sumChips(currentBet);

    return (
        <Button
            bg={`${colorPalette}.950`}
            borderColor={`${colorPalette}.500`}
            color={`${colorPalette}.500`}
            size="lg"
            w="220px"
            h="180px"
            borderWidth={2}
            rounded="lg"
            onClick={() => {
                addBet(hand, CHIP_VALUE);
            }}
            py={8}
            px={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
        >
            {totalBet > 0 && isHovered && (
                <IconButton
                    position="absolute"
                    top={2}
                    right={2}
                    size="sm"
                    aria-label="Clear bet"
                    variant="ghost"
                    color={`${colorPalette}.500`}
                    onClick={(e) => {
                        e.stopPropagation();
                        clearBet(hand);
                    }}
                >
                    <AiOutlineClear />
                </IconButton>
            )}
            <VStack gap={8} alignItems="center" justifyContent="space-between" h="full" w="full">
                <HStack overflow="hidden" w="full" h="full" justifyContent="center" alignItems="center">
                    {currentBet.map((bet) => (
                        <Box key={bet} w="6px" justifyItems="center">
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
