import { toaster } from '@/components/ui/Toaster';

export const showWinMessage = (amount: number) => {
    toaster.create({
        title: 'Round ended',
        description: `You won ${amount} coins`,
        type: 'success'
    });
};

export const showTieMessage = (amount: number) => {
    toaster.create({
        title: 'Round ended',
        description: `It's a tie, you get your ${amount} coins back`,
        type: 'info'
    });
};

export const showLoseMessage = () => {
    toaster.create({
        title: 'Round ended',
        description: 'Better luck next round'
    });
};
