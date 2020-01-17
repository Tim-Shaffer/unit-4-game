// Use this array to dynamically create buttons on the screen.
var characters = [ 
    {
    Name: "Yoda",
    Image: "./assets/images/Yodatrur.png",
    ID: "yoda",
    HealthPoints: 120,
    AttackPower: 8,
    CounterAttackPower: 25
    },
    {
    Name: "Rey",
    Image: "./assets/images/Rey.jpg",
    ID: "rey",
    HealthPoints: 100,
    AttackPower: 5,
    CounterAttackPower: 5
    },
    {
    Name: "Darth Vader",
    Image: "./assets/images/DV.jpg",
    ID: "darth-vader",
    HealthPoints: 150,
    AttackPower: 6,
    CounterAttackPower: 15
    },
    {
    Name: "Darth Maul",
    Image: "./assets/images/darth-maul.jpeg",
    ID: "darth-maul",
    HealthPoints: 180,
    AttackPower: 10,
    CounterAttackPower: 20
    }
];

// Global Variables
var attacker = {};
var defender = {};
// Booleans
isAttackerLoaded = false;
isDefenderLoaded = false;
isGameReady = false;
// to increment Attack Power
var attackPower = 0;

function loadCharacters() {

    if (!isGameReady) {

        // reset/clear any variables that may have been previously updated
        attacker = {};
        defender = {};
    
        for (var i = 0; i < characters.length; i++) {

            // <img src="..." alt="..." class="img-thumbnail">
            var charImg = $("<img>");

            charImg.attr('src', characters[i].Image);

            charImg.addClass("img-thumbnail img-fluid images characters p-2 mx-1");

            charImg.attr('id', characters[i].ID).attr("alt", characters[i].Name);

            $("#characters").append(charImg)

        };

        isGameReady = true;

    }

};

function buildPlayer(str, opt=1) {
    // Option 1 - (default) - Build the Attacker
    // Option 2 - Build the Defender
    if (opt === 2) {
        // logic found in stack overflow
        defender = characters.find(o => o.ID === str);

        if (defender) {
            return true;
        }
        else {
            return false;
        };
    } else {
        //default for any other value in option
        // logic found in stack overflow
        attacker = characters.find(o => o.ID === str);

        if (attacker) {
            return true;
        }
        else {
            return false;
        };

    }; 

};

function attack() {
    // console.log("recognized the click of the attack button");
    var message = "";
    var msg2 = "";

    if (!isAttackerLoaded) {
        message = "No Attacker selected Yet to attack with!"
    } else if (!isDefenderLoaded) {
        message = "No Defender selected yet to attack!"
    } else  {

        attackPower += attacker.AttackPower;

        defender.HealthPoints -= attackPower; 
        message = "You attacked " + defender.Name + " for " + attackPower + " damage.";

        if (defender.HealthPoints <= 0) {
            message = "You have defeated " + defender.Name + ".  Choose another enemy to fight.";
            $("#defender").empty();
            isDefenderLoaded = false;
        } else {
            attacker.HealthPoints -= defender.CounterAttackPower;
            if (attacker.HealthPoints <= 0 ) {
                message = "You have been defeated...GAME OVER!!!"
                isAttackerLoaded = false;
                isGameReady = false;
            } else {
                msg2 = defender.Name + " attacked you back for " + defender.CounterAttackPower + " damage."
            }
        }      

    };
    console.log(message);
    if (msg2 > "" ) {console.log(msg2)}
}

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
        // console.log(attacker);
        // console.log(defender);

    });

});