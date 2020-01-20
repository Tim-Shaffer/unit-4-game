# unit-4-game
*jQuery Game*

##Description:
* What is this repo?
* How does it work?
* Who will use this repo?
* What is the goal of this project?

#Star Wars RPG

###Description
*Interactive Role Play Game to feature dynamically updated HTML page using jQuery.*

1. When the game starts, the player will choose a character by clicking on the character's picture from the *Choose a character* section. The player will battle as that character for the rest of the game.
1. All remaining characters are moved to the *Enemies* section.  The player then chooses an opponent by clicking on an enemies picture.
1. The enemy selected is moved to the *Defender* section.
1. The player will now be able to click the attack button. 
  * Whenever the player clicks attack, their attack power damages the defender. The defender will lose health points.  The health points are displayed below the defender's picture.
  * If the defender survives the attack, the defender will counter attack.  The player's character will lose health points.  The health points are displayed below the character's picture.
1. The player will keep hitting the attack button in an effort to defeat the defender.
  * When the defender's health points are reduced to zero or below, the enemy is defeated and removed from the game.  The player then must choose a new *enemy* to attack.
1. The player must then defeat all of the remaining *enemies* in the same manner to win the game.
1. The player loses the game if their character's health points falls to zero or below.

#### Technical Game Notes
* Each character has their own *Health Points*, *Attack Power*, and *Counter Attack Power*.
* A players *Attack Power* will increase by it's base *Attack Power* after each attack.
  * **ie.  if the base *Attack Power* is 8, each attack will increase the *Attack Power* by 8 (8, 16, 24, 32, ...)**
* The *Defender* only has Counter Attack Power
  * **The Counter Attack Power remains the same.**
* **No characters in the game can heal or recover health points.**
* **Player must select the characters wisely.  Each character can win or lose dependent upon the order they fight the defenders.**

#Feed Homer RPG

###Description
*Interactive Role Play Game to feature dynamically updated HTML page using jQuery.*

1. There will be four donuts on the page.
1. The player will be shown a random number, Donuts needed to Satisfy.
1. The player will click an individual donut.  Donuts Fed will be updated by a specific number of donuts.
  * The game does not show the number of donuts assigned to each donut until that donut is clicked.
  * The Donuts Fed will be updated with the amount that donut was worth.
  * The player will have to calculate and remember each donut value to try and feed the correct amount **EXACTLY**
1. The player wins when the Donuts Fed matches the Donuts needed to Satisfy Homer.
  * An alert message will be triggered.
  * A sound of Homers appreciation will be triggered.
1. The player loses if they feed too many Donuts to Homer.
  * An alert message will be triggered.
  * A sound of Homers disappointment will be triggered.
1. Clicking the *OK* button on the Alert will trigger a new game to be reloaded.
  1. A new random number will be generated and shown as the **NEW** Donuts needed to Satisfy amount.
  1. Four new, *hidden*, random values will be assigned to the donut images.
  1. The Donuts Fed will also be reset to **0**
1. A score-board section will be populated at the end of the first game to keep track of the player's wins and losses.

#### Technical Game Notes
* The Donuts needed to Satisfy will be a random number between 19 and 120
* The Donut values will be random numbers between 1 and 12.
* No two Donuts will share the same value.
