import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getQuadraticBezierPoint } from '../../utils/animation';
import { CoinChip } from './CoinChip';

interface AnimatedCoinChipProps {
    idFrom: string;
    idTo: string;
    value: number;
    delay?: number;
}

const ANIMATION_DURATION = 0.5;

const AnimatedCoinChip = ({ idFrom, idTo, value, delay = 0 }: AnimatedCoinChipProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const CHIP_SIZE = 50; // Should match your CoinChip size

    useEffect(() => {
        const fromElement = document.getElementById(idFrom);
        const toElement = document.getElementById(idTo);

        if (fromElement && toElement) {
            const fromRect = fromElement.getBoundingClientRect();
            const toRect = toElement.getBoundingClientRect();

            // Calculate center positions relative to viewport
            const fromX = fromRect.left + fromRect.width / 2 - CHIP_SIZE / 2;
            const fromY = fromRect.top + fromRect.height / 2 - CHIP_SIZE / 2;
            const toX = toRect.left + toRect.width / 2 - CHIP_SIZE / 2;
            const toY = toRect.top + toRect.height / 2 - CHIP_SIZE / 2;

            // Set initial position immediately
            x.set(fromX);
            y.set(fromY);

            // Calculate control point
            const controlX = (fromX + toX) / 2 + (Math.random() - 0.5) * 300;
            const controlY = Math.min(fromY, toY) + (Math.max(fromY, toY) - Math.min(fromY, toY)) * Math.random();

            // Start animation after delay
            const timeoutId = setTimeout(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                    const animation = animate(0, 1, {
                        duration: ANIMATION_DURATION,
                        ease: 'easeOut',
                        onUpdate: (progress) => {
                            const currentPos = getQuadraticBezierPoint(
                                { x: fromX, y: fromY },
                                { x: controlX, y: controlY },
                                { x: toX, y: toY },
                                progress
                            );
                            x.set(currentPos.x);
                            y.set(currentPos.y);
                        },
                        onComplete: () => setIsAnimating(false),
                        onStop: () => setIsAnimating(false)
                    });

                    return () => {
                        animation.stop();
                        setIsAnimating(false);
                    };
                });
            }, delay * 1000);

            return () => {
                clearTimeout(timeoutId);
                setIsAnimating(false);
            };
        }
    }, [idFrom, idTo, x, y, CHIP_SIZE, delay]);

    if (!isAnimating) return null;

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                zIndex: 1000,
                pointerEvents: 'none'
            }}
        >
            <CoinChip value={value} />
        </motion.div>
    );
};

export default AnimatedCoinChip;
