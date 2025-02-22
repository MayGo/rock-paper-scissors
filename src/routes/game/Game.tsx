import { Background } from '@/routes/game/components/Background';
import { Header } from '@/routes/game/components/Header';
import { useGameState } from '@/state/gameState';
import { PHASES } from '@/state/gameState.types';
import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ClearButton } from './components/ClearButton';
import { PickPositionsText } from './components/PickPositionsText';
import { PlayButton } from './components/PlayButton';
import { PositionsSelector } from './components/PositionsSelector';
import { RoundCashed } from './components/RoundCashed';
import { SelectedHands } from './components/SelectedHands';

export function Game() {
    const phase = useGameState((state) => state.phase);
    const startGame = useGameState((state) => state.startGame);

    const roundStarted = phase === PHASES.ROUND_STARTED;
    const roundThinking = phase === PHASES.ROUND_THINKING;
    const roundResults = phase === PHASES.ROUND_RESULTS;
    const roundCashed = phase === PHASES.ROUND_CASHED;

    const roundEnded = roundCashed;

    useEffect(() => {
        if (phase === PHASES.INITIAL) {
            startGame();
        }
    }, [phase, startGame]);

    const showSelectedHands = roundResults || roundThinking;

    return (
        <Background>
            <Header />

            <VStack h="full" w="full">
                <VStack flex={1} justifyContent="center" w="full">
                    {showSelectedHands && <SelectedHands animating={roundThinking} />}
                    {roundCashed && <RoundCashed />}
                </VStack>
                <VStack gap={[4, 10, 16]} pb={14}>
                    <VStack gap={2}>
                        {roundStarted && <PickPositionsText />}
                        <PositionsSelector />
                    </VStack>
                    {!roundEnded && <PlayButton />}
                    {roundEnded && <ClearButton />}
                </VStack>
            </VStack>
        </Background>
    );
}
