const baseUrl = "https://www.omdbapi.com/?apikey=e524d217";
const searchMovies = (event) => {
  let inputValue = event.target.value;

  var settings = {
    url: `${baseUrl}&s=${inputValue}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    // $('#text').val();
    $("#results-container").html("");
    if (response.Response === "True") {
      response.Search.forEach((element) => {
        $("#results-container")
          .append(`<a  href="movie-detail.html?movieId=${element.imdbID}"  class="list-group-item list-group-item-action " aria-current="true">
           <div class="d-flex w-100 justify-content-between">
               <h5 class="mb-1">${element.Title}</h5>
               <small>${element.Year}</small>
           </div>
           <p class="mb-1">${element.Type}</p>

       </a>`);
      });
    }
    else{

        $("#results-container")
        .append(`<a href="#" class="list-group-item list-group-item-action" aria-current="true">
         <div class="d-flex w-100 justify-content-center">
         <p class="mb-1 ">${response.Error}</p>   
         </div>

     </a>`);

    }
  });
};

// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  $("#searchInput").on("input", (event) => {
    if (event.target.value.length <= 2) {
      return;
    }
    searchMovies(event);
  });
});
