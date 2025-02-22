import AnimatedCoinsGroup from '@/components/ui/AnimatedCoinsGroup';
import { useGameState } from '@/state/gameState';
import { getPlayerRoundResult, getWinningHand } from '@/state/gameState.utils';
import { Text, VStack } from '@chakra-ui/react';

function Winnings({ label, amount }: { label: string; amount: number }) {
    return (
        <Text fontSize="4xl" fontWeight="bold" color="primary" textAlign="center">
            {label}
            <Text as="span" color="white" pl={2}>
                {amount}
            </Text>
        </Text>
    );
}

function WinLabel({ label, color }: { label: string; color: string }) {
    return (
        <Text fontSize="6xl" fontWeight="bold" color={color} textAlign="center">
            {label}
        </Text>
    );
}
export const RoundCashed = () => {
    const computerHand = useGameState((state) => state.computerHand);
    const playerHand = useGameState((state) => state.playerHand);
    const currentBets = useGameState((state) => state.currentBets);

    if (!playerHand || !computerHand) return null;

    const winningHand = getWinningHand(playerHand, computerHand);
    const playerRoundResult = getPlayerRoundResult(currentBets, computerHand);

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
                    <AnimatedCoinsGroup idFrom={`${playerHand}-bet`} idTo="balance" value={playerRoundResult.amount} />
                </>
            )}
            {tieWinnings && <Winnings label="GOT BACK" amount={playerRoundResult.amount} />}
        </VStack>
    );
};
