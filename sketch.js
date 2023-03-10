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
let timesL = 0;

let bar = 0;

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
let lunges = urlParams.get("squats");
let curls = urlParams.get("curls");

let jackCounter = document.getElementById('jackCounter');
let curlCounter = document.getElementById('curlCounter');
let loungeCounter = document.getElementById('loungeCounter');

//document.getElementById('param')
let flag = false;
document.getElementById("desiredJacks").innerHTML = jacks;
document.getElementById("desiredLunges").innerHTML = lunges;
document.getElementById("desiredCurls").innerHTML = curls;


var voice1 = new Audio('audio/New_Recording.mp3')
var voice2 = new Audio('audio/New_Recording_2.mp3')
var voice3 = new Audio('audio/New_Recording_3.mp3')
var voice4 = new Audio('audio/New_Recording_4.mp3')
var voice5 = new Audio('audio/New_Recording_5.mp3')
var voice6 = new Audio('audio/New_Recording_6.mp3')
var voice7 = new Audio('audio/New_Recording_7.mp3')
var voice8 = new Audio('audio/New_Recording_8.mp3')
var voice9 = new Audio('audio/New_Recording_9.mp3')
var voice10 = new Audio('audio/New_Recording_10.mp3')
var voice11 = new Audio('audio/New_Recording_11.mp3')

var done = new Audio('audio/Beep (sound effect).mp3')

const voices = [voice1, voice2, voice3, voice4, voice5, voice6, voice7, voice8, voice9, voice10, voice11]


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

        //console.log((rightOverShoulder && !leftOverShoulder) || (leftOverShoulder && !rightOverShoulder));
        //console.log(leftOverShoulder, " vs ", rightOverShoulder);



//for jumping jacks

//if both arms are going up to similar y values in a range then run this (use else if to make the other not run)

        if(counterJumpingJacks<jacks){
            if((singlePose.rightWrist.y < singlePose.nose.y) && (singlePose.leftWrist.y < singlePose.nose.y)){
                if(timesJJ>10){
                    counterJumpingJacks++;
                    document.getElementById("currentJacks").innerHTML = counterJumpingJacks;

                    calories += jackCalories;
                    document.getElementById("caloriesBurned").innerHTML = Math.round(calories*100)/100;
    
                    if(counterJumpingJacks >= jacks){
                        done.play()
                        //jackCounter.style.color = "green";
                    } else if(counterJumpingJacks%3==0){
                        voices[Math.floor(Math.random()*4)].play()
                    }
                }
                timesJJ = 0;
            }
            else if(((singlePose.rightWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2)))){
                timesJJ++;
            }
        }

        //curls
        
        else if(counterCurls<curls){
            if(((singlePose.rightWrist.y < singlePose.rightShoulder.y+singlePose.rightShoulder.y/margin) || (singlePose.rightWrist.y < singlePose.leftShoulder.y+singlePose.leftShoulder.y/margin))){
                if(timesC>10){
                    counterCurls++;
                    document.getElementById("currentCurls").innerHTML = counterCurls;
                    console.log("Curls", counterCurls);

                    calories += curlCalories;
                    document.getElementById("caloriesBurned").innerHTML = Math.round(calories*100)/100;


                    if(counterCurls >= curls){
                        done.play()
                        //curlCounter.style.color = "green";
                    } else if(counterCurls%3==0){
                        voices[Math.floor(Math.random()*4)].play()
                    }
                }
                timesC = 0;
            }
            else if(((singlePose.rightWrist.y > singlePose.rightShoulder.y+singlePose.rightWrist.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.leftShoulder.y+singlePose.leftWrist.y/(margin/2)))){
                timesC++;
            }
        }

        //squats

        else if(counterLunges<lunges){
            bar = true;
            if(singlePose.nose.y<175){
                if(timesL>10){
                    counterLunges++;
                    document.getElementById("currentLunges").innerHTML = counterLunges;
                
                    calories += lungeCalories;
                    document.getElementById("caloriesBurned").innerHTML = Math.round(calories*100)/100;

                    if(counterLunges >= lunges){
                        done.play()
                        //curlCounter.style.color = "green";
                    } else if(counterCurls%3==0){
                        voices[Math.floor(Math.random()*4)].play()
                    }

                }
                timesL = 0;
                
            }

            else{
                timesL++;            
            }
        }
        else{
            bar = false;
        }



    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    
    image(my_cam, 0, 0);
    fill(255,255,255);


    if(bar){
        const ctx = canvas.getContext('2d');

    
        // set line stroke and line width
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
    
        // draw a red line
        ctx.beginPath();
        ctx.moveTo(100, 175);
        ctx.lineTo(900, 175);
        ctx.stroke();
    }


    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        }
        stroke(129,255,134);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }

        
    }

    

}