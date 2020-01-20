// --------------------------------------------------------------------------------------
// Use this array to dynamically create buttons on the screen.
// --------------------------------------------------------------------------------------
var characters = [ 
    {
    Name: "Yoda",
    Image: "./assets/images/Yodatrur.png",
    ID: "Y",
    HealthPoints: 120,
    AttackPower: 10,
    CounterAttackPower: 24
    },
    {
    Name: "Rey",
    Image: "./assets/images/Reyureru.png",
    ID: "R",
    HealthPoints: 110,
    AttackPower: 12,
    CounterAttackPower: 20
    },
    {
    Name: "Darth Vader",
    Image: "./assets/images/Darth_Vader.png",
    ID: "DV",
    HealthPoints: 130,
    AttackPower: 10,
    CounterAttackPower: 15
    },
    {
    Name: "Darth Maul",
    Image: "./assets/images/Darth-Maul.png",
    ID: "DM",
    HealthPoints: 140,
    AttackPower: 8,
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

// adding audio effect - syntax from class activities 05-timers\08-simple-timer
var audio = new Audio("./assets/audio/lightsaber_02.mp3");
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
        attackPower = 0;

        // --------------------------------------------------------------------------------------
        // clear the restart button - should only appear at the end of the game
        // --------------------------------------------------------------------------------------
        $("#restart-section").empty();

        // --------------------------------------------------------------------------------------
        // clear other sections that may have had updates in previous game runs 
        // --------------------------------------------------------------------------------------
        $("#characters").show();
        $("div").remove(".your-character");
        $("#your-character").hide();
        $("#your-enemies").hide();
        $("div").remove(".enemies");
        $("div").remove(".defender");
        $("#message-section").empty();

        // --------------------------------------------------------------------------------------
        //  add a card deck divison for the characters if it doesn't already exist
        // -------------------------------------------------------------------------------------- 
        if ($(".chars-deck").length === 0) {
            $("#characters").append('<div class="card-deck chars-deck"></div>');
        };
        // -------------------------------------------------------------------------------------- 
    
        // --------------------------------------------------------------------------------------
        // loop through the characters list and build the initial view of the possible characters
        // --------------------------------------------------------------------------------------
        for (var i = 0; i < characters.length; i++) {

            // --------------------------------------------------------------------------------------
            //  build the cards inside the card deck divison for the characters with an id associated to the character
            //  1) append a new div inside the deck for the card
            //  2) append the image inside the card
            //  3) append a new div inside the card for the card body
            //  4) append a new div inside the card body to hold the name
            //  5) append a new div inside the card body to hold the health points
            // --------------------------------------------------------------------------------------  
            $(".chars-deck").append('<div class="card bg-light text-dark characters p-3" id="'+ characters[i].ID + '">');   
            $("#" + characters[i].ID).append('<img src="' + characters[i].Image 
                            +'" class="card-img-top img-thumbnail img-fluid images" alt="' 
                            + characters[i].Name +'"id="'+ characters[i].ID + '-img">');
            $("#" + characters[i].ID).append('<div class="card-body text-center card-img-overlay" id="'+ characters[i].ID + '-body">');
            $("#" + characters[i].ID + "-body").append('<div class="card-title plyr-name" id="'+ characters[i].ID + '-name">' + characters[i].Name + '</div>');
            $("#" + characters[i].ID + "-body").append('<div class="card-title plyr-hp" id="'+ characters[i].ID + '-hp">' + characters[i].HealthPoints + '</div>');

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
        // build the defender object based on the ID passed in the str
        // --------------------------------------------------------------------------------------
        var idx = 0;
        for (i=0; i < characters.length; i++) {
            if (characters[i].ID === str) {
                idx = i;
                i = characters.length;
            }
        };

        defender.Name = characters[idx].Name;
        defender.Image = characters[idx].Image;
        defender.ID = characters[idx].ID;
        defender.HealthPoints = characters[idx].HealthPoints;
        defender.AttackPower = characters[idx].AttackPower;
        defender.CounterAttackPower = characters[idx].CounterAttackPower;    

        if (defender) {
            return true;
        }
        else {
            return false;
        };

    } else {
        // --------------------------------------------------------------------------------------
        // default for any other value in option
        // - build the attacker object based on the ID passed in the str
        // --------------------------------------------------------------------------------------
        for (i=0; i < characters.length; i++) {
            if (characters[i].ID === str) {
                idx = i;
                i = characters.length;
            }
        };

        attacker.Name = characters[idx].Name;
        attacker.Image = characters[idx].Image;
        attacker.ID = characters[idx].ID;
        attacker.HealthPoints = characters[idx].HealthPoints;
        attacker.AttackPower = characters[idx].AttackPower;
        attacker.CounterAttackPower = characters[idx].CounterAttackPower;

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
// function to dynamically add the restart button when the game is finished
// --------------------------------------------------------------------------------------
function addRestartButton(){
    
    var tag = $("<button>")
    tag.attr('id', "button-restart").attr("value", "restart");

    tag.addClass("btn btn-dark p-3 m-1 restart");

    tag.html('<span>Restart</span>');

    $("#restart-section").append(tag);

};
// --------------------------------------------------------------------------------------
// end of the addREstartButton() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to process when the attack button is pressed 
//  main game play revolves around this function
// --------------------------------------------------------------------------------------
function attack() {
    // --------------------------------------------------------------------------------------
    // set variables to control messages back to the page
    // --------------------------------------------------------------------------------------
    var msg = "";
    var msg2 = "";

    // --------------------------------------------------------------------------------------
    // only process if the game is read to be played
    // --------------------------------------------------------------------------------------
    if (isGameReady) {
        // --------------------------------------------------------------------------------------
        // make sure an Attacker has been picked
        // --------------------------------------------------------------------------------------
        if (!isAttackerLoaded) {
            msg = "No Attacker selected Yet to attack with!"
        } 
        // --------------------------------------------------------------------------------------
        // make sure a Defender has been picked
        // --------------------------------------------------------------------------------------
        else if (!isDefenderLoaded) {
            msg = "No Defender selected yet to attack!"
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
            msg = "You attacked " + defender.Name + " for " + attackPower + " damage.";

            // --------------------------------------------------------------------------------------
            // display the defender's updated health points accordingly
            // --------------------------------------------------------------------------------------
            $("#" + defender.ID + "-hp").text(defender.HealthPoints);

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
                msg = "You have defeated " + defender.Name + ".  Choose another enemy to fight.";
                $("#defender").empty();
                isDefenderLoaded = false;

               // --------------------------------------------------------------------------------------
               // using console.long I determined that the length of the html string when empty is 18 
               // - when the enemies deck is empty, there are no more fighters there is a WIN to message
               // --------------------------------------------------------------------------------------
               if ( $('.enemies-deck').html().length === 18 ) {
                    
                    msg = "You Won!!!!!!  GAME OVER";
                    isDefenderLoaded =false;
                    isGameReady = false;                    
                    addRestartButton();

                } 
                // --------------------------------------------------------------------------------------
                // still more enemies to attack
                // --------------------------------------------------------------------------------------
                else {
                    msg = "You have defeated " + defender.Name + ".  Choose another enemy to fight.";
                };
            } 
            // --------------------------------------------------------------------------------------
            //  defender can counter attack
            //  - adjust the attackers health 
            // --------------------------------------------------------------------------------------
            else {
                attacker.HealthPoints -= defender.CounterAttackPower;

                // --------------------------------------------------------------------------------------
                // display the attackr's updated health points accordingly
                // --------------------------------------------------------------------------------------
                $("#" + attacker.ID + "-hp").text(attacker.HealthPoints);
               
                // --------------------------------------------------------------------------------------
                // verify the remaining health of the attacker after a counter attack
                // - set message for a defeat
                // - update booleans so no further action can occur in the game
                // --------------------------------------------------------------------------------------
                if (attacker.HealthPoints <= 0 ) {
                    msg = "You have been defeated...GAME OVER!!!"
                    isAttackerLoaded = false;
                    isGameReady = false;
                    
                    addRestartButton();
                } 
                // --------------------------------------------------------------------------------------
                //  add the second half of the message to display the counter attack 
                // --------------------------------------------------------------------------------------
                else {
                    msg2 = defender.Name + " attacked you back for " + defender.CounterAttackPower + " damage."
                }
            }    
            
            // adding audio effect - syntax from class activities 05-timers\08-simple-timer
            audio.play();

        };
        
        // --------------------------------------------------------------------------------------
        // empty the message section so it can be reload with the new message
        // --------------------------------------------------------------------------------------
        $("#message-section").empty();

        // --------------------------------------------------------------------------------------
        // display the message to the page in the message section
        // --------------------------------------------------------------------------------------
        var msgTag = $("<h3>");
        msgTag.text(msg);
        $("#message-section").append(msgTag);

        // --------------------------------------------------------------------------------------
        // display the counter attack message to the page in if it is valued
        // --------------------------------------------------------------------------------------
        if (msg2 > "") {
            msgTag = $("<h3>");
            msgTag.text(msg2);
            $("#message-section").append(msgTag);
        };

    }

};
// --------------------------------------------------------------------------------------
// end of the attack() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// This function enacts when the html document has been loaded and is ready
// --------------------------------------------------------------------------------------
$(document).ready(function() {

    // --------------------------------------------------------------------------------------
    //  click events associated with the images class to allow for one function to handle different sections
    //  - was not working after a restart with original click setup
    //  - found a workaround solution from https://makeitspendit.com/fix-jquery-click-event-not-working-with-dynamically-added-elements/
    // --------------------------------------------------------------------------------------
    // $(".images").on("click", function() {
    // --------------------------------------------------------------------------------------
    $('body').on('click', ".card", function () {
        var imgID;

        // --------------------------------------------------------------------------------------
        // Make sure that the image currently has the "characters" class 
        // -- ensures that the next steps only happen when the image clicked was part of the character list
        // --------------------------------------------------------------------------------------
        if ($(this).hasClass("characters")) {
            // --------------------------------------------------------------------------------------
            // get the id of the clicked area
            // --------------------------------------------------------------------------------------
            imgID = $(this).attr('id');

            // --------------------------------------------------------------------------------------
            // remove the "character" class and update it for move to the attacker section
            // --------------------------------------------------------------------------------------
            $("#" + imgID).removeClass("characters").addClass("your-character");

            // --------------------------------------------------------------------------------------
            // move the character clicked to the "your-character" area 
            // - the act of appending the element to a new section also removes it from the original section
            // --------------------------------------------------------------------------------------
            $("#" + imgID).appendTo("#your-character");
            // --------------------------------------------------------------------------------------
            
            // --------------------------------------------------------------------------------------
            // Build the attacker object with information from the selected character 
            // --------------------------------------------------------------------------------------
            isAttackerLoaded = buildPlayer(imgID);

            // --------------------------------------------------------------------------------------
            // determine how many more characters are to be moved 
            // found logic to get the array here:  https://www.tutorialrepublic.com/faq/how-to-get-number-of-elements-in-a-div-using-jquery.php
            // -- generate an array called matched which contains all the elements having a card class in the section with the characters id
            // --------------------------------------------------------------------------------------
            var matched = $("#characters .card");
            
            // --------------------------------------------------------------------------------------
            //  loop through the array and move the remaining characters to the possible enemies
            // --------------------------------------------------------------------------------------
            for (i=0; i < matched.length; i++) {
                // --------------------------------------------------------------------------------------
                // remove the "characters" class and update it for move to the enemies section
                // --------------------------------------------------------------------------------------
                $("#" + matched[i].getAttribute("id")).removeClass("characters").addClass("enemies");
                
                // --------------------------------------------------------------------------------------
                // remove the "bg-light" class and update it for move to the enemies section so the background will be red
                // --------------------------------------------------------------------------------------
                $("#" + matched[i].getAttribute("id")).removeClass("bg-light").addClass("bg-red");

                // --------------------------------------------------------------------------------------
                // move the character to the "enemies-deck" section 
                // - the act of appending the element to a new section also removes it from the original section
                // --------------------------------------------------------------------------------------
                $("#" + matched[i].getAttribute("id")).appendTo(".enemies-deck");
 
            };

            // --------------------------------------------------------------------------------------
            // make sure the "characters" section is hidden
            // --------------------------------------------------------------------------------------
            $("#characters").hide();

            // --------------------------------------------------------------------------------------
            // display the sections 
            // --------------------------------------------------------------------------------------
            $("#your-character").show();
            $("#your-enemies").show();

        } 
        // --------------------------------------------------------------------------------------
        // Make sure that the image currently has the "enemies" class 
        // -- ensures that the next steps only happen when the image clicked was part of the enemies list
        // --------------------------------------------------------------------------------------
        else if ($(this).hasClass("enemies")) {
            // --------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------
            if ($(this).hasClass("enemies") && !isDefenderLoaded) {
                // --------------------------------------------------------------------------------------
                // get the id of the clicked area 
                // --------------------------------------------------------------------------------------
                imgID = $(this).attr('id');

                // --------------------------------------------------------------------------------------
                // remove the "enemies" class and update it for move to the defender section
                // --------------------------------------------------------------------------------------
                $("#" + imgID).removeClass("enemies").addClass("defender");

                // --------------------------------------------------------------------------------------
                // move the character to the defender section 
                // - the act of appending the element to a new section also removes it from the original section
                // --------------------------------------------------------------------------------------
                $("#" + imgID).appendTo("#defender");

                // --------------------------------------------------------------------------------------
                // Build the defender object with information from the selected character 
                // --------------------------------------------------------------------------------------
                isDefenderLoaded = buildPlayer(imgID, 2);
            }

        } ;
        // --------------------------------------------------------------------------------------
        // clicking on an image in any other section does NOTHING!!!
        // --------------------------------------------------------------------------------------

    });

    // --------------------------------------------------------------------------------------
    //  execute the attack function logic when the attack button is clicked
    // - this works as is since the button was NOT added dynamically
    // --------------------------------------------------------------------------------------
    $("#button-attack").on("click", function() {

        attack();

    });

    // --------------------------------------------------------------------------------------
    //  execute the loadCharacters function logic when the restart button is clicked
    //  - was not working with original click setup
    //  - found a workaround solution from https://makeitspendit.com/fix-jquery-click-event-not-working-with-dynamically-added-elements/
    // --------------------------------------------------------------------------------------
    // $("#button-restart").on("click", function() {
    $('body').on('click', "#button-restart", function () {

        loadCharacters();

    });

    
    // --------------------------------------------------------------------------------------
    //  initialize the game and load the list of characters
    // --------------------------------------------------------------------------------------
    loadCharacters();

});
// --------------------------------------------------------------------------------------
// end of $(document).ready(function()
// --------------------------------------------------------------------------------------

