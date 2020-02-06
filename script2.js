$(document).ready(function () {
    $('#submit-query').click(function () {


        /*These lines of code will refresh UI when user inputs a new city when the result of previous city is already displayed */
        $('#cuisines').empty();
        $('#cuisine_box').css('visibility', 'hidden');
        $('#restaurant_container').empty();
        /*End*/

        /*fetch user input from the input box and call function*/
        var locationInput = document.getElementById('loc').value;
        console.log(locationInput);
        call_LocationAPI(locationInput);
        
    })


$(".dropMenu").on("click", function(){console.log("your IN FUNCITON $$$$$")

    var locationInput=($(this).attr("value"))
    call_LocationAPI(locationInput);
   var cinema=locationInput;
    getMoviePoster(cinema)
})
   var test= $(".dropMenu option:selected").text();
   console.log("-----TEST BELOW")
   console.log(test)

/*Functions*/

    /*this function calls the /location API endpoint that returns an entity ID and entity type to any area/city that user inputs*/
    function call_LocationAPI(location){
        $.ajax({
                headers: {
                    "user-key": "d89257d7282c197616a3999af66e44ab",
                    "Accept": "application/json"
                },
            url: "https://developers.zomato.com/api/v2.1/locations?query="+location,
            success: function (result) {
                console.log(result);
                var entity_id = result.location_suggestions[0].entity_id;
                console.log(entity_id);

                var entity_type = result.location_suggestions[0].entity_type;
                console.log(entity_type);

                getLocationDetails(entity_id, entity_type);

            }
            }
        )
    }

    /*this function calls /location_details API endpoint where you request the endpoint with your entity ID and type
    * and API responds with top rated restaurants, top cuisines and other information*/

    function getLocationDetails(entity_id, entity_type){
        $.ajax(
            {
                headers:{
                    "user-key": "d89257d7282c197616a3999af66e44ab",
                    "Accept": "application/json"
                },
                url: "https://developers.zomato.com/api/v2.1/location_details?entity_id="+entity_id+"&entity_type="+entity_type,
                success: function (result) {
                    //just sending the entire result to displayData function
                    displayData(result);
                }
            }
        )
    }


    /*this function does the work of showing the data in UI*/
    function displayData(result){
        console.log(result);
        var cuisines = result.top_cuisines;
        var cuisine_length = cuisines.length;

        /*Fetching cuisines*/

        $('#cuisine_box').css('visibility', 'visible'); //making cuisine_box visible
        for(var i=0; i<cuisine_length; i++){
            console.log(cuisines[i]);
            $('#cuisines').append(cuisines[i]+"<br>"); //appending each cuisines[i] at the end of the previous
        }

        /*Fetching restaurants*/

        var restaurants = result.best_rated_restaurant;
        var rest_length = restaurants.length;

        for(var i=0; i<rest_length; i++){
            console.log(restaurants[i].restaurant.name);
            /*Creating the restaurant card UI dynamically for each restaurant*/
            $('#restaurant_container').append(
            '<div class="max-w-sm rounded overflow-hidden shadow-lg">'+
                '<div class="font-bold text-xl mb-2">'+
                restaurants[i].restaurant.name +
           ' </div> <p class="text-gray-700 text-base">'+
               ' Cost for two :' + restaurants[i].restaurant.average_cost_for_two+'<br>'+
            'Cuisine: '+ restaurants[i].restaurant.cuisines+ '<br> </p> </div>'
            )

        }
    }



})





function getMoviePoster (location){
    console.log("------------------")
    console.log(location)
    console.log("------------------")
    var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874";

var cinema = "Alamo Drafthouse";
var movieTitle;

$.ajax({
  url: movieURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  $("#movie").removeClass("hide");

  for (var i = 0; i < 3; i++){
    $("#title" + i).text(response.results[i].title);
    $("#rating" + i).text("Rating: " + response.results[i].vote_average);

    $("#poster" + i).attr("src" , "https://image.tmdb.org/t/p/original" + response.results[i].poster_path);
    //$("#poster1").html("<img src=\"https://image.tmdb.org/t/p/w200/" + response.results[1].poster_path + "\">");
    $("#plot" + i).text(response.results[i].overview)
    movieTitle = response.results[i].title;
  }
  
})
};
 
  getMoviePoster();
function getShowTime() {
  console.log("click");
  $(".showTimeButton").html("<a href=\"https://www.google.com/search?q=" + movieTitle + " " +cinema+ "\" target=\"_blank\">" + movieTitle + "</a>");
}