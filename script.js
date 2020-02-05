$(".document").ready(); {
    //alert("HELLO");
    console.log("Hello"); 

var apiKey = "f186a14b09112b273bdded14d4bbc874"
var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f186a14b09112b273bdded14d4bbc874"; 
var movietimesURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2020-02-07&zip=78701&api_key=7cyx4bm5w9yfvdm6mwuyc5ce";

}

$("button").on("click", function() {

$.ajax({
  url: movieURL,
  method: "GET"

}).then(function (response) {

  $("#title2").html("Title: " + response.results[0].title);
  var cinema = "Alamo Drafthouse";
  var movieTitle = response.results[0].title;
  var element = $("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\"></a>");
  element.html("<img src= https://image.tmdb.org/t/p/w200" + response.results[0].poster_path + ">")
  $("#poster2").append(element);
  $("#plot2").html("Synopsis: " + response.results[0].overview);
  console.log("Overview"); 

  
  
  $("#title3").html("Title: " + response.results[1].title);
  var cinema = "Alamo Drafthouse"; 
  var movieTitle = response.results[1].title;
  var element = $("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\"></a>");
  element.html("<img src= https://image.tmdb.org/t/p/w200" + response.results[1].poster_path + ">");
  $("#poster3").append(element);
  $("#plot3").html("Synposis: " + response.results[1].overview); 



  $("#title4").html("Title: " + response.results[4].title);
  var cinema = "Alamo Drafthouse";
  var movieTitle = response.results[4].title;
  var element = $("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\"></a>");
  element.html("<img src= https://image.tmdb.org/t/p/w200" + response.results[4].poster_path + ">");
  $("#poster4").append(element);
  $("#plot4").html("Synposis: " + response.results[4].overview); 


  $("#title5").html("Title: " + response.results[2].title);
  var cinema = "Alamo Drafthouse";
  var movieTitle = response.results[2].title;
  var element = $("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\"></a>");
  element.html("<img src= https://image.tmdb.org/t/p/w200" + response.results[2].poster_path + ">");
  $("#poster5").append(element);
  $("#plot5").html("Synposis: " + response.results[2].overview); 



  $("#title6").html("Title: " + response.results[6].title);
  var cinema = "Alamo Drafthouse";
  var movieTitle = response.results[6].title;
  var element = $("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\"></a>");
  element.html("<img src= https://image.tmdb.org/t/p/w200" + response.results[6].poster_path + ">");
  $("#poster6").append(element);
  $("#plot6").html("Synposis: " + response.results[6].overview); 

})

}) 

/* $("button").on("click", function() {

 $.ajax({
  url: movietimesURL,
  method: "GET",

}).then(function (response) {


$("#showtime1").html("<a href=\https://www.fandango.com/1917-2019-219742/movie-times>"); 




}) 
 */ 

function getShowTime() {
  console.log("click");
  $("#showtime1").html("<a href=\"https://www.google.com/search?q=" + movieTitle + " " + cinema + "\" target=\"_blank\">" + movieTitle + "</a>");
