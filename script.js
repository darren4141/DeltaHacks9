window.numCurls = 0;
window.numJacks = 0;
window.numLunges = 0;
window.numKnees = 0;
let appended = "display.html?";

function countJacks(){
    numJacks++;
    //console.log(window.numJacks);
    document.getElementById("numJacks").innerHTML = numJacks;

}

function countLunges(){
    numLunges++;
    document.getElementById("numLunges").innerHTML = numLunges;

}

function countCurls(){
    numCurls++;
    document.getElementById("numCurls").innerHTML = numCurls;

}

function countKnees(){
    numKnees++;
    document.getElementById("numKnees").innerHTML = numKnees;
}

function choose(){
    appended = appended + "jacks=" + numJacks + "&lunges=" + numLunges + "&curls=" + numCurls;
    window.location = appended;
}

//export {numCurls, numJacks, numLunges};