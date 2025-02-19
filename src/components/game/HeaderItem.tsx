import { Text } from '@chakra-ui/react';

export const HeaderItem = ({ label, value }: { label: string; value: string }) => {
    return (
        <Text fontSize="xl" fontWeight="bold">
            <Text as="span" color="primary" pr={2}>
                {label}:
            </Text>
            {value}
        </Text>
    );
};
