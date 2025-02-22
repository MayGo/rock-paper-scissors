import { AnimateNumber } from '@/components/ui/AnimateNumber';
import { Flex, Text } from '@chakra-ui/react';

export const HeaderItem = ({ id, label, value }: { id?: string; label: string; value: number }) => {
    return (
        <Flex px={2} w="200px" justifyContent="center">
            <Text
                as="span"
                color="primary"
                pr={2}
                fontSize="xl"
                fontWeight="bold"
                flex={1}
                textAlign="right"
                textWrap="nowrap"
            >
                {label}:
            </Text>
            <Text
                as="span"
                color="white"
                id={id}
                fontSize="xl"
                fontWeight="bold"
                flex={1}
                textAlign="left"
                textWrap="nowrap"
            >
                <AnimateNumber value={value} separator=" " duration={0.3} />
            </Text>
        </Flex>
    );
};
