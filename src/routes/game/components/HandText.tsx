import { hugeFontSize } from '@/components/theme/theme.utils';
import { Text } from '@chakra-ui/react';

export const HandText = ({ align = 'right', children }: { align?: 'left' | 'right'; children: React.ReactNode }) => {
    return (
        <Text fontSize={hugeFontSize} fontWeight="bold" color="white" textAlign={align}>
            {children}
        </Text>
    );
};
