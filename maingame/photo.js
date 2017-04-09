//navigator.getUserMedia = (navigator.getUserMedia ||
//    navigator.webkitGetUserMedia ||
//    navigator.mozGetUserMedia ||
//    navigator.msGetUserMedia);
//
//var video;
//var webcamStream;
//var canvas;
//
//function startWebcam() {
//    if (navigator.getUserMedia) {
//        navigator.getUserMedia(
//
//            // constraints
//            {
//                video: true,
//                audio: false
//            },
//
//            // successCallback
//            function (localMediaStream) {
//                video = document.querySelector('video');
//                video.src = window.URL.createObjectURL(localMediaStream);
//                webcamStream = localMediaStream;
//            },
//
//            // errorCallback
//            function (err) {
//                alert("Camera not approved/other error reached. Please allow camera access to play if you selected block");
//                init();
//            }
//        );
//    } else {
//        alert("Sorry not compatible with your browser");
//    }
//}
//
//function init() {
//    startWebcam();
//    setTimeout(function () {
//        alert("YO");
//        getImages();
//    }, 5000);
//
//}
//
//function getImages() {
//
//    for (var i = 0; i < 1; i++) {
//        setTimeout(function () {
//            canvas = document.getElementById("myCanvas");
//            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//            var dataURL = canvas.toDataURL('image/png')
//
//        }, 10000);
//    }
//
//}
//makeblob = function (dataURL) {
//    var BASE64_MARKER = ';base64,';
//    if (dataURL.indexOf(BASE64_MARKER) == -1) {
//        var parts = dataURL.split(',');
//        var contentType = parts[0].split(':')[1];
//        var raw = decodeURIComponent(parts[1]);
//        return new Blob([raw], {
//            type: contentType
//        });
//    }
//    var parts = dataURL.split(BASE64_MARKER);
//    var contentType = parts[0].split(':')[1];
//    var raw = window.atob(parts[1]);
//    var rawLength = raw.length;
//
//    var uInt8Array = new Uint8Array(rawLength);
//
//    for (var i = 0; i < rawLength; ++i) {
//        uInt8Array[i] = raw.charCodeAt(i);
//    }
//
//    return new Blob([uInt8Array], {
//        type: contentType
//    });
//} /**/
//
//var emotion_api_key = "abcdefghijklmnopqrstuvwzyz1234";
//$.ajax({
//        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
//        beforeSend: function (xhrObj) {
//            // Request headers
//            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
//            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", emotion_api_key);
//        },
//        type: "POST",
//        // Request body
//        data: makeblob(dataURL),
//        processData: false,
//        success: function (data) {
//            var result = data;
//            //code to show result will be here
//        }
//    })
//    .fail(function (data) {
//        alert("Code: " + data.responseJSON.error.code + " Message:" + data.responseJSON.error.message);
//    });
//
//window.onload = init();
