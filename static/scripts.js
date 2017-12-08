
// called for global movie search
function title_search() {
    // OMBD api gives JSON of movie info based on title that is input
    var url = 'http://www.omdbapi.com/?tomatoes=true&apikey=1a495556&t=' + $('#title').val();
    // clear search bar after it is submitted
    $('#title').val('');
    // get JSON from url, store values in variables called data
    $.getJSON(url, function(data) {
        // make api returns valid movie info
        if (data.Response != "True") {
            alert("Movie not found");
            throw new Error("Movie not found");
        }
        // make sure JSON is movie info and not another media type
        if (data.Type != "movie") {
            alert("Not a valid movie");
            throw new Error("Not a valid movie");
        }
        // display certain data from JSON in organized way
        $( "<div class='" + "movie" + "'>" +
                "<h3>" + data.Title + "</h3>" +
                "<img src='"+ data.Poster + "' alt='" + "Unavailable poster" + "' style='" + "width:162px;height:240px;" + "'>" +
                "<p>" + data.Year + "</p>" +
                "<p>" + "Rated: " + data.Rated + "</p>" +
                "<p>" + data.Genre + "</p>" +
                "<p>" + "Directed by: " + data.Director + "</p>" +
                "<p>" + "Starring: " + data.Actors + "</p>" +
                "<p>" + data.Plot + "</p>" +
                "<p>" + data.Awards + "</p>" +
                "<p>" + "imdb Rating: "+ data.imdbRating + "</p>" +
                "<p>" + "TomatoMeter: "+ data.tomatoMeter + "%" + "</p>" +
            "</div>"
            ).appendTo( "body" );
    });
}
            
// adapted from: http://stackoverflow.com/questions/26630650/detect-404-error-on-page-load
// checks if server returns error 404 or 400 (Netflix roulette api does if search is invalid)
// called in all Netflix searches
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    // alert user if server returns error 404 or 400
    if (http.status === 404 || http.status === 400) {
        alert("Invalid Netflix Movie Search");
    }
}
            
// called for Netflix movie search
function nflx_title_search() {
    // Netflix roulette api gives JSON of movie info based on title that is input
    var url = 'http://netflixroulette.net/api/api.php?title=' + $('#nflx_title').val();
    // make sure that url exists (doesn't return 404 or 400 error)
    UrlExists(url);
    // erase title after it is submitted
    $('#nflx_title').val('');
    // get JSON from Netflix roulette api
    $.getJSON(url, function(data) {
        // make sure search is for movie
        if (data.mediatype == 0) {
            // if seach is for movie, input title into OMDB api
            var url = 'http://www.omdbapi.com/?tomatoes=true&t=' + data.show_title;
            // get JSON from OMDB api
            $.getJSON(url, function(items) {
                // display certain data from JSON in organized way
                $( "<div class='" + "movie" + "'>" +
                        "<h3>" + items.Title + "</h3>" +
                        "<img src='"+ items.Poster + "' alt='" + "Unavailable poster" + "' style='" + "width:162px;height:240px;" + "'>" +
                        "<p>" + items.Year + "</p>" +
                        "<p>" + "Rated: " + items.Rated + "</p>" +
                        "<p>" + items.Genre + "</p>" +
                        "<p>" + "Directed by: " + items.Director + "</p>" +
                        "<p>" + "Starring: " + items.Actors + "</p>" +
                        "<p>" + items.Plot + "</p>" +
                        "<p>" + items.Awards + "</p>" +
                        "<p>" + "imdb Rating: "+ items.imdbRating + "</p>" +
                        "<p>" + "TomatoMeter: "+ items.tomatoMeter + "%" + "</p>" +
                    "</div>"
                ).appendTo( "body" );
            });    
        }   
    });  
}

// called for Netlfix actor search            
function nflx_actor_search() {
    // input actor into Netflix roulette api
    var url = 'http://netflixroulette.net/api/api.php?actor=' + $('#nflx_actor').val();
    // make sure that url exists (doesn't return 404 or 400 error) 
    UrlExists(url);
    // erase actor after search is submitted
    $('#nflx_actor').val('');
    // uses OMDB api to display data of movies with the search actor on Netflix
    get_data(url);
}
  
// called for Netflix director search          
function nflx_director_search() {
    // input director into Netflix roulette api
    var url = 'http://netflixroulette.net/api/api.php?director=' + $('#nflx_director').val();
    // make sure that url exists (doesn't return 404 or 400 error)
    UrlExists(url);
    // erase actor after search is submitted
    $('#nflx_director').val('');
    // uses OMDB api to display data of movies with the search actor on Netflix
    get_data(url);
}

// called in both nflx director and actor searches
function get_data(url) {
    // gets data from Netflix roulette api
    $.getJSON(url, function(data) {
        // iterates through each JSON
        for (var i = 0, size = data.length; i < size ; i++) {
            // checks if JSON is from a movie
            if (data[i].mediatype == 0) {
                // if JSON is from a movie, title is input into OMDB api
                var url = 'http://www.omdbapi.com/?tomatoes=true&t=' + data[i].show_title;
                // get data from each OMDB JSON
                $.getJSON(url, function(items) {
                    // if movie exists on OMDB
                    if (items.Response == "True") {
                        // display certain data from JSON in organized way
                        $( "<div class='" + "movie" + "' id='" + "movie" + "'>" +
                            "<h3>" + items.Title + "</h3>" +
                            "<img src='"+ items.Poster + "' alt='" + "Unavailable poster" + "' style='" + "width:162px;height:240px;" + "'>" +
                            "<p class='" + "year" + "'>" + items.Year + "</p>" +
                            "<p>" + "Rated: " + items.Rated + "</p>" +
                            "<p>" + items.Genre + "</p>" +
                            "<p>" + "Directed by: " + items.Director + "</p>" +
                            "<p>" + "Starring: " + items.Actors + "</p>" +
                            "<p>" + items.Plot + "</p>" +
                            "<p>" + items.Awards + "</p>" +
                            "<p style='" + "display: inline-block" + "'>" + "imdb Rating: " + "<div class='" + "i_rating" + "' style='" + "display: inline-block" + "'>"  + items.imdbRating + "</div>" + "</p>" +
                            "<p style='" + "display: inline-block" + "'>" + "TomatoMeter: "+ "<div class='" + "t_rating" + "' style='" + "display: inline-block" +"'>" + items.tomatoMeter + "</div>" + "%" + "</p>" +
                        "</div>"
                        ).appendTo( "body" );
                    }
                });    
            }   
        }
    });
}

// called on each button click to clear previous movies on page            
function clr() {
    // http://www.w3schools.com/jquery/jquery_dom_remove.asp
    // removes all items of class movie
    $(".movie").remove();
}

// called on each sort (removes and replaces movies on page in sorted order)
function display_sorted(rating_type) {
    // create an array for sorted variables and unsorted variables
    var sorted = [];
    var unsorted = [];
    // iterate through all items of specific rating type
    $(rating_type).each(function( index ) {
            // make score variable a number
            var score = ($( this ).text() / 1)
            // if score is N/A make it -1 (below zero)
            if (isNaN(score) === true) {
                score = -1;
            }
            // put each score into both arrays
            sorted.push(score);
            unsorted.push(score)
    });
    // sort the array that supposed to be sorted
    sort(sorted);
                
    // create a variable for movies
    var movies = [];
    // iterate through each movie and get the data
    $('.movie').html( function( index1, data ) {
        // remove each movie from the page
        $("#movie").remove();
        // store the data from each movie
        movies.push(data);
    });
    
    // iterate through ratings to make and take out repeats (so movies aren't displayed more than once)            
    for (var k = 0; k < unsorted.length - 1; k++) {
        // if scores are the same, remove all but one
        if (sorted[k] == sorted[k + 1]) {
            // splicing removes the repeat scores, a number must be inserted to keep indexes the same
                // (if this is not done, 3+ of the same ratings will cause movies to be displayed multiple times)
            sorted.splice(k, 1, k)
        }
    }
    
    // display the movies in the sorted order
    // iterate through each rating in the sorted list
    for (var i = 0; i < unsorted.length; i++) {
        // iterate through each rating in the unsorted list
        for (var j = 0; j < unsorted.length; j++) {
            // when the ratings match, display the movie that matches the index of the unsorted rating
            if (sorted[i] == unsorted[j]) {
                $("<div class='" + "movie" + "' id='" + "movie" + "'>"  + movies[j] + "</div>").appendTo( "body" );
            }
        }
    }
}

// sort by TomatoMeter
function tomato_sort() {
    // input class of ratings to sort by
    display_sorted('.t_rating');
}

// sort by IMDB rating            
function imdb_sort() {
    // input class of ratings to sort by
    display_sorted('.i_rating');
}

// sort by year            
function year_sort() {
    // input class of numbers to sort by
    display_sorted('.year');
}

// called in all sorts
function sort(ratings) {
    var n = ratings.length;
    // implementation of bubble sort
                
    // iterate through ratings in array until all ratings are sorted
    for (var j = 0; j < n; j++) {
        // iterate through list and swap ratings, but do not finish sort in first iteration
        for (var i = 0; i < (n - 1); i++) {
            // check if value on right is larger than value on left
            if (ratings[i] < ratings[i + 1]) {
                // if left value is larger, then swap the left and right ratings
                var temp = ratings[i];
                ratings[i] = ratings[i + 1];
                ratings[i + 1] = temp;
            }
        }
    }
}

// google analytics code
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-99097267-1', 'auto');
  ga('send', 'pageview');


