// Global Variables
var donutsNeeded  = 0;
var donuts = [];
var imgID = 0;
var donutsFed = 0;
var win = 0;
var loss = 0;

// Booleans
isGameReady = false;

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

    // only execute if game is ready to play
    if(!isGameReady) {
        // calculate a number between 19 and 120 
        // -  random provides number from 0 to 1
        // -  floor takes it downward to the nearest integer and multiplying by 101 sets the upper limit to 101
        // -  add 19 to set the proper range
        donutsNeeded = Math.floor(Math.random() * 101) + 19;
        
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
        
    // only execute if game is ready to play
    if(!isGameReady) {
        // reset donuts array to empty
        donuts = [];
        var newValue = 0;

        // randomly set the values for the 4 images by updating the array
        for (i=0; i < 4; i++ ) {
            // calculate a number between 1 and 12 
            // -  random provides number from 0 to 1
            // -  floor takes it downward to the nearest integer and multiplying by 11 sets the upper limit to 11
            // -  add 1 to set the proper range
            newValue = Math.floor(Math.random() * 11) + 1;
            // make sure that each value is unique to the array
            if (donuts.indexOf(newValue) === -1 ) {
                donuts.push(newValue);
            }
            // number was already found in the array so reset 1 so the loop will try again
            else {
                i -= 1;
            };
            
        };

    }

};
// --------------------------------------------------------------------------------------
// end of the donutsToSatisfy() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// This function enacts when the html document has been loaded and is ready
// --------------------------------------------------------------------------------------
$(document).ready(function() {

    $('body').on('click', '.images', function () { 
        
    });

    // initialize game values and set it ready to play
    isGameReady = reloadGame();


});
// --------------------------------------------------------------------------------------
// end of $(document).ready(function()
// --------------------------------------------------------------------------------------
