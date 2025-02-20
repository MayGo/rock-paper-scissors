import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from './components/ui/Toaster';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Toaster />
            <App />
        </ThemeProvider>
    </StrictMode>
);
