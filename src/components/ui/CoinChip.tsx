import { Box, Text } from '@chakra-ui/react';

const CHIP_SIZE = '50px';

export const CoinChip = ({ value }: { value: number }) => {
    return (
        <Box
            w={CHIP_SIZE}
            h={CHIP_SIZE}
            bg="white"
            border="4px solid"
            borderColor="chipBlue"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="24px"
            fontWeight="bold"
        >
            <Text fontSize="lg" fontWeight="bold" color="black">
                {value}
            </Text>
        </Box>
    );
};
