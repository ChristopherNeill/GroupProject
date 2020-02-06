/*const APIKEY = "f9849342e7c41936868fe3b62aa7794b";
var lat;
var lon;
restaurantList = [];
var main = document.querySelector("main");
getFood();
function getFood(){
    getCityID();
    main.innerHTML = "";
    var fURL = "https://developers.zomato.com/api/v2.1/search?count=10&lat=" + lat + "&lon=" + lon+ "&radius=10000" + "&apikey=" + APIKEY;
    $.ajax({
        url: fURL,
        method: "GET"
    }).then((response) =>{
        console.log(response.restaurants);
        //restaurantList = response.restaurants[i];
        response.restaurants.forEach(function(index, element){
            var div = document.createElement("div");
            var resTitle = document.createElement("h1");
            resTitle.textContent = response.restaurants[index].restaurant.name
            console.log(resTitle);
        })
        div.append(resTitle);
        main.append(div);
    })
}
function getCityID(){
    var city = ($("cityInput").val());
    var CIDURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&apikey=" + APIKEY;
    $.ajax({
        url: CIDURL,
        method: "GET"
    }).then((response) =>{
        lat = response.latitude;
        lon = response.longitude
    })
}*/

var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874";
var currentDate = moment().format("YYYY-MM-DD");
var movieTitleList = [];
var cinema = "Alamo Drafthouse";

//$(document).ready(function () {

function getMoviePoster() {
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (response) {
    var movieList = response.results;
    console.log(movieList);
    $("#movie").removeClass("hide");

    for (var i = 0; i < 3; i++) {
      $("#title" + i).text(movieList[i].title);
      movieTitleList.push(movieList[i].title);
      $("#rating" + i).text("Rating: " + movieList[i].vote_average);

      $("#poster" + i).attr("src", "https://image.tmdb.org/t/p/original" + movieList[i].poster_path);
      //$("#poster1").html("<img src=\"https://image.tmdb.org/t/p/w200/" + response.results[1].poster_path + "\">");
      $("#plot" + i).text(movieList[i].overview)
    }

  })
};

function getShowTime() {
  var zipCode = $("#grid-city").val();
  if (zipCode.length < 5) {
    return;
  }

  var movieTimesURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + currentDate + "&zip=" + zipCode + "&api_key=7cyx4bm5w9yfvdm6mwuyc5ce";

  $.ajax({
    url: movieTimesURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (var movieIndex = 0; movieIndex < movieTitleList.length; movieIndex++){
      $("#theaters" + movieIndex).empty();
      $("#theaters" + movieIndex).append("<div>Not showing near you</div>");
      
      for (var i = 0; i < response.length; i++) {
        var movie = response[i];
        if (movie.title === movieTitleList[movieIndex]) {
          var theaterList = [];
          for (var j = 0; j < movie.showtimes.length; j++) {
            var theaterName = movie.showtimes[j].theatre.name;
            if ($.inArray(theaterName, theaterList) === -1 && theaterList.length < 3) {
              theaterList.push(theaterName);
            }
          }

          $("#theaters" + movieIndex).empty();
          $(theaterList).each(function (index, element) {
            $("#theaters" + movieIndex).append("<div><a href='#' onclick='call_LocationAPI(\"" + element + "\")'>" + element + "</a></div>");
          });
        }
      }
    }
  });
}

function getRestaurantsByTheater(theaterName){
  console.log("Load restaurants here, near theater: " + theaterName);
}


    $('#submit-query').click(function () {


        /*These lines of code will refresh UI when user inputs a new city when the result of previous city is already displayed */
        $('#cuisines').empty();
        $('#cuisine_box').css('visibility', 'hidden');
        $('#restaurant_container').empty();
        /*End*/

        /*fetch user input from the input box and call function*/
        var locationInput = theaterName;
        console.log(locationInput);
        call_LocationAPI(locationInput);
        
    })

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
            '<div class="w-full mx-auto rounded overflow-hidden shadow-lg">'+
                '<div class="w-full mx-auto font-bold text-xl mb-2">'+
                restaurants[i].restaurant.name +
           ' </div> <p class="w-full text-gray-700 text-base">'+
               ' Cost for two :' + restaurants[i].restaurant.average_cost_for_two+'<br>'+
            'Cuisine: '+ restaurants[i].restaurant.cuisines+ '<br> </p> </div>'
            )

        }
    }



//})

getMoviePoster();