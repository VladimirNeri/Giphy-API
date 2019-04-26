var famousPeople = ["Donald Trump", "Vladimir Putin", "Kim Jong Un", "Dennis Rodman", "Stormy Daniels"];

// Source:  Activity 09
function renderButtons() {
    
    $("#buttons-view").empty();

    for (var i = 0; i < famousPeople.length; i++) {

        var a = $("<button>");
        a.addClass("inputfamousPeople");
        a.attr("data-name", famousPeople[i]);
        a.text(famousPeople[i]);
        $("#buttons-view").append(a);
    }
}

// Event Handler Source: Activity 11
$("#searchImage").on("click", function(event) {
    event.preventDefault();
    var inputfamousPeople = $("#searchInput").val().trim();
    if (inputfamousPeople.length > 0) {
        famousPeople.push(inputfamousPeople);
    }
    renderButtons();
});

$("#resetSearch").on("click", function(event) {
    reset();
});

// Activities 11-15
renderButtons();

$("#buttons-view").on("click", "button",function() {
    var person = $(this).attr("data-name");
    var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "api_key=c0KM4Cps1B2bhjIlqg5kl8tT1EVEWKyg";
    var searchTerm = $(this).text();;
    var limit = 10;

    var queryURL = baseURL + searchTerm + "&" + "limit="+ limit + "&" + apiKey;

    $("#contentArea").empty();

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var imageDiv = $("<div class='item'>");
                var rating = results[i].rating;

                var p = $("<p class='rating'>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");

                imageDiv.prepend(p);
                imageDiv.prepend(personImage);

                $("#contentArea").prepend(imageDiv);
                 // Activity 15
                 $(".gif").on("click", function() {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
            }
        });
});
