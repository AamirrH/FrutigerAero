const images = [
  "../media/ImageGallery1.jpg",
  "../media/ImageGallery2.jpg",
  "../media/ImageGallery3.jpg",
  "../media/ImageGallery4.jpg",
  "../media/ImageGallery5.jpg",
  "../media/ImageGallery6.jpg",
  "../media/ImageGallery7.jpg",
  "../media/ImageGallery8.jpg",
  "../media/ImageGallery9.jpg",
  "../media/ImageGallery10.jpg",
];

let currentIndex = 0;

const displayedImage = document.getElementById("displayedImage");
const nextImageButton = document.getElementById("nextImageButton");
const prevImageButton = document.getElementById("prevImageButton");

function showImage(index) {
  displayedImage.src = images[index];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

nextImageButton.addEventListener("click", nextImage);
prevImageButton.addEventListener("click", prevImage);

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  audio.volume = 0.3;
});
