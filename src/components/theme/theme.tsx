'use client';
import { createSystem, defaultConfig, defineConfig, mergeConfigs } from '@chakra-ui/react';
import { mainGray } from './theme.utils';

const primaryColor = '#d4b37f';

const almostBlackColor = '#070707';
const darkGrayColor = '#161616';

const greenColor = '#19c359';
const greenDarkColor = '#1a381d';
const blueColor = '#3b81f6';
const blueDarkColor = '#201f4f';
const redColor = '#e11542';
const redDarkColor = '#50091e';

const chipBlue = '#235eff';

const myConfig = defineConfig({
    globalCss: {
        html: {
            scrollBehavior: 'smooth !important',
            color: mainGray
        }
    },
    theme: {
        tokens: {
            colors: {
                primary: {
                    value: primaryColor
                },
                black: {
                    value: '#000000'
                },
                almostBlack: {
                    value: almostBlackColor
                },
                darkGray: {
                    value: darkGrayColor
                },
                chipBlue: {
                    value: chipBlue
                },
                blue: {
                    '50': { value: '#eff6ff' },
                    '100': { value: '#dbeafe' },
                    '200': { value: '#bfdbfe' },
                    '300': { value: '#93c4fd' },
                    '400': { value: '#60a4fa' },
                    '500': { value: blueColor },
                    '600': { value: '#2562eb' },
                    '700': { value: '#1d4dd8' },
                    '800': { value: '#1e3faf' },
                    '900': { value: '#1e398a' },
                    '950': { value: blueDarkColor }
                },
                green: {
                    '50': { value: '#effef4' },
                    '100': { value: '#dafee7' },
                    '200': { value: '#b8fad0' },
                    '300': { value: '#81f4ac' },
                    '400': { value: '#43e57f' },
                    '500': { value: greenColor },
                    '600': { value: '#0faa49' },
                    '700': { value: '#10853d' },
                    '800': { value: '#126934' },
                    '900': { value: '#11562d' },
                    '950': { value: greenDarkColor }
                },

                red: {
                    '50': { value: '#fef2f2' },
                    '100': { value: '#fee2e2' },
                    '200': { value: '#fecaca' },
                    '300': { value: '#fca5a5' },
                    '400': { value: '#f87171' },
                    '500': { value: redColor },
                    '600': { value: '#dc2626' },
                    '700': { value: '#b91c1c' },
                    '800': { value: '#991b1b' },
                    '900': { value: '#7f1d1d' },
                    '950': { value: redDarkColor }
                }
            },
            fonts: {
                body: { value: 'var(--font-geist-sans), sans-serif' },
                heading: { value: 'var(--font-mplus), sans-serif' }
            }
        }
    }
});

const config = mergeConfigs(defaultConfig, myConfig);

export const sytemTheme = createSystem(config);
