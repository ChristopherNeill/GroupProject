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
  $(".showTimeButton").html("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\">" + movieTitle + "</a>");
}