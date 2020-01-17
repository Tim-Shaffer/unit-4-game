// --------------------------------------------------------------------------------------
// Use this array to dynamically create buttons on the screen.
// --------------------------------------------------------------------------------------
var characters = [ 
    {
    Name: "Yoda",
    Image: "./assets/images/Yodatrur.png",
    ID: "Y",
    HealthPoints: 120,
    AttackPower: 8,
    CounterAttackPower: 25
    },
    {
    Name: "Rey",
    Image: "./assets/images/Rey.jpg",
    ID: "R",
    HealthPoints: 100,
    AttackPower: 5,
    CounterAttackPower: 5
    },
    {
    Name: "Darth Vader",
    Image: "./assets/images/DV.jpg",
    ID: "DV",
    HealthPoints: 150,
    AttackPower: 6,
    CounterAttackPower: 15
    },
    {
    Name: "Darth Maul",
    Image: "./assets/images/darth-maul.jpeg",
    ID: "DM",
    HealthPoints: 180,
    AttackPower: 10,
    CounterAttackPower: 20
    }
];

// --------------------------------------------------------------------------------------
// Global Variables
// --------------------------------------------------------------------------------------
var attacker = {};
var defender = {};
// --------------------------------------------------------------------------------------
// Booleans
// --------------------------------------------------------------------------------------
isAttackerLoaded = false;
isDefenderLoaded = false;
isGameReady = false;

// to increment Attack Power after each successful attack
var attackPower = 0;
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to dynamically load the character pictures to start the game
//  --  also resets variables for proper functionality on a restart
// --------------------------------------------------------------------------------------
function loadCharacters() {

// --------------------------------------------------------------------------------------
// verify that this function was called because the game was not yet ready to play
// --------------------------------------------------------------------------------------
    if (!isGameReady) {

        // --------------------------------------------------------------------------------------
        // reset/clear any variables that may have been previously updated
        // --------------------------------------------------------------------------------------
        attacker = {};
        defender = {};
        isAttackerLoaded = false;
        isDefenderLoaded = false;

        // --------------------------------------------------------------------------------------
        // clear the restart button - should only appear at the end of the game
        // --------------------------------------------------------------------------------------
        $("#restart-section").empty();
    
        // --------------------------------------------------------------------------------------
        // loop through the characters list and build the initial view of the possible characters
        // --------------------------------------------------------------------------------------
        for (var i = 0; i < characters.length; i++) {

            var charImg = $("<img>");
            charImg.attr('src', characters[i].Image);
            charImg.addClass("img-thumbnail img-fluid images characters p-2 mx-1");
            charImg.attr('id', characters[i].ID).attr("alt", characters[i].Name);
            $("#characters").append(charImg)

        };

        // --------------------------------------------------------------------------------------
        // set the variable to identify that the game is ready to be played
        // --------------------------------------------------------------------------------------
        isGameReady = true;

    }

};
// --------------------------------------------------------------------------------------
// end of the loadCharacters() function
// --------------------------------------------------------------------------------------
        

// --------------------------------------------------------------------------------------
// function to build the attacker of defender player objects for game play
// Option 1 - (default) - Build the Attacker
// Option 2 - Build the Defender
// 
// Returns True or False based on the successful completion of the object
// --------------------------------------------------------------------------------------
function buildPlayer(str, opt=1) {

    if (opt === 2) {
        // --------------------------------------------------------------------------------------
        // logic found in stack overflow - build the defender object based on the ID passed in the str
        // --------------------------------------------------------------------------------------
        defender = characters.find(o => o.ID === str);

        if (defender) {
            return true;
        }
        else {
            return false;
        };

    } else {
        // --------------------------------------------------------------------------------------
        //default for any other value in option
        // logic found in stack overflow - build the attacker object based on the ID passed in the str
        // --------------------------------------------------------------------------------------
        attacker = characters.find(o => o.ID === str);

        if (attacker) {
            return true;
        }
        else {
            return false;
        };

    }; 

};
// --------------------------------------------------------------------------------------
// end of the buildPlayer() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to process when the attack button is pressed 
//  main game play revolves around this function
// --------------------------------------------------------------------------------------
function attack() {
    // --------------------------------------------------------------------------------------
    // set variables to control messages back to the page
    // --------------------------------------------------------------------------------------
    var message = "";
    var msg2 = "";

    // --------------------------------------------------------------------------------------
    // only process if the game is read to be played
    // --------------------------------------------------------------------------------------
    if (isGameReady) {
        // --------------------------------------------------------------------------------------
        // make sure an Attacker has been picked
        // --------------------------------------------------------------------------------------
        if (!isAttackerLoaded) {
            message = "No Attacker selected Yet to attack with!"
        } 
        // --------------------------------------------------------------------------------------
        // make sure a Defender has been picked
        // --------------------------------------------------------------------------------------
        else if (!isDefenderLoaded) {
            message = "No Defender selected yet to attack!"
        } 
        // --------------------------------------------------------------------------------------
        // both the Attacker and Defender are in place
        // --------------------------------------------------------------------------------------
        else  {

            // --------------------------------------------------------------------------------------
            // increment the attack Power by adding the attackers default to the previous value
            //  (For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on)
            // --------------------------------------------------------------------------------------
            attackPower += attacker.AttackPower;

            // --------------------------------------------------------------------------------------
            // reduce the defenders health by the power of the attack and create a message
            // --------------------------------------------------------------------------------------
            defender.HealthPoints -= attackPower; 
            message = "You attacked " + defender.Name + " for " + attackPower + " damage.";

            // --------------------------------------------------------------------------------------
            // verify the remaining health of the defender after an attack
            // - can only counter attack if the initial attack didn't defeat the defender
            // --------------------------------------------------------------------------------------
            if (defender.HealthPoints <= 0) {
                // --------------------------------------------------------------------------------------
                //  defender was defeated
                //  - create the message
                //  - prepare the defender section for a new character to be picked
                //  - update boolean that there is no longer a defender to attack
                // --------------------------------------------------------------------------------------
                message = "You have defeated " + defender.Name + ".  Choose another enemy to fight.";
                $("#defender").empty();
                isDefenderLoaded = false;
            } 
            // --------------------------------------------------------------------------------------
            //  defender can counter attack
            //  - adjust the attackers health 
            // --------------------------------------------------------------------------------------
            else {
                attacker.HealthPoints -= defender.CounterAttackPower;
               
                // --------------------------------------------------------------------------------------
                // verify the remaining health of the attacker after a counter attack
                // - set message for a defeat
                // - update booleans so no further action can occur in the game
                // --------------------------------------------------------------------------------------
                if (attacker.HealthPoints <= 0 ) {
                    message = "You have been defeated...GAME OVER!!!"
                    isAttackerLoaded = false;
                    isGameReady = false;
                    // Add logic to create a new Restart Button
                } 
                // --------------------------------------------------------------------------------------
                //  add the second half of the message to display the counter attack 
                // --------------------------------------------------------------------------------------
                else {
                    msg2 = defender.Name + " attacked you back for " + defender.CounterAttackPower + " damage."
                }
            }      

        };
        
        console.log(message);
        if (msg2 > "" ) {console.log(msg2)};
    }
};
// --------------------------------------------------------------------------------------
// end of the attack() function
// --------------------------------------------------------------------------------------


$(document).ready(function() {

    loadCharacters();

    // ATTACH ON-CLICK EVENTS TO "CHARACTER" BUTTONS
    // =================================================================================
    $(".images").on("click", function() {
        var imgID;
        // Make sure that the button currently has the "characters" class before doing anything so the action doesn't occur for other clicks.
        if ($(this).hasClass("characters")) {
            // console.log("recognized the click from the character section");
            //  -------------------------------------------------------
            // get the id of the clicked area and apply-
            imgID = $(this).attr('id');

            // remove the "character" from the selected item so it won't be impacted if clicked again!
            $("#" + imgID).removeClass("characters").addClass("your-character");

            // move the character clicked to the "your-character" area
            $("#" + imgID).appendTo("#your-character");
            //  -------------------------------------------------------
            //  The above automatically moves the referenced item from the first area to the new area
            //  -------------------------------------------------------

            //Build the attacker object with information from the selected character 
            // isAttackerLoaded = buildAttacker(imgID);
            isAttackerLoaded = buildPlayer(imgID);
            // console.log(attacker.Name);
            // console.log(attacker.HealthPoints);
            // console.log(attacker.AttackPower);

            // determine how many more characters are to be moved 
            // found logic to get the array here:  https://www.tutorialrepublic.com/faq/how-to-get-number-of-elements-in-a-div-using-jquery.php
            var matched = $("#characters img");
            for (i=0; i < matched.length; i++) {
                // remove the "characters" and add a new class of "enemies"!
                $("#" + matched[i].getAttribute("id")).removeClass("characters").addClass("enemies");

                // move the character to the "your-enemies" div
                $("#" + matched[i].getAttribute("id")).appendTo("#your-enemies");
            }

            $("#characters").empty();

        } else if ($(this).hasClass("enemies")) {
            // console.log("recognized the click to select an enemy");
            if ($(this).hasClass("enemies") && !isDefenderLoaded) {
                //  -------------------------------------------------------
                // get the id of the clicked area and apply-
                imgID = $(this).attr('id');

                // remove the "character" from the selected item so it won't be impacted if clicked again!
                $("#" + imgID).removeClass("enemies").addClass("defender");

                // move the character clicked to the "your-character" area
                $("#" + imgID).appendTo("#defender");

                //Build the attacker object with information from the selected character 
                // isDefenderLoaded = buildDefender(imgID);
                isDefenderLoaded = buildPlayer(imgID, 2);
                // console.log(defender.Name);
                // console.log(defender.HealthPoints);
                // console.log(defender.CounterAttackPower);
                
                //  -------------------------------------------------------
                //  The above automatically moves the referenced item from the first area to the new area
                //  -------------------------------------------------------
            }

        } else if ($(this).hasClass("your-character")) {
            // console.log("recognized the click of your character");
            // NULL function so that nothing happens
        }

    });

    $("#button-attack").on("click", function() {

        attack();

    });

    // $("#button-restart").on("click", function() {

    //     loadCharacters();

    // });

});