import { VStack } from '@chakra-ui/react';

const lightGrayColor = '#494949';
const darkerGrayColor = '#1d1d1d';

export const Background = ({ children }: { children: React.ReactNode }) => {
    return (
        <VStack
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgGradient="to-b"
            gradientFrom={lightGrayColor}
            gradientTo={darkerGrayColor}
        >
            {children}
        </VStack>
    );
};
