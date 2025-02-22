import { NUMBER_SEPARATOR } from '@/utils/constants';
import { formatNumber } from '@/utils/numbers';
import { chakra } from '@chakra-ui/react';
import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Props {
    value: number;
    delay?: number;
    duration?: number;
    separator?: string;
}

export function AnimateNumber({ value, delay = 0, duration = 1, separator = NUMBER_SEPARATOR }: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(value);
    const isInView = useInView(ref, { once: true, margin: '0px' });
    const previousValueRef = useRef(value);

    useEffect(() => {
        const unsubscribe = motionValue.on('change', (latest: number) => {
            if (ref.current) {
                const rounded = Math.round(latest);
                const isIncreasing = previousValueRef.current > latest;
                const color = isIncreasing ? 'var(--chakra-colors-green-300)' : 'var(--chakra-colors-red-300)';

                ref.current.textContent = formatNumber(rounded, separator);
                ref.current.style.color = rounded !== value ? color : '';
            }
        });
        return () => unsubscribe();
    }, [motionValue, separator, value]);

    useEffect(() => {
        if (isInView) {
            previousValueRef.current = value;
            animate(motionValue, value, {
                duration: duration,
                delay: delay
            });
        }
    }, [isInView, motionValue, value, delay, duration]);

    // Set initial value
    useEffect(() => {
        if (!isInView && ref.current) {
            ref.current.textContent = formatNumber(value, separator);
        }
    }, [isInView, separator, value]);

    return <chakra.span ref={ref} />;
}
