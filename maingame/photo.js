navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var video;
var webcamStream;
var canvas;

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

    for (var i = 0; i < 1; i++) {
        setTimeout(function () {
            canvas = document.getElementById("myCanvas");
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            var uri = canvas.toDataURL('image/png')
            var res = encodeURI(uri);
            console.log(res);
        }, 10000);
    }

}

function snapshot() {
    // Draws current image from the video element into the canvas
    //    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //    callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    //    callback(ctx.toDataURL('image/png'));
    //    console.log(ctx.toDataURL('image/png'));

    alert("NEW PHOTO");
}
window.onload = init();
