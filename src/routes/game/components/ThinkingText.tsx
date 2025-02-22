import { largeFontSize } from '@/components/theme/theme.utils';
import { Flex, Text } from '@chakra-ui/react';

export const ThinkingText = () => {
    return (
        <Flex gap={10} alignItems="baseline" w="full">
            <Text fontSize={largeFontSize} fontWeight="bold" color="primary" flex={0.5} textAlign="center">
                Thinking...
            </Text>
        </Flex>
    );
};
