import { IconButton, Text, VStack } from '@chakra-ui/react';

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
    hand
}: {
    label: string;
    colorPalette: string;
    hand: Hand;
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
            p={8}
            rounded="lg"
            onClick={() => {
                addBet(hand, CHIP_VALUE);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
            <VStack alignItems="center" justifyContent="space-between" h="100%">
                <Text fontSize="2xl" fontWeight="bold">
                    {totalBet}
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                    {label}
                </Text>
            </VStack>
        </Button>
    );
};
