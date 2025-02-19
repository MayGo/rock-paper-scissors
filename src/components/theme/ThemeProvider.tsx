'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { type ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';
import { ColorModeProvider } from './color-mode';
import { sytemTheme } from './theme';

export function ThemeProvider(props: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ChakraProvider value={sytemTheme}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
