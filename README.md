# Game

## TODO

-   [x] Set up React + TypeScript + Vite project
-   [x] Add Chakra UI
-   [x] Implement game core mechanics:
    -   [x] Player balance system (starting 5000)
    -   [x] Betting mechanism (500 increments, max 2 positions)
    -   [x] Win/loss calculation:
        -   [x] Single position win (14x return)
        -   [x] Two positions win (3x return)
        -   [x] Tie handling (return bet amount)
-   [x] Create UI components:
    -   [x] Betting position buttons (Rock/Paper/Scissors)
    -   [x] Blance / Bet amount / Win counter display
    -   [x] Computer choice display VS best of player choice
    -   [x] Game result screen with Winner and win amount
-   [x] Implement game flow:
    -   [x] Bet placement phase
    -   [x] Computer choice randomization
    -   [x] Result comparison logic
    -   [x] Balance update system
    -   [x] Prevent invalid game states
-   [x] Add animation for computer choice
-   [x] Add animation for balance update
-   [ ] Fix layout shift if values changes in header
-   [x] Add animation for win
-   [x] Add unit tests
-   [ ] Add Cypress tests
-   [ ] Make it playable on mobile
-   [ ] Add sound effects
-   [ ] Add background music

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname
        }
    }
});
```

-   Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
        // Add the react plugin
        react
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules
    }
});
```
