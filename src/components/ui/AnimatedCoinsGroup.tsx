import { useEffect, useState } from 'react';
import AnimatedCoinChip from './AnimatedCoinChip';

interface AnimatedCoinsGroupProps {
    idFrom: string;
    idTo: string;
    value: number;
    baseValue?: number;
    duration?: number;
}

const AnimatedCoinsGroup = ({ idFrom, idTo, value, baseValue = 500, duration = 0.5 }: AnimatedCoinsGroupProps) => {
    const [coinsToRender, setCoinsToRender] = useState<number[]>([]);

    useEffect(() => {
        // Split value into multiple coins
        const coins = [];
        let remainingValue = value;

        while (remainingValue > 0) {
            const coinValue = Math.min(remainingValue, baseValue);
            coins.push(coinValue);
            remainingValue -= coinValue;
        }

        setCoinsToRender(coins);
    }, [value, baseValue]);

    const staggerDelay = duration / coinsToRender.length;
    return (
        <>
            {coinsToRender.map((coinValue, index) => (
                <AnimatedCoinChip
                    key={`${idFrom}-${idTo}-${index}`}
                    idFrom={idFrom}
                    idTo={idTo}
                    value={coinValue}
                    delay={index * staggerDelay}
                />
            ))}
        </>
    );
};

export default AnimatedCoinsGroup;
