navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var userName, dataURL, context, canvas;
var cam_sentiment = 0;
var emotion_api_key = "eba55b501cc54c078b09860bf1c84d3e";


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
            
            
               
            canvas = document.getElementById("canvas1");
            context = canvas.getContext("2d");
//            document.getElementById("capture-button").addEventListener("click", function ()     {
//                context.drawImage(video, 20, 20, 600, 450, 0, 0, 200, 200);
//            }),
            
            
            takeAndAnalyzePicture = function(){

            context.drawImage(video, 20, 20, 600, 450, 0, 0, 200, 200);
//            document.getElementById("use-this").addEventListener("click", function () {
            dataURL = canvas.toDataURL("image/png"),
            makeblob = function (dataURL) {
                    var BASE64_MARKER = ';base64,';
                    if (dataURL.indexOf(BASE64_MARKER) == -1) {
                        var parts = dataURL.split(',');
                        var contentType = parts[0].split(':')[1];
                        var raw = decodeURIComponent(parts[1]);
                        return new Blob([raw], {
                            type: contentType
                        })
                    }
                    var parts = dataURL.split(BASE64_MARKER);
                    var contentType = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    var rawLength = raw.length;
 
                    var uInt8Array = new Uint8Array(rawLength);
 
                    for (var i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
 
                    return new Blob([uInt8Array], {
                        type: contentType
                    });
                },
            
            //AJAX CALL
            $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", emotion_api_key);
            },
            type: "POST",
            // Request body
            data: makeblob(dataURL),
            processData: false,
            success: function(data) {
//                alert("success");
               var result = data;
               //code to show result will be here
                //alert("hello "+ data[0].scores.happiness);
                //console.log("hello" + result);
//                alert("success 2");
                var happiness = data[0].scores.happiness;
                var sadness = data[0].scores.sadness;
                var neutral = data[0].scores.neutral;

                if ( (happiness > sadness) && (happiness > neutral) ){
                    
                    cam_sentiment = 1;
                   
                }
                else if ( (sadness > happiness) && (sadness > neutral)) {
                    cam_sentiment = -1;
                   
                }
                else{
                    cam_sentiment = 0;
                

                }            

            }
            })
            .fail(function(data) {
                alert("Code: " + data.responseJSON.error.code + " Message:" +                  data.responseJSON.error.message);
            });

            return cam_sentiment;                
                
            }            

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

