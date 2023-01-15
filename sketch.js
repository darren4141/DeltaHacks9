let my_cam;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;
let margin = 7;
let times = 0;
let counter = 0;

let flag = false;

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

        if(((singlePose.rightWrist.y < singlePose.rightShoulder.y-singlePose.rightShoulder.y/margin) || (singlePose.leftWrist.y < singlePose.leftShoulder.y-singlePose.leftShoulder.y/margin))){
            if(times>50){
                counter++;
                console.log(counter);
            }
            times = 0;
            
        }
        else if((singlePose.rightWrist.y > singlePose.rightShoulder.y-singlePose.rightWrist.y/(margin/2)) || (singlePose.leftWrist.y > singlePose.leftShoulder.y-singlePose.leftWrist.y/(margin/2)) && flag){
            times++;
            flag = false;
        }
        

        //if(singlePose.rightWrist.y > singlePose.rightShoulder.y -)

        

        
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