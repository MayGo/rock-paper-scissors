import { Text, VStack } from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';

export const PickPositionButton = ({ label, colorPalette }: { label: string; colorPalette: string }) => {
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
        >
            <VStack alignItems="center" justifyContent="space-between" h="100%">
                <Text fontSize="2xl" fontWeight="bold">
                    {label}
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                    {label}
                </Text>
            </VStack>
        </Button>
    );
};
