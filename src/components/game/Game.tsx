import { Header } from '@/components/game/Header';
import { MainContent } from '@/components/game/MainContent';
import { PickPositionButton } from '@/components/game/PickPositionButton';
import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.utils';
import { useTotalBets } from '@/state/useTotalBets';
import { HANDS } from '@/utils/types';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

export function Game() {
    const phase = useGameState((state) => state.phase);
    const startGame = useGameState((state) => state.startGame);
    const playRound = useGameState((state) => state.playRound);
    useEffect(() => {
        if (phase === PHASES.INITIAL) {
            startGame();
        }
    }, [phase, startGame]);

    const totalBets = useTotalBets();

    return (
        <>
            <Header />
            <MainContent>
                <Text fontSize="lg" mb={4} color="primary" fontWeight="bold">
                    PICK YOUR POSITIONS
                </Text>
                <HStack gap={6}>
                    <PickPositionButton label="ROCK" colorPalette="blue" hand={HANDS.ROCK} />
                    <PickPositionButton label="PAPER" colorPalette="green" hand={HANDS.PAPER} />
                    <PickPositionButton label="SCISSORS" colorPalette="red" hand={HANDS.SCISSORS} />
                </HStack>
                <Button
                    mt={6}
                    borderColor="primary"
                    size="2xl"
                    color="primary"
                    bg="almostBlack"
                    rounded="full"
                    w="150px"
                    onClick={playRound}
                    disabled={totalBets === 0}
                    title={totalBets === 0 ? 'Place your bets first' : ''}
                >
                    PLAY
                </Button>
            </MainContent>
        </>
    );
}
