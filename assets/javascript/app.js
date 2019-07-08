
var movies = ["Jaws", "Braveheart", "Goodfellas", "Pulp Fiction", "Half Baked", "Star Wars Episode IV", "The Godfather", "The Bourne Identity"];
var userMovies = [];

// Generate buttons for main array
for (i = 0; i < movies.length; i++) {  
  var getPoster = function() {
    var queryURL = "https://www.omdbapi.com/?t=" + movies[i] + "&apikey=trilogy";
    var movietitle = movies[i];
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#buttons").append("<img class='miniPoster' src='" + response.Poster + "'" +  "class='btn btn-dark gifButton' data='" + movietitle + "'" + ">"    + "</button>");
        // console.log(response.Poster);
      })
  }

  
getPoster();
}

$("#buttonAdd").on("click", function () {
  event.preventDefault();
  var buttonData = $("#userText").val();
  userMovies.push(buttonData);
  // console.log(userMovies);
  for (i = 0; i < userMovies.length; i++) {  
    var getUserPoster = function() {
    
      var queryURL = "https://www.omdbapi.com/?t=" + userMovies[i]  + "&apikey=trilogy";
      var movietitle2 = userMovies[i];
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#buttons").append("<img class='miniPoster temp-posters' src='" + response.Poster + "'" +  "class='btn btn-dark gifButton' data='" + movietitle2 + "'" + ">"    + "</button>");
        })}
        $("#temp").detach();
        $(".temp-posters").detach();
        getUserPoster();
    }
})

$(document.body).on("click", ".miniPoster", function () {
  var movie = $(this).attr("data");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='gifContainer'>");
          var gifTitle = results[i].title;
          var rating = results[i].rating;
          // console.log(gifTitle);
          var t = $("<p>").text("Title: " + gifTitle);
          var p = $("<p>").text("Rating: " + rating );

          var movieImage = $("<img>");
          movieImage.attr("src", results[i].images.fixed_height_still.url);
          movieImage.attr("data", movie)
          movieImage.attr("data-still", results[i].images.fixed_height_still.url);
          movieImage.attr("data-animate", results[i].images.fixed_height.url);
          movieImage.attr("data-state", "still");
          movieImage.addClass("movieImage");
          gifDiv.append(t);
          gifDiv.append(p);
          gifDiv.append(movieImage);
          $("#movie-gifs").prepend(gifDiv);
          // console.log(response);
        }
      }
    });
});

// Stops and starts gif animation
$(document.body).on("click", ".movieImage", function () {
  var state = $(this).attr("data-state");
  var movieSearch = $(this).attr("data");
  // console.log(movieSearch);

  if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }

});


// $(document.body).on("click", "#poster", function () {
    

// })
// // var movie = $(this).attr("data");
// var movie = "Training Day";
        
        
        

      