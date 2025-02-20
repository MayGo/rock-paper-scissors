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

export const showMaxBetsReachedMessage = () => {
    toaster.create({
        title: 'You can only have 2 bets at a time',
        description: 'Please remove one of your bets before adding a new one',
        type: 'warning'
    });
};
