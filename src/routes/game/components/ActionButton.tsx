import { Button, Text } from '@chakra-ui/react';

interface Props {
    label: string;
    onClick: () => void;
    disabled: boolean;
    title: string;
}

export const ActionButton = ({ label, onClick, disabled, title }: Props) => (
    <Button
        mt={6}
        borderColor="primary"
        size="2xl"
        color="primary"
        bg="almostBlack"
        rounded="full"
        h="70px"
        w="200px"
        borderWidth={2}
        onClick={onClick}
        disabled={disabled}
        title={title}
    >
        <Text fontSize="2xl" fontWeight="bold">
            {label}
        </Text>
    </Button>
);
