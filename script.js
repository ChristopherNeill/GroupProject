$(".document").ready(); {
    //alert("HELLO");
    console.log("Hello"); 

var apiKey = "f186a14b09112b273bdded14d4bbc874"
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874"; 

}

$("button").on("click", function() {

$.ajax({
  url: movieURL,
  method: "GET"

}).then(function (response) {

  $("#title2").html("Title: " + response.results[0].title);
  console.log("Movie Title");
  $("#poster2").append("<img src= https://image.tmdb.org/t/p/w200" + response.results[0].poster_path + ">");
  console.log("https://image.tmdb.org/t/p/w200" + response.results[0].poster_path);
  console.log("Movie Poster");
  $("#plot2").html("Synopsis: " + response.results[0].overview);
  console.log("Overview"); 
  $("#title3").html("Title: " + response.results[3].title);
  $("#poster3").append("<img src= https://image.tmdb.org/t/p/w200" + response.results[3].poster_path + ">");
  $("#plot3").html("Synposis: " + response.results[3].overview); 

  
  
    
  


  

  
})

}) 
