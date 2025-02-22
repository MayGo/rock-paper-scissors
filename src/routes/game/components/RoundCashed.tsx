import { hugeFontSize, largeFontSize } from '@/components/theme/theme.utils';
import AnimatedCoinsGroup from '@/components/ui/AnimatedCoinsGroup';
import { useGameState } from '@/state/gameState';
import { getWinningHand } from '@/state/gameState.utils';
import { CASHING_OUT_ANIMATION_DURATION } from '@/utils/constants';
import { Text, VStack } from '@chakra-ui/react';

function Winnings({ label, amount }: { label: string; amount: number }) {
    return (
        <Text fontSize={largeFontSize} fontWeight="bold" color="primary" textAlign="center">
            {label}
            <Text as="span" color="white" pl={2}>
                {amount}
            </Text>
        </Text>
    );
}

function WinLabel({ label, color }: { label: string; color: string }) {
    return (
        <Text fontSize={hugeFontSize} fontWeight="bold" color={color} textAlign="center">
            {label}
        </Text>
    );
}

const animationDuration = CASHING_OUT_ANIMATION_DURATION / 1000;
export const RoundCashed = () => {
    const computerHand = useGameState((state) => state.computerHand);
    const playerHand = useGameState((state) => state.playerHand);

    const playerRoundResult = useGameState((state) => state.roundResult);
    if (!playerHand || !computerHand || !playerRoundResult) return null;

    const winningHand = getWinningHand(playerHand, computerHand);

    const playerWon = playerRoundResult.playerWon;
    const tieWinnings = !playerWon && playerRoundResult.amount > 0;

    return (
        <VStack gap={0} w="full">
            {winningHand ? (
                <WinLabel label={`${winningHand} WON`} color={playerWon ? 'green.500' : 'red.500'} />
            ) : (
                <WinLabel label="TIE" color="white" />
            )}
            {playerRoundResult.playerWon && (
                <>
                    <Winnings label="YOU WIN" amount={playerRoundResult.amount} />
                    <AnimatedCoinsGroup
                        idFrom={`${playerHand}-bet`}
                        idTo="balance"
                        value={playerRoundResult.amount}
                        duration={animationDuration}
                    />
                </>
            )}
            {tieWinnings && (
                <>
                    <Winnings label="GOT BACK" amount={playerRoundResult.amount} />
                    <AnimatedCoinsGroup
                        idFrom={`${playerHand}-bet`}
                        idTo="balance"
                        value={playerRoundResult.amount}
                        duration={animationDuration}
                    />
                </>
            )}
        </VStack>
    );
};
