$( document ).ready(function() {
  console.log( "ready!" );
});
var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + movieKey + "&language=en-US&page=1&region=USA";

$.ajax({
  url: movieURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  
});