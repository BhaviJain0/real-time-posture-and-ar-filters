let capture;
let posenet;
let poses;
let thug, cigar, chain;

function setup(){
    createCanvas(640, 480);
    
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();

    posenet = ml5.poseNet(capture, ()=>{
        console.log('Model loaded!');
    })

    posenet.on('pose', function(results){
        console.log(results);
        poses = results;
    })

    thug = loadImage('spects.png');
    cigar = loadImage('cigar.png');
    chain = loadImage('chain.png');
}
function draw(){
    image(capture, 0, 0, 640, 480);

    if(poses && poses.length > 0){
        for(let i = 0; i < 1; i++){
            let pose = poses[i].pose;
            let skeleton = poses[i].skeleton;
            for(let j = 0; j < pose.keypoints.length; j++){
                pointA = pose.keypoints[j].position.x;
                pointB = pose.keypoints[j].position.y;
                stroke(0, 255, 0);
                fill(0, 255, 0);
                ellipse(pointA, pointB, 10, 10);
            }

            for(let k = 0; k < skeleton.length; k++){
                pointA = skeleton[k][0].position.x;
                pointB = skeleton[k][0].position.y;
                pointC = skeleton[k][1].position.x;
                pointD = skeleton[k][1].position.y;
                strokeWeight(2);
                stroke(255, 0, 0);
                line(pointA, pointB, pointC, pointD);
            }

            x1 = pose.leftEar.x;
            y1 = pose.leftEar.y;
            x2 = pose.rightEar.x;
            y2 = pose.rightEar.y;

            let faceWidth = dist(x1, y1, x2, y2);
            
            let specsX = (pose.leftEye.x + pose.rightEye.x) / 2;
            let specsY = (pose.leftEye.y + pose.rightEye.y) / 2 + 10; 

            imageMode(CENTER);
            image(thug, specsX, specsY, faceWidth*1.5, faceWidth*0.8);
            
            image(cigar, pose.nose.x-faceWidth*0.2, pose.nose.y+faceWidth*0.5, faceWidth*0.5, faceWidth*0.5);

            let chainX = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
            let chainY = (pose.leftShoulder.y + pose.rightShoulder.y) / 2 + 10; 

            image(chain, chainX, chainY*0.95, faceWidth*1.5, faceWidth);
            imageMode(CORNER);
        }
    }
}
