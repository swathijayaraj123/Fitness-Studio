// initial declarations
let i = 0;
let images = ["/images/equipments.jpeg", "images/dumbells.jpeg","images/dumbell_lifting 2.jpeg","images/gymPic1.jpg","images/gymPic2.jpg","images/gymPic3.jpg","images/gymPic4.jpg"];
let time = 2000;
let paused = false;

//slider functionality
function handleChange() {
  if (!paused) {
    document.slide.src = images[i];
    
    if (i < images.length - 1) {
      // $(".mini-container").fadeIn(1000);
      //  $(".mini-container").fadeOut(3000);
      i++;
    } else {
      i = 0;
    }
  }
  // slideshow functionality
  setTimeout(handleChange, time);
}
// slideshow pause functionality
function pause() {
  paused = !paused;
}

window.onload = handleChange