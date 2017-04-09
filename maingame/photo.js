navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var video;
var webcamStream;

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
}
window.onload = init();
