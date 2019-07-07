
  var cars = ["Aston Martin Vantage", "McLaren 570S", " Audi R8 V10", "Honda NSX", " Mercedes", " Nissan GT-R", " Maserati", " Range Rover"];

    // Genwrate buttons from array
    for( i = 0; i < cars.length; i++) {
        $("#buttons").append("<button class='btn btn-secondary gifButton' data='" + cars[i] + "'" + ">" + cars[i] + "</button>");
        }
    
    $("#buttonAdd").on("click", function() {
        event.preventDefault();
        var buttonData = $("#userText").val().trim();
        $("#buttons").append("<button class='btn btn-secondary gifButton' data='" + buttonData + "'" + ">" + buttonData + "</button>");
        console.log(buttonData);
    })

    $(document.body).on("click", ".gifButton", function() {
        var car = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
        })

    .then(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='gifContainer'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var carImage = $("<img>");
              carImage.attr("src", results[i].images.fixed_height_still.url);
              carImage.attr("data-still", results[i].images.fixed_height_still.url);
              carImage.attr("data-animate", results[i].images.fixed_height.url);
              carImage.attr("data-state", "still");
              carImage.addClass("carImage");
              console.log(carImage);




              gifDiv.append(p);
              gifDiv.append(carImage);
              $("#car-gifs").prepend(gifDiv);
              console.log(response);
            }
          }
        });
    });

    // Stops and starts gif animation
    $(document.body).on("click", ".carImage", function(){
      var state = $(this).attr("data-state");
      console.log(state);

      if( state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");

      }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

    })