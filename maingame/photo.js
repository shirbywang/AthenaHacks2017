navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var video;
var webcamStream;
var canvas, ctx;

function startWebcam() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia(

            // constraints
            {
                video: true,
                audio: false
            },

            // successCallback
            function (localMediaStream) {
                video = document.querySelector('video');
                video.src = window.URL.createObjectURL(localMediaStream);
                webcamStream = localMediaStream;
            },

            // errorCallback
            function (err) {
                alert("Camera not approved/other error reached. Please allow camera access to play if you selected block");
                init();
            }
        );
    } else {
        alert("Sorry not compatible with your browser");
    }
}

function init() {
    startWebcam();
    setTimeout(function () {
        alert("YO");
        getImages();
    }, 5000);

}

function getImages() {

    for (i = 0; i < 50; i++) {
        console.log(i);

        setTimeout(function () {
            canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext('2d');
            snapshot();
        }, 10000);
    }
}

function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    alert("NEW PHOTO");
}
window.onload = init();
