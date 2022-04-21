const videoItem = document.getElementById("video");
//document.querySelector("#video");
const button = document.querySelector("#button");

// prompt to select media stream
// pass to video element and play
async function selectMediaStream(){
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoItem.srcObject = mediaStream;
   
    videoItem.onloadedmetadata = () =>{
      videoItem.play();
    };

    button.textContent="Click to START";
    console.log("selected");

  } catch (error) {
    console.log("Error in selectMediaStream:",error);
    if(videoItem.srcObject==null){
      button.textContent="Select a media first";
      console.log("not selected");
    }

  }
}

selectMediaStream();

button.addEventListener("click",async ()=>{
  // disable the button
  button.disabled = true;

  if(videoItem.srcObject==null){
    selectMediaStream();
    return;
  }

  // start picture in picture
  await videoItem.requestPictureInPicture();

  button.disabled = false;
});