
//1. Retrieve all the required API arguments from the HTML page created. For example, number of images to load from the dropdown.
//2. Build the search API url based on the arguments retrieved in the previous step. You can use API explorer to do this.
function makeApiCall(){

    console.log("In makeApiCall");

    var numImages = document.getElementById("numPhotos").value;
    console.log(numImages);
    var photo_title = document.getElementById("photo_title").value;
    console.log(photo_title);

    $(document).ready(function() {
        var url ='https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=745e4a48095e73b3a43db56da8c08e44&tags='+photo_title+ '&privacy_filter=privacy_filter&safe_search=safe_search&extras=extras&per_page='+numImages+'&format=json&nojsoncallback=1&extras=url_o%2C+owner_name'; //Place your Flickr API Call Here
        $.ajax({url:url, dataType:"json"}).then(function(data) {
            console.log(data);//Review all of the data returned
            console.log(data.photos);
            //console.log("Image title: " , data.current.title);//View Image title

            //loop through photo array
            var i = 0;
            while(i < data.photos["photo"].length; )
            {
                console.log("Hello");
                var len = photo_url = data.photos["photo"][i]["url_o"];
                
                i++;
            }
            console.log("This is the length", len);
            


        })
      })
}
