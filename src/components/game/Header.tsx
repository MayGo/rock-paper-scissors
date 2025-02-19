import { Flex } from '@chakra-ui/react';
import { HeaderItem } from './HeaderItem';
export const Header = () => {
    return (
        <Flex gap={14} alignItems="center" justifyContent="center" bg="darkGray" color="white" py={1}>
            <HeaderItem label="BALANCE" value="XXXX" />
            <HeaderItem label="BET" value="XXX" />
            <HeaderItem label="WIN" value="X" />
        </Flex>
    );
};
