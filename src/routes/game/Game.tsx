import { Background } from '@/routes/game/components/Background';
import { Header } from '@/routes/game/components/Header';
import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.utils';
import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { PickPositionsText } from './components/PickPositionsText';
import { PlayButton } from './components/PlayButton';
import { PositionsSelector } from './components/PositionsSelector';
import { SelectedHands } from './components/SelectedHands';
import { ThinkingText } from './components/ThinkingText';

export function Game() {
    const phase = useGameState((state) => state.phase);
    const startGame = useGameState((state) => state.startGame);

    const roundStarted = phase === PHASES.ROUND_STARTED;
    const roundThinking = phase === PHASES.ROUND_THINKING;
    const roundEnded = phase === PHASES.ROUND_ENDED;

    useEffect(() => {
        if (phase === PHASES.INITIAL) {
            startGame();
        }
    }, [phase, startGame]);

    return (
        <Background>
            <Header />
            <VStack h="full" w="full">
                <VStack flex={1} justifyContent="center">
                    {roundEnded && <SelectedHands />}
                    {roundThinking && <ThinkingText />}
                </VStack>
                <VStack gap={6} pb={8}>
                    {roundStarted && <PickPositionsText />}
                    <PositionsSelector />
                    <PlayButton />
                </VStack>
            </VStack>
        </Background>
    );
}
