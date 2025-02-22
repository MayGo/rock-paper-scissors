import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HandText } from './HandText';

export const ScrollingText = ({ values, align = 'right' }: { values: string[]; align?: 'left' | 'right' }) => {
    const controls = useAnimationControls();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const animate = async () => {
            for (let i = 0; i < 20; i++) {
                await controls.start({
                    y: [-20, 0],
                    opacity: [0.5, 1],
                    transition: {
                        duration: 0.1
                    }
                });
                setCurrentIndex((prev) => (prev + 1) % values.length);
            }
        };
        if (values.length > 1) {
            animate();
        }
    }, [controls, values]);

    return (
        <motion.div animate={controls} style={{ width: '100%', textAlign: align }}>
            <HandText align={align}>{values[currentIndex]}</HandText>
        </motion.div>
    );
};
