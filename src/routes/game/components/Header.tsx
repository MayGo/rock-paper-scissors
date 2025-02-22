import { useGameState } from '@/state/gameState';
import { useTotalBets } from '@/state/useTotalBets';
import { Flex } from '@chakra-ui/react';
import { HeaderItem } from './HeaderItem';

export const Header = () => {
    const balance = useGameState((state) => state.balance);
    const winAmount = useGameState((state) => state.winCount);
    const totalBets = useTotalBets();

    return (
        <Flex
            direction={['column', 'row']}
            gap={1}
            alignItems="center"
            justifyContent="center"
            bg="darkGray"
            color="white"
            py={1}
            w="full"
        >
            <HeaderItem id="balance" label="BALANCE" value={balance} />
            <HeaderItem label="BET" value={totalBets} />
            <HeaderItem label="WIN" value={winAmount} />
        </Flex>
    );
};
