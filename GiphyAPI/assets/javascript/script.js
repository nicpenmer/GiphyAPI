///Things I need to fix: 
//input button - search
// the image attachemnet to div, while trying to animate it the images 
//stopped showing up in div, where they wereshowing up previous.
//setting the results to return 10 images, I managed to get them to show 25 
//and to show one at a time. not 10.... arrrgh. Sorry Bill, im trying. 

$(document).ready(function () {

    console.log("ready!");



    //variable array to polulate 

    var puns = ["Animals", "Food", "Drinks", "Nature", "Movies"];

    //on click function for buttons. add ajax request. link the url and api key
    function displayPuns() {
        $("")
        var pun = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            pun + "&api_key=WoWekBohBFrfDUz1X7ymO3z75yPV8c8B&limit=10";

        /// not limiting results to 10 -- needs to fix this. 

        $.ajax({
            url: queryURL,
            method: "GET"
        }) // gets info and then a response from the request, puts data below. 
            .then(function (response) {
                //response data
                var results = response.data;
                console.log(response);
                //for loop to go through results and create and lot a gifdiv. 
                for (var i = 0; i < results.length; i++) {
                    //creates div for gifs
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    console.log(rating);
                    //adds the rating to the DOM,
                    var showRating = $("<p>").text("Rating: " + rating);

                    //image of gif, add data-state
                    var gifImage = $("<img>");
                    function animate() {
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }
                        else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still)");
                        }

                    }
                    animate();
                }
                //this attaches rating to gifdiv
                gifDiv.prepend(showRating);


                $("#gifs").prepend(gifDiv);
                //puts into the gifdiv
                gifDiv.prepend(gifImage);
                //this attaches image to div
                //click to animate/make still


            });

    }


    function renderButtons() {
        // Deleting the movies prior to adding new puns
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < puns.length; i++) {
            // Then dynamicaly generating buttons for each pun category in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of pun-btn to our button
            a.addClass("pun-btn");
            // Adding a data-attribute
            a.attr("data-name", puns[i]);
            // Providing the initial button text
            a.text(puns[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    // This function handles events where a pun button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var punsGifs = $("#gif-input").val().trim();
        // Adding movie from the textbox to our array
        puns.push(punsGifs);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".pun-btn", displayPuns);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    // need to add still/animate click. 
    //need to make input make a button 


});