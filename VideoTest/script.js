navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var userName, dataURL, context, canvas;


// Check that the browser supports getUserMedia.
// If it doesn't show an alert, otherwise continue.
if (navigator.getUserMedia) {
//code will go here
    navigator.getUserMedia(
        {
         video: true
        },
        //successCallback
        function (localMediaStream) {
	         var video = document.querySelector('video');
	         video.src = window.URL.createObjectURL(localMediaStream);
	         //more code will be here
      	},

        // Error Callback
        function (err) {
            // Log the error to the console.
            console.log('The following error occurred when trying to use getUserMedia: ' + err);
        }
    );

}
else {
    alert('Sorry, your browser does not support getUserMedia');
}

function paintCanvas(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.getElementById("capture-button").addEventListener("click", function ()     {
        context.drawImage(video, 20, 20, 600, 450, 0, 0, 200, 200);
    });
}