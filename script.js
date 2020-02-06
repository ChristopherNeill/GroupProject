var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874";
var currentDate = moment().format("YYYY-MM-DD");
var movieTitleList = [];
var cinema = "Alamo Drafthouse";

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
            $("#theaters" + movieIndex).append("<div><a href='#' onclick='getRestaurantsByTheater(\"" + element + "\")'>" + element + "</a></div>");
          });
        }
      }
    }
  });
}

function getRestaurantsByTheater(theaterName){
  console.log("Load restaurants here, near theater: " + theaterName);
}

getMoviePoster();