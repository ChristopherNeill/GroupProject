$( document ).ready(function() {
  console.log( "ready!" );
});
var movieKey = "f186a14b09112b273bdded14d4bbc874";
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874";


$("button").click(function () {

$.ajax({
  url: movieURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  $("#movie").removeClass("hide");
  $("#title1").text(response.results[1].title);
  $("#poster1").html("<img src=\"https://image.tmdb.org/t/p/w200/" + response.results[1].poster_path + "\">");

  //$("#poster1").html("<img src=\"http://image.tmdb.org/t/p/w200//6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg\">");
})

});

//$("#cityMain").html(response.name + " " + dateTime + "<img src=\"http://openweathermap.org/img/w/" + response.weather[0].icon + ".png\">");