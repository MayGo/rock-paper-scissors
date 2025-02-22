import { AnimateNumber } from '@/components/ui/AnimateNumber';
import { Text } from '@chakra-ui/react';

export const HeaderItem = ({ label, value }: { label: string; value: number }) => {
    return (
        <Text fontSize="xl" fontWeight="bold">
            <Text as="span" color="primary" pr={2}>
                {label}:
            </Text>
            <Text as="span" color="white">
                <AnimateNumber value={value} separator=" " duration={0.3} />
            </Text>
        </Text>
    );
};
