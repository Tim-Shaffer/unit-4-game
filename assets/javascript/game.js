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
        attackPower = 0;

        // --------------------------------------------------------------------------------------
        // clear the restart button - should only appear at the end of the game
        // --------------------------------------------------------------------------------------
        $("#restart-section").empty();

        // --------------------------------------------------------------------------------------
        // clear other sections that may have had updates in previous game runs 
        // --------------------------------------------------------------------------------------
        $("#characters").empty();
        $("img").remove(".your-character");
        $("#your-character").hide();
        $("#your-enemies").hide();
        $("img").remove(".enemies");
        $("img").remove(".defender");
        $("#message-section").empty();

        //  *****
        // adding code to make things into cards so I can display the name and health points with the images
        //  *****
        // --------------------------------------------------------------------------------------
        //  add a card deck divison for the characters if it doesn't already exist
        // -------------------------------------------------------------------------------------- 
        if ($(".chars-deck").length === 0) {
            $("#characters").append('<div class="card-deck chars-deck"></div>');
        };
        // -------------------------------------------------------------------------------------- 
        //  *****
    
        // --------------------------------------------------------------------------------------
        // loop through the characters list and build the initial view of the possible characters
        // --------------------------------------------------------------------------------------
        for (var i = 0; i < characters.length; i++) {

            //  *****
            // var charImg = $("<img>");
            // charImg.attr('src', characters[i].Image);
            // charImg.addClass("img-thumbnail img-fluid images characters p-2 mx-1");
            // charImg.attr('id', characters[i].ID).attr("alt", characters[i].Name);
            // $("#characters").append(charImg)
            //  *****
            // --------------------------------------------------------------------------------------
            //  build the cards inside the card deck divison for the characters with an id associated to the character
            // -------------------------------------------------------------------------------------- 
            //  append a new div inside the deck for the card
            $(".chars-deck").append('<div class="card bg-light text-dark characters p-3" id="'+ characters[i].ID + '">');
            //  append the image inside the card
            $("#" + characters[i].ID).append('<img src="' + characters[i].Image 
                            +'" class="card-img-top img-thumbnail img-fluid images" alt="' 
                            + characters[i].Name +'"id="'+ characters[i].ID + '-img">');
            //  append a new div inside the card for the card body
            $("#" + characters[i].ID).append('<div class="card-body text-center card-img-overlay" id="'+ characters[i].ID + '-body">');
            //  append a new div inside the card body to hold the name
            $("#" + characters[i].ID + "-body").append('<div class="card-title plyr-name" id="'+ characters[i].ID + '-name">' + characters[i].Name + '</div>');
            //  append a new div inside the card body to hold the health points
            $("#" + characters[i].ID + "-body").append('<div class="card-title plyr-hp" id="'+ characters[i].ID + '-hp">' + characters[i].HealthPoints + '</div>');

            //  *****

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
               // using console.long I determined that the length of the html string when empty is 0 
               // - when the enemies deck is empty, there are no more fighters there is a WIN to message
               // --------------------------------------------------------------------------------------
               //    console.log($('#your-enemies').html().length);
               if ( $('#your-enemies').html().length === 0 ) {
                    
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
    //  *****
    //   updated the click to look for the card instead of the images 
    // $('body').on('click', ".images", function () {
    $('body').on('click', ".card", function () {
    //  *****
        var imgID;

        // --------------------------------------------------------------------------------------
        // Make sure that the image currently has the "characters" class 
        // -- ensures that the next steps only happen when the image clicked was part of the character list
        // --------------------------------------------------------------------------------------
        if ($(this).hasClass("characters")) {
            // console.log("recognized the click from the character section");
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
            // -- generate an array called matched which contains all the img elements in the section with the characters id
            // --------------------------------------------------------------------------------------
            //  *****
            //   updated the click to look for the card instead of the images
            // var matched = $("#characters img");
            var matched = $("#characters .card");
            //  *****
            
            // --------------------------------------------------------------------------------------
            //  loop through the array and move the remaining characters to the possible enemies
            // --------------------------------------------------------------------------------------
            for (i=0; i < matched.length; i++) {
                // --------------------------------------------------------------------------------------
                // remove the "characters" class and update it for move to the enemies section
                // --------------------------------------------------------------------------------------
                $("#" + matched[i].getAttribute("id")).removeClass("characters").addClass("enemies");
                //  *****
                $("#" + matched[i].getAttribute("id")).removeClass("bg-light").addClass("bg-red");
                //  *****

                // --------------------------------------------------------------------------------------
                // move the character to the "your-enemies" section 
                // - the act of appending the element to a new section also removes it from the original section
                // --------------------------------------------------------------------------------------
                //  *****
                //  move the character to the enemies-deck
                // $("#" + matched[i].getAttribute("id")).appendTo("#your-enemies");
                $("#" + matched[i].getAttribute("id")).appendTo(".enemies-deck");
                //  *****
            };

            // --------------------------------------------------------------------------------------
            // make sure the "characters" section is cleared out
            // --------------------------------------------------------------------------------------
            // $("#characters").empty();

            // display the sections 
            // document.getElementById("your-character").style.display = 'block';
            $("#your-character").show();
            //document.getElementById("your-enemies").style.display = 'block';
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
        console.log("Identified the click of the restart button");

        loadCharacters();

    });

    
    // --------------------------------------------------------------------------------------
    //  initialize the game and load the list of characters
    // --------------------------------------------------------------------------------------
    loadCharacters();

});
// --------------------------------------------------------------------------------------
// end of onkeyup function
// --------------------------------------------------------------------------------------

