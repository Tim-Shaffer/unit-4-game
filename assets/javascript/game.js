// Use this array to dynamically create buttons on the screen.
var characters = [ {
    Name: "Darth Vader",
    Image: "./assets/images/DV.jpg",
    },
    {
    Name: "Yoda",
    Image: "./assets/images/Yodatrur.png",
    },
    {
    Name: "Darth Maul",
    Image: "./assets/images/darth-maul.jpeg",
    },
    {
    Name: "Rey",
    Image: "./assets/images/Rey.jpg",
    }
];

$(document).ready(function() {

    // DYNAMICALLY CREATE PLAYER CHARACTER OPTIONS
    // =================================================================================

    // 1. Create a for-loop to iterate through the letters array.
    for (var i = 0; i < characters.length; i++) {

        // <img src="..." alt="..." class="img-thumbnail">
        var charImg = $("<img>");

        charImg.attr('src', characters[i].Image);

        charImg.addClass("img-thumbnail img-fluid images characters");

        charImg.attr('id', characters[i].Name).attr("alt", characters[i].Name);

        $("#characters").append(charImg);

    };

    // ATTACH ON-CLICK EVENTS TO "CHARACTER" BUTTONS
    // =================================================================================
    $(".images").on("click", function() {
        var btnID;
        // Make sure that the button currently has the "characters" class before doing anything so the action doesn't occur for other clicks.
        if ($(this).hasClass("characters")) {
            console.log("recognized the click from the character section");
            //  -------------------------------------------------------
            // get the id of the clicked area and apply-
            btnID = $(this).attr('id');

            // remove the "character" from the selected item so it won't be impacted if clicked again!
            $("#" + btnID).removeClass("characters").addClass("your-character");

            // move the character clicked to the "your-character" area
            $("#" + btnID).appendTo("#your-character");
            
            //  -------------------------------------------------------
            //  The above automatically moves the referenced item from the first area to the new area
            //  -------------------------------------------------------

            // determine how many more characters are to be moved 
            // found logic to get the array here:  https://www.tutorialrepublic.com/faq/how-to-get-number-of-elements-in-a-div-using-jquery.php
            var matched = $("#characters button");
            for (i=0; i < matched.length; i++) {
                // remove the "characters" and add a new class of "enemies"!
                $("#" + matched[i].getAttribute("id")).removeClass("characters").addClass("enemies");

                // move the character to the "your-enemies" div
                $("#" + matched[i].getAttribute("id")).appendTo("#your-enemies");
            }

            $("#characters").empty();

        } else if ($(this).hasClass("enemies")) {
            console.log("recognized the click to select an enemy");
            if ($(this).hasClass("enemies")) {
                //  -------------------------------------------------------
                // get the id of the clicked area and apply-
                btnID = $(this).attr('id');

                // remove the "character" from the selected item so it won't be impacted if clicked again!
                $("#" + btnID).removeClass("enemies").addClass("defender");

                // move the character clicked to the "your-character" area
                $("#" + btnID).appendTo("#defender");
                
                //  -------------------------------------------------------
                //  The above automatically moves the referenced item from the first area to the new area
                //  -------------------------------------------------------
            }

        } else if ($(this).hasClass("your-character")) {
            console.log("recognized the click of your character");
            // NULL function so that nothing happens
        }

    });

});