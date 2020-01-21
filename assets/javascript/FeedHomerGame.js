// Global Variables
var donutsNeeded  = 0;
var donuts = [];
var imgID = 0;
var donutsFed = 0;
var win = 0;
var loss = 0;

// Booleans
var isGameReady = false;
var donutsNeededOdd = false;
var atLeastOneDonutOdd = false;

// Audio references
var audioWin = new Audio("./assets/audio/baddonut.wav");
var audioLoss = new Audio("./assets/audio/doh.mp3");

// --------------------------------------------------------------------------------------
// function to initially load the game or reload after a round has been completed
// --------------------------------------------------------------------------------------
function reloadGame() {
    
    if (!isGameReady) {
        // execute the function to get number to match
        donutsToSatisfy();
        // execute function to set individual image values
        setDonutValues();
        // initialize the count
        donutsFed = 0;
        // add the count to the page
        $("#total-fed").text(donutsFed);

        // add the scoreboard display after a verdict has been determined that will update after each round
        if (win > 0 || loss > 0) {
            $("#scoreboard-section").html('<h1>WINS:  ' + win + '  LOSSES:  ' + loss + '</h1>');
        };

        // return true so that the isGameReady variable can be updated
        return true;
    }

};
// --------------------------------------------------------------------------------------
// end of the reloadGame() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to randomly set the number to match to a value between 19 and 120
// --------------------------------------------------------------------------------------
function donutsToSatisfy() {

    // only execute if game is not ready to play
    if(!isGameReady) {
        // calculate a number between 19 and 120 
        // -  random provides number from 0 to 1
        // -  floor takes it downward to the nearest integer and multiplying by 101 sets the upper limit to 101
        // -  add 19 to set the proper range
        donutsNeeded = Math.floor(Math.random() * 101) + 19;

        // adding check of even\odd on donuts needed to determine if we need to have at least one odd donut
        // if the remainder\modulus of dividing a number by 2 is 0, it is even.  Otherwise, it is odd.
        if (donutsNeeded % 2 === 0) {
            donutsNeededOdd = false;
        }   
        else {
            donutsNeededOdd = true;
        }
        
        // find the total-needed id and update the text to the number needed
        $("#total-needed").text(donutsNeeded);
    }
};
// --------------------------------------------------------------------------------------
// end of the donutsToSatisfy() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to randomly set the number to match to a value between 19 and 120
// --------------------------------------------------------------------------------------
function setDonutValues() {
        
    // only execute if game is not ready to play
    if(!isGameReady) {
        // reset donuts array to empty
        donuts = [];
        var newValue = 0;
        // set the Odd donut check to false before the array is populated.
        atLeastOneDonutOdd = false;

        // randomly set the values for the 4 images by updating the array
        for (i=0; i < 4; i++ ) {
            // calculate a number between 1 and 12 
            // -  random provides number from 0 to 1
            // -  floor takes it downward to the nearest integer and multiplying by 11 sets the upper limit to 11
            // -  add 1 to set the proper range
            newValue = Math.floor(Math.random() * 11) + 1;
            // make sure that each value is unique to the array
            if (donuts.indexOf(newValue) === -1 ) {
                // check to see if the value is Odd if there aren't any that are already odd
                if (!atLeastOneDonutOdd && !(newValue % 2 === 0)) {
                    atLeastOneDonutOdd = true;
                }; 

                // on the last iteration:
                // - do we need an odd value? && we still don't have an odd value
                if (donutsNeededOdd && (i === donuts.length - 1) && !atLeastOneDonutOdd) {
                    
                    // can I subtract 1 from the newValue and still be unique to the array - creating an odd in the process
                    if (donuts.indexOf(newValue - 1) === -1) {
                        donuts.push(newValue - 1);
                    }
                    // can I add 1 from the newValue without going over the max allowed and still be unique to the array - creating an odd in the process
                    else if (newValue + 1 < 12 && (donuts.indexOf(newValue + 1) === -1)){
                        donuts.push(newValue + 1);
                    }
                    // an odd can not be manipulated so generate a new number by resetting the iterator back 1 causing it to loop again
                    else {
                        i--;
                    }

                }
                // we have fallen here and either don't need an odd, aren't on the last value, or at least one odd is already available
                else {
                    donuts.push(newValue);
                };

            }    
            // number was already found in the array so reset the iterator back 1 so the loop will try again
            else {
                i--;
            };
            
        };

    };

};
// --------------------------------------------------------------------------------------
// end of the donutsToSatisfy() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to process when an image is clicked
// - uses the value from the clicked image as an input variable to determine which index of the array to use
// --------------------------------------------------------------------------------------
function donutClicked(idx) {

    // only execute if game is ready to play
    if (isGameReady) {
        // gather the value of the donuts array for the provided index and add it to the amount already fed
        donutsFed += donuts[idx];
        // find the total-fed id and update the text to the number fed so far
        $("#total-fed").text(donutsFed);
    }
    
};
// --------------------------------------------------------------------------------------
// end of the donutClicked() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to display the alert for the result
// - option 1 - display a winning message (default)
// - option 2 - display a losing message 
//
// reset the game to be able to play again
//
// --------------------------------------------------------------------------------------
function playResults(opt=1) {
    if (opt === 2) {
        alert("You fed Homer too many Donuts!");
    } 
    else {
        alert("Congratulations! Homer has eaten the right amount of donuts");
    } 

    isGameReady = false;
    isGameReady = reloadGame(); 

};
// --------------------------------------------------------------------------------------
// end of the playResults() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to determine how to proceed 
// - uses the value from the clicked image as an input variable to determine which index of the array to use
// --------------------------------------------------------------------------------------
function checkFed() {
    
    // only execute if game is ready to play
    if (isGameReady) {
        // check if the amounts match exactly
        if (donutsFed === donutsNeeded) {
            // update as a win
            win++;

            // Play "Umm...Donuts" Audio
            audioWin.play();

            // show the proper alert based on a win
            // playResults();
            // Needed to add this timeout to allow the display to change before the results were checked
            setTimeout(function() {playResults()},300);   
 
        } 
        // check if the guess is more than the amount to match
        else if (donutsFed > donutsNeeded) {
            // update as a loss
            loss++;

            // Play "Doh" Audio
            audioLoss.play();

            // show the proper alert based on a loss
            // playResults(2);
            // Needed to add this timeout to allow the display to change before the results were checked
            setTimeout(function() {playResults(2)},300);
        }

    };
};
// --------------------------------------------------------------------------------------
// end of the checkFed() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// This function enacts when the html document has been loaded and is ready
// --------------------------------------------------------------------------------------
$(document).ready(function() {

    $('body').on('click', '.images', function () { 
        imgID = parseInt($(this).attr('value'));
        donutClicked(imgID);
        
        // process the updated amounts 
        checkFed();

    });

    // initialize game values and set it ready to play
    isGameReady = reloadGame();


});
// --------------------------------------------------------------------------------------
// end of $(document).ready(function()
// --------------------------------------------------------------------------------------
