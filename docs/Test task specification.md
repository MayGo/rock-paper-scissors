# Test task specification:
Your test task is to create a React app, using Typescript with strict typing. 
The app is a scissors, rock, paper game, with the ability to bet on the winning position.

## Specifications
- Player starts with a balance of 5000.
- Each bet should be 500 (player can place several bets on any position: 500, 1000,
1500 etc)
- Player can not bet more than 2 positions per one game
- Winning rate for bet on 1 position is 14
- Winning rate for bet on 2 positions is 3

## Requirements
- There should be three betting positions, rock, paper, scissors.
- Player can bet on rock, paper, or scissors, but not on all three at the same time.
- The bet is reduced from the balance.
- When betting done button is clicked, the computer runs a random paper, scissors,
rock match.
- Player choice should be compared to computers choice and only one bet can win –
every tie counts as loss
- If player bets on one of them and wins, the return is 14 times the bet.
- If player bets on two of them and wins the return is 3 times the bet.
- Loss bets are not returned to player
- Bets with tie result are returned to player
- After round ends the return adds to the balance
- Player cannot bet if player has less balance than available for bet.

NB please keep in mind that Title ROCK vs PAPER on the second screen means “computer choice ROCK versus player choice PAPER” — not ROCK bet vs PAPER bet.

## Acceptance criteria
Every point of task should be implemented

### Junior level
In general implementing every point is enough for junior. Optionally we pay attention to such things as concistency, variable naming, files and folders structure. 

### Middle level
We pay attention to everything mentioned for Junior (optional part is mandatory for middle). Additionally we check UX and compare UI with mockups more thorough and we expect following clean code principles. We expect code to be flexible and maintainable. Changing of requirements should not lead to rewriting half of application. Changing of specifications should cause minimal changes.

### Senior level
At this level, in addition to meeting all the requirements from other levels, we expect a flexible solution. The code should be modular and isolated enough to allow for scaling the application or replacing certain libraries (e.g., switching from React to Vue) in a straightforward and understandable manner, with minimal code adaptations.