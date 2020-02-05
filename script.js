var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874";

var cinema = "Alamo Drafthouse";
var movieTitle;



function getMoviePoster (){
$.ajax({
  url: movieURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  $("#movie").removeClass("hide");
  $("#title1").text((response.results[1].title) + " Rating: " + (response.results[1].vote_average));
  $("#poster1").html("<img src=\"https://image.tmdb.org/t/p/w200/" + response.results[1].poster_path + "\">");
  $("#plot1").text(response.results[1].overview)
  movieTitle = response.results[1].title;
})
};
 
  getMoviePoster();

function getShowTime() {
  console.log("click");
  $(".showTimeButton").html("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\">" + movieTitle + "</a>");
}