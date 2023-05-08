function setup()
{
    canvas = createCanvas(700 , 600)
    video = createCapture(VIDEO)
    video.hide()
    canvas.center()
    poseNet = ml5.poseNet(video , modelLoaded)
    poseNet.on("pose" , gotResults)
}
function draw()
{
    image(video , 0 , 0 , 700 , 600)
   
    if (scoreLeftWrist > 0.2) {
         stroke("red")
    fill("red")
    circle(leftWristX , leftWristY , 20)
    y = floor(leftWristY)
    volume = y / 600
    song.setVolume(volume)
    document.getElementById("volume").innerHTML = "Volume = " + volume
    }
    if (scoreRightWrist > 0.2) {
        fill("blue")
stroke("blue")
circle(rightWristX , rightWristY , 20)
if (rightWristY > 0 && rightWristY <= 100) {
    document.getElementById("speed").innerHTML = "speed is 0.5x"
    song.rate(0.5)
}
if (rightWristY > 100 && rightWristY <= 200) {
    document.getElementById("speed").innerHTML = "speed is 1x"
    song.rate(1)
}
if (rightWristY > 200 && rightWristY <= 300) {
    document.getElementById("speed").innerHTML = "speed is 1.5x"
    song.rate(1.5)
}
if (rightWristY > 300 && rightWristY <= 400) {
    document.getElementById("speed").innerHTML = "speed is 2x"
    song.rate(2)
}
if (rightWristY > 400 && rightWristY <= 500) {
    document.getElementById("speed").innerHTML = "speed is 2.5x"
    song.rate(2.5)
}
    }
}
scoreLeftWrist = 0
scoreRightWrist = 0
song = ""
function preload()
{
    song = loadSound("music.mp3")
}
function play()
{
    song.play()
    song.rate(1)
    song.setVolume(1)
}
function modelLoaded()
{
    console.log("poseNet has started to do it's thing :)!")
}
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0
function gotResults(results)
{
    if (results.length > 0) {
        console.log(results)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("rightWristX = " + rightWristX , "rightWristY = " + rightWristY)
        console.log("leftWristX = " + leftWristX , "leftWristY = " + leftWristY)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreLeftWrist = " + scoreLeftWrist)
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("scoreRightWrist = " + scoreRightWrist)
    }
}