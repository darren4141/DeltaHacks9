//import * as ITMES from "script.js";

let my_cam;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;
let margin = 40;

let timesJJ = 0;
let timesC = 0;
let timeL = 0;


let counterCurls = 0;
let counterJumpingJacks = 0;
let counterLunges = 0;

let flagJJ = false;
let flagC = false;
let flagL = false;

let calories = 0;
let jackCalories = 0.2;
let curlCalories = 0.02;
let lungeCalories = 0.3;

console.log(document.getElementById('param'));
const urlParams = new URLSearchParams(window.location.search);
let jacks = urlParams.get("jacks");
let lunges = urlParams.get("lunges");
let curls = urlParams.get("curls");

//document.getElementById('param')
let flag = false;
document.getElementById("desiredJacks").innerHTML = jacks;
document.getElementById("desiredLunges").innerHTML = lunges;
document.getElementById("desiredCurls").innerHTML = curls;
function setup() {

    var canvas = createCanvas(1400, 700);
    my_cam = createCapture(VIDEO)
    my_cam.hide();
    posenet = ml5.poseNet(my_cam, modelLoaded);
    posenet.on('pose',receivedPoses);
  
}


function receivedPoses(poses){

    //work here to run functions
    

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;

        //curls
        /*
        console.log("left wrist: ", singlePose.leftWrist.y);
        console.log("left shoulder: ", singlePose.leftShoulder.y);
        */

        //goes top down so switch the signs

        
        //curling
        //console.log("wrist: ", singlePose.rightWrist.y);
        //console.log("below curl: ", (singlePose.rightShoulder.y-singlePose.rightWrist.y/10));
        
        //console.log(flag);

        /*
        let wristToShoulder = Math.sqrt(Math.pow(singlePose.rightWrist.y-singlePose.rightShoulder.y, 2)+Math.pow(singlePose.rightWrist.x-singlePose.rightShoulder.x, 2));
        
        //when wrist is above the top half of shoulder
        if(((singlePose.rightWrist.y < singlePose.rightShoulder.y-singlePose.rightShoulder.y/margin) || (singlePose.leftWrist.y < singlePose.leftShoulder.y-singlePose.leftShoulder.y/margin)) && times>50){
            //console.log("its curling");

            
            if(wristToShoulder < 400){
                counter++;
            }
            
            console.log(counter);
            times = 0;
        }
        
        
        */
       
        let rightOverShoulder = singlePose.rightWrist.y < singlePose.rightShoulder.y+singlePose.rightShoulder.y/margin;
        let leftOverShoulder = singlePose.leftWrist.y < singlePose.leftShoulder.y+singlePose.leftShoulder.y/margin;

        //console.log((rightOverShoulder && !leftOverShoulder) || (leftOverShoulder && !rightOverShoulder));
        //console.log(leftOverShoulder, " vs ", rightOverShoulder);



//for jumping jacks

        if((singlePose.rightWrist.y < singlePose.nose.y) && (singlePose.leftWrist.y < singlePose.nose.y)){
            if(timesJJ>10){
                counterJumpingJacks++;
                document.getElementById("currentJacks").innerHTML = counterJumpingJacks;
                calories += jackCalories;
                document.getElementById("caloriesBurned").innerHTML = calories;
                console.log("jumping jacks ",counterJumpingJacks);

                if(counterJumpingJacks >= jacks){
                    jackCounter.style.color = "green";
                }

            }
            
            timesJJ = 0;
            flagJJ = true;
        }
        else if(((singlePose.rightWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2))) && flagJJ){
            timesJJ++;
            flagJJ = false;
        }


// for curls

        
        else if(((rightOverShoulder && !leftOverShoulder) && (singlePose.rightWrist.y > singlePose.nose.y)) || ((leftOverShoulder && !rightOverShoulder) && (singlePose.leftWrist.y > singlePose.nose.y))){
            if(timesC>10){
                counterCurls++;
                document.getElementById("currentCurls").innerHTML = counterCurls;
                calories += curlCalories;
                document.getElementById("caloriesBurned").innerHTML = calories;
                console.log("Curls", counterCurls);

                if(counterCurls >= curls){
                    curlCounter.style.color = "green";
                }
            }
            timesC = 0;
            flag = true;
        }
        else if((singlePose.rightWrist.y > singlePose.rightShoulder.y+singlePose.rightWrist.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.leftShoulder.y+singlePose.leftWrist.y/(margin/2)) && flagC){
            timesC++;
            flag = false;
        }

        




    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    
    image(my_cam, 0, 0);
    fill(255,0,0);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,0);
        strokeWeight(3);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }

        
    }

    

}