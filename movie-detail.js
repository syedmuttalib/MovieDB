var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    me;

  for (me = 0; me < sURLVariables.length; me++) {
    sParameterName = sURLVariables[me].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};


// loader function
$('#loader').append(
    `<div class="d-flex justify-content-center mt-7">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>`
)

const baseUrl = "https://www.omdbapi.com/?apikey=e524d217";
$(document).ready(function () {
  console.log("ready!");
  let movieId = getUrlParameter("movieId");

  var settings = {
    url: `${baseUrl}&i=${movieId}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response.Response === "True") {
      $("#cardSection").append(
`</div>
</div>
<div class="row">
<div class="col-12">
    <div class="card">
        <div class="card-header">
            <h1 class="card-title text-center">${response.Title}</h1>
        </div>
        <div class="card-body">

            <div class="row">
                <div class=" col-md-12 col-lg-6">
                    <img onError="this.src='images.png'" class="card-img-top img-fluid" src="${response.Poster}" alt="">
                </div>
                <div class="col">
                    <p><strong>Describtion:</strong>${response.Plot}</p>
                    <p><strong>Type:</strong>${response.Type}</p>
                    <p><strong>Language:</strong>${response.Language}</p>
                    <p><strong>Year:</strong>${response.Year}</p>
                    <p><strong>Release Date:</strong>${response.Released}</p>
                    <p><strong>Actors:</strong>${response.Actors}</p>
                    <p><strong>Awards :</strong>${response.Awards}</p>
                    <p><strong>Country :</strong>${response.Country}</p>
                    <p><strong>Director :</strong>${response.Director}</p>
                    <p><strong>Writer :</strong>${response.Writer}</p>
                    <p><strong>Rated :</strong>${response.Rated}</p>
                    <p><strong>Metascore :</strong>${response.Metascore}</p>
                    <p><strong>imdbRating :</strong>${response.imdbRating}</p>
                    <p><strong>imdbVotes :</strong>${response.imdbVotes}</p>
                    <p><strong>Production :</strong>${response.Production}</p>
                    <p><strong>BoxOffice :</strong>${response.BoxOffice}</p>
                    <p><strong>Ratings :</strong>${renderRatings(response.Ratings) }</p>
                    <p><strong></strong>${website(response.Website) }</p>
                    
                                       
                </div>
            </div>

        </div>
    </div>
</div>
</div>`
//improvise        
//         `<div class="card">
// <div class="card-header">
//     <h1 class="card-title text-center">${response.Title}</h1>
// </div>
// <div class="card-body">
//     <div class="container text-center">
//         <div class="row">
//             <div class="col">
//                 <img class="card-img-top sm img-fluid" src="${response.Poster}" alt="">
//             </div>
//             <div class="col">
//                 <p><strong>Describtion:</strong>${response.Plot}</p>
//                 <p><strong>Type:</strong>${response.Type}</p>
//                 <p><strong>Language:</strong>${response.Language}</p>
//                 <p><strong>Year:</strong>${response.Year}</p>
//                 <p><strong>Release Date:</strong>${response.Released}</p>
//             </div>
//         </div>
//     </div>
// </div>
// </div>`

        //better
        //    `<div class="card w-65 mt-5 mb-3">
        //    <div class="card-body text-center">
        //    <h2 class="card-title">${response.Title}</h2>
        //    <hr/>
        //    <div class="container text-center">
        //    <div class="row">
        //      <div class="col">
        //      <img class="card-img-top img-fluid" onError="this.src='images.png'" src="${response.Poster}" alt="">
        //      </div>
        //      <div class="col">
        //      <p class="card-text text-left"><strong>Description:</strong>${response.Plot}</p>
        //      <p class="card-text"><strong>Type:</strong> ${response.Type}</p>
        //      <p class="card-text"><strong>Language: </strong>${response.Language}</p>
        //      <p class="card-text"><strong>Year: </strong>${response.Year}</p>
        //      <p class="card-text"><strong>Released Date:</strong> ${response.Released}</p>
        //      <p class="card-text"><strong>Year:</strong> ${response.Year}</p>
        //    </div>
        //  </div>

        //    </div>
        //  </div>`
      );
      $('#loader').html("")
    }
  });
});









let renderRatings=(ratings)=>{
  if(ratings.length===0)
  {
    return `N/A`
  }

  let elems=[]
  ratings.forEach((elem)=>{
     elems.push(`<span><strong>${elem.Source } - </strong>${elem.Value }</span>`)
  })
  return elems

}

let website=(webCheck)=>{
    // console.log('Check web'+ webCheck)
  if(webCheck==="N/A")
   {
    return `<p cla><Strong>Website Not Avaliable!</Strong></p>`
   }

   let elems=[]
   webCheck.forEach((elem)=>{
      elems.push(`<span><strong>Website - </strong>${elem.Website }</span>`)
   })
   return elems


}