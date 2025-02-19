import { Button, HStack, Text } from '@chakra-ui/react';
import { Header } from './components/game/Header';
import { MainContent } from './components/game/MainContent';
import { PickPositionButton } from './components/game/PickPositionButton';

export function App() {
    return (
        <>
            <Header />
            <MainContent>
                <Text fontSize="lg" mb={4} color="primary" fontWeight="bold">
                    PICK YOUR POSITIONS
                </Text>
                <HStack gap={6}>
                    <PickPositionButton label="ROCK" colorPalette="blue" />
                    <PickPositionButton label="PAPER" colorPalette="green" />
                    <PickPositionButton label="SCISSORS" colorPalette="red" />
                </HStack>
                <Button
                    mt={6}
                    borderColor="primary"
                    size="2xl"
                    color="primary"
                    bg="almostBlack"
                    rounded="full"
                    w="150px"
                >
                    PLAY
                </Button>
            </MainContent>
        </>
    );
}
