//sample AJAX request url
//https://api.giphy.com/v1/gifs/search?api_key=MPSSfVkzoXCE4jvCDJ7UJutlRqMKk8yt&q=searchTerm&limit=numberOfResults&offset=0&rating=G&lang=en
$(document.body).ready(function() {
    var animals = [ "octopus",
                    "manta ray",
                    "tiger shark",
                    "clown fish",
                    "lion fish",
                    "goliath grouper"];

    var numberOfResults = 5;

    var $buttonDiv = $("#button-div");
    var $gifDiv = $("#gif-div");

    var generateButtons = function() {
        $buttonDiv.empty();
        for (var i = 0; i < animals.length; i++) {
            $("<button type='button'>")
                .appendTo($buttonDiv)
                .text(animals[i]);
        }
    };

    var generateSearchURL = function(searchTerm) {
        return "https://api.giphy.com/v1/gifs/search?api_key=MPSSfVkzoXCE4jvCDJ7UJutlRqMKk8yt&q=" + searchTerm + "&limit=" + numberOfResults + "&lang=en";
    };

    var generateGifs = function(searchTerm) {
        $.get(generateSearchURL(searchTerm), function(data, status) {
            if(status != "success") {
                return;
            }
            $gifDiv.empty();
            for (var i = 0; i < data.data.length; i++) {
                var newGif = $("<div>")
                .addClass("col-xs-12 col-sm-6 col-md-4 pull-left")
                .append( $("<h4>")
                    .text("Rating: " + data.data[i].rating)
                )
                .append( $("<img class='col-xs-12 gif'>")
                    .attr("src", data.data[i].images.original_still.url)
                    .attr("src-inactive", data.data[i].images.original_still.url)
                    .attr("src-active", data.data[i].images.original.url)
                    .attr("is-active", "false")
                )
                .appendTo($gifDiv);
            }
        });
    };

    $("form").submit(function(){
        event.preventDefault();
        if(!!$("#animal").val()) {
            animals.push($("#animal").val());
            $("#animal").val("");
            generateButtons();
        }
    });

    $buttonDiv.delegate("button", "click", function(){
        generateGifs($(this).text());
    });

    $gifDiv.delegate(".gif", "click", function(){
        if($(this).attr("is-active") === "false") {
            $(this).attr("is-active", "true");
            $(this).attr("src", $(this).attr("src-active"));
        }
        else {
            $(this).attr("is-active", "false");
            $(this).attr("src", $(this).attr("src-inactive"));
        }
    });

    generateButtons();
});