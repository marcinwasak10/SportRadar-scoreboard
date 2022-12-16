Scoreboard app

1. In order to make it as simple as possible, I've decided to keep all the functionality on the same page (no routing).
2. To make it simple, I've opted not to delete the ended games. Instead, I'm setting the 'inProgress' flag to false. This allows me to use the current array length as identifiers (this solution does not require any external libraries to generate the ids). The games to be displayed are decided by simple filtering. The games are stored in the Scoreboard component state.
3. I've decided to split the app into 3 components - Scoreboard, which houses all the functionality; Scorecard, which shows the score for a particular game, displays the buttons to update the score and end the game and StartGame, which contains a simple form enabling the user to add a new game to the scoreboard.
4. To make it as simple as possible, I've decided to replace the score with inputs for both home and away teams with the value defaulting to the current score for a respective team. The inputs are being shown when the update score button is clicked and the update to the scoreboard happens when the OK button is clicked.
5. I've decided to round the value of numerical inputs to prevent an impossible situation from happening if the user tries to input a float in a team score input (goal tally must be a positive integer).
6. Simple validation has been implemented for the start game component. The team inputs cannot be empty, the team names cannot be the same (teams cannot play themselves) and a given team cannot be playing multiple games at the same time.
7. All components have unit tests (aiming for a 100% coverage).
8. Some rudimentary inline styling has been added to some elements to improve the legibility of the app just a little bit.
9. If the assumption wasn't to make the app as simple as possible, I would make some changes:
- use TypeScript or PropTypes to enforce type compatibility between the components
- make it prettier using either dedicated css files or one of the CSS in JS libraries (styled-components, etc.)