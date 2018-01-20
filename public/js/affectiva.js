

// ###############################################################################################
// ###############################################################################################
// ############################DETECT!############################################################
// ###############################################################################################
// ###############################################################################################

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
let divRoot = $('#affdex_elements')[0];
let width = 640;
let height = 480;
let faceMode = affdex.FaceDetectorMode.LARGE_FACES;
// Construct a CameraDetector and specify the image width / height and face detector mode.
let detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

// Enable detection of all Expressions, Emotions and Emojis classifiers.
//   detector.detectAllEmotions();
//   detector.detectAllExpressions();
//  detector.detectAllEmojis();
//   detector.detectAllAppearance();
	  detector.detectExpressions.smile = true;
	  detector.detectEmotions.joy = true;
	  detector.detectExpressions.eyeClosure = true;
	  detector.detectExpressions.attention = true;


// Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener('onInitializeSuccess', () => {
        log('#logs', "The detector reports initialized");
        //Display canvas instead of video feed because we want to draw the feature points on it
        $("#face_video_canvas").css("display", "none");
        $("#face_video").css("display", "none");
      });

function log(node_name, msg) {
  $(node_name).append('<span>' + msg + '</span><br />');
}

// function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    $('#logs').html('');
    detector.start();
  }
  log('#logs', 'GET READY!');
}

// function executes when the Stop button is pushed.
function onStop() {
  log('#logs', 'Clicked the stop button');
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }
}

      //function executes when the Reset button is pushed.
      function onReset() {
  log('#logs', 'Clicked the reset button');
  if (detector && detector.isRunning) {
    detector.reset();

    $('#results').html('');
  }
}

      //Add a callback to notify when camera access is allowed
      detector.addEventListener('onWebcamConnectSuccess', () => {
        log('#logs', "SET");
      });

// Add a callback to notify when camera access is denied
detector.addEventListener('onWebcamConnectFailure', () => {
        log('#logs', "webcam denied");
        console.log("Webcam access denied");
      });

// Add a callback to notify when detector is stopped
detector.addEventListener('onStopSuccess', () => {
        log('#logs', "The detector reports stopped");
        $("#results").html("");
      });

var attnCounter = 0;
var eyeCounter = 0;
var lost = false;


// Add a callback to receive the results from processing an image.
// The faces object contains the list of the faces detected in an image.
// Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener('onImageResultsSuccess', (faces, image, timestamp) => {
        if (lost) {
            return;
        }
        // MAGIC HAPPENS HERE
        var joy = null;
        var attention = null;
        var eyeClosure = null;
        var faceDec = false;

        var joyAlert = false;

        if (faces.length === 1) {
            // These are Numbers
            faceDec = true;
            joy = faces[0].emotions.joy;
            attention = faces[0].expressions.attention;
            eyeClosure = faces[0].expressions.eyeClosure;

            if (joy > 50) {
                console.log(joy);
                lost = true;
                alert('haha, Maybe next time!');
                joy = 0;
                detector.stop();
            } 
            if (attention < 40) {
                attnCounter += 1;          
                // setInterval(console.log('attnCounter' + attnCounter), 50000);
            }
            else if (attention > 41) {
                attnCounter = 0;
            }
            if (eyeClosure > 80) {
                eyeCounter += 1;
                // setInterval(console.log('eyeCounter:' + eyeCounter), 50000);
            }
            else if (eyeClosure < 70) {
                eyeCounter = 0;
            }

            if (attnCounter > 50) {
                alert('LOOK AT SCREEN!!!');
                attnCounter = 0;
            }
            if (eyeCounter > 50) {
                alert('OPEN YOUR EYES!!!!!');
                eyeCounter = 0;
            }
        }
        
    
        $('#results').html("");
        log('#results', "Timestamp: " + timestamp.toFixed(2));
        log('#results', "Number of faces found: " + faces.length);
        if (faces.length > 0) {
          log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
          log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          }));
          log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          }));
        //   log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
        //   drawFeaturePoints(image, faces[0].featurePoints);
        }
		
      });

//   //Draw the detected facial feature points on the image
//   function drawFeaturePoints(img, featurePoints) {
//     var contxt = $('#face_video_canvas')[0].getContext('2d');

//     var hRatio = contxt.canvas.width / img.width;
//     var vRatio = contxt.canvas.height / img.height;
//     var ratio = Math.min(hRatio, vRatio);

//     contxt.strokeStyle = "#FFFFFF";
//     for (var id in featurePoints) {
//       contxt.beginPath();
//       contxt.arc(featurePoints[id].x,
//         featurePoints[id].y, 2, 0, 2 * Math.PI);
//       contxt.stroke();

//     }
//   }

// ]]> 
