var body = document.querySelector('body');
var input = document.querySelector('input');
var button = document.querySelector('button');	
var img = document.querySelector('img');
var back = document.querySelector('#back');
var next = document.querySelector('#forward');
var title = document.querySelector('h1');
var albumName = document.querySelector('h2');
var search = ''
var artistID = ''

	   	i = 0
		
		button.addEventListener('click', function(){
			search = input.value.replace(/\s/g, "+");	
			
			console.log(search);

			var url = "https://api.spotify.com/v1/search?q=" + search+"&type=artist";
			
			var xhr = new XMLHttpRequest();

		    xhr.open("GET", url);

		    xhr.addEventListener("load", function() {

		    	var parsed = JSON.parse(xhr.responseText);

		    	var show = parsed['artists']['items'][0]['images'][1]['url'];
		    	var name = parsed['artists']['items'][0]['name']

		    	artistID = parsed['artists']['items'][0]['id']

		    	console.log(parsed['artists']['items'][0]['name'])
		    	title.innerText = name;

		    	body.appendChild(title);
		    	img.src = show;

    		})

    		xhr.send()	
		})

		img.addEventListener('click', function(){

			console.log(artistID);
			var urlA = "https://api.spotify.com/v1/artists/" + artistID + "/albums"
			
			var xhr = new XMLHttpRequest();

		    xhr.open("GET", urlA);

		    xhr.addEventListener("load", function() {

		    	var parsed = JSON.parse(xhr.responseText);

		    	var albumtitle = parsed['items'][0]['name'];
		    	// console.log(albumName)
		    	var show = parsed['items'][0]['images'][1]['url'];

		    	// console.log(parsed['artists']['items'][0]['name']
		    	albumName.innerText = albumtitle;

		    	body.appendChild(albumName);

		    	img.src = show;

    		})

    		xhr.send()	
		})

// 		When you click on the image, submit another AJAX request to the Spotify API to search for albums of that artist. For example: https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums

// Note: The bit after artists is the id of that artist.

// When you get a response, replace the image of the artist with:

// The name of the first album
// The image from the first album