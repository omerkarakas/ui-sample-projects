// unsplash api  
const count=5;
const apiKey = 'IoHN1_R84Z9QkbCuTxMUsj6j6fAhkp3QiqG9Mok72a8'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector(".loader");

let photosArray = [];
let loadingComplete = false;
let imagesLoaded = 0;
let totalImages = 0;

//check if all images were laded
function imageLoaded(){
  //console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    loadingComplete = true;
    //console.log("all images loaded");
  }
}


// Get photos from api
async function getPhotos(){

  try {
    loadingComplete=false;

    const response = await fetch(apiURL);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
    // console.log("reload");
    loader.hidden = true;
    
  } catch (error) {
    console.log(error);
  }
}

// Create Elements for links and photos, addin to dom
function displayPhotos(){
  totalImages = photosArray.length;
  // console.log("total images:", totalImages);
  imagesLoaded = 0;

  photosArray.forEach((photo) => {
    // create alink to unsplash
    const item = document.createElement('a');
    item.setAttribute("href",photo.links.html);
    item.setAttribute("target","_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description??photo.description);
    img.setAttribute("title", photo.alt_description??photo.description);

    item.appendChild(img);
    imageContainer.appendChild(item);
   
    //add event listener to track loadings
   img.addEventListener('load',imageLoaded);

  });

  
}

// Load more photos if scrolling near bottom of page
window.addEventListener('scroll', () =>{

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000){
    if (loadingComplete){
      loadingComplete = false;
       getPhotos();
    }
  }
});

getPhotos();