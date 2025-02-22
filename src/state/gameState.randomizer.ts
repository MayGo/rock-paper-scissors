import { HANDS } from '@/utils/types';

// Cache hand values array
const HANDS_VALUES = Object.values(HANDS);

export const getRandomHand = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return HANDS_VALUES[array[0] % HANDS_VALUES.length];
};
