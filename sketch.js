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

//if both arms are going up to similar y values in a range then run this (use else if to make the other not run)

        if(counterJumpingJacks<jacks){
            if((singlePose.rightWrist.y < singlePose.nose.y) && (singlePose.leftWrist.y < singlePose.nose.y)){
                if(timesJJ>10){
                    counterJumpingJacks++;
                    document.getElementById("currentJacks").innerHTML = counterJumpingJacks;
                    console.log("jumping jacks ",counterJumpingJacks);
                }
                timesJJ = 0;
            }
            else if(((singlePose.rightWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.nose.y+singlePose.nose.y/(margin/2)))){
                timesJJ++;
            }
        }
        
        else if(counterCurls<curls){
            if(((singlePose.rightWrist.y < singlePose.rightShoulder.y+singlePose.rightShoulder.y/margin) || (leftOverShoulder && !rightOverShoulder))){
                if(timesC>10){
                    counterCurls++;
                    document.getElementById("currentCurls").innerHTML = counterCurls;
                    console.log("Curls", counterCurls);
                }
                timesC = 0;
            }
            else if(((singlePose.rightWrist.y > singlePose.rightShoulder.y+singlePose.rightWrist.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.leftShoulder.y+singlePose.leftWrist.y/(margin/2)))){
                timesC++;
            }
        }

        else if(counterLunges<lunges){
            bar = true;
            if(singlePose.nose.y<175){
                if(timesL>10){
                    counterLunges++;
                    document.getElementById("currentLunges").innerHTML = counterLunges;
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
    fill(255,0,0);


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
        stroke(255,255,0);
        strokeWeight(3);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }

        
    }

    

}