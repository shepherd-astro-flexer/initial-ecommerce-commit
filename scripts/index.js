const headerTexts = document.querySelectorAll(".header-text-container"); // * This is the container of header-text
const thumbnailContainers = document.querySelectorAll(".thumbnail-image-container");
const thumbnailImages = document.querySelectorAll(".thumbnail-image");
const mainImage = document.querySelector(".main-image");
const lightboxGallery = document.querySelector(".lightbox-gallery");
const closeLightbox = document.querySelector(".close");
const lightboxMainImage = document.querySelector(".lightbox-main-image");
const lightboxThumbnailImages = document.querySelectorAll(".lightbox-thumbnail-image");
const lightboxThumbnailImageContainers = document.querySelectorAll(".lightbox-thumbnail-image-container");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button");
const incrementButton = document.querySelector(".increment-button");
const decrementButton = document.querySelector(".decrement-button");
const cartCounter = document.querySelector(".cart-counter");

let prevNextCounter = 1; // We used 1 as the initial value so that it matches up initial value of image-product
let counter = 0;

headerTexts.forEach((headerText, index) => {
  headerText.addEventListener("click", () => {
    removeBorderBottom(index);
  })
})

function removeBorderBottom(selected) {
  headerTexts.forEach((headerText, index) => {
    const headerTextClass = headerText.classList;

    if (selected == index) {
      headerTextClass.add("header-text-add-border"); // ! remove class from other headerText
    } else {
      headerTextClass.remove("header-text-add-border");
    }
  })
}

thumbnailContainers.forEach((thumbnailContainer, index) => {
  thumbnailContainer.addEventListener("click", () => {
    onActive(index)
  })
})

function onActive(selected) {
  thumbnailContainers.forEach((thumbnailContainer, index) => {
    const thumbnailContainerClass = thumbnailContainer.classList;
    const thumbnailContainerChild = thumbnailContainer.querySelector(".thumbnail-image").classList;

    if (selected == index) {
      thumbnailContainerClass.add("add-border");
      thumbnailContainerChild.add("add-opacity");
      onMainImageChange(selected);
    } else {
      thumbnailContainerClass.remove("add-border");
      thumbnailContainerChild.remove("add-opacity");
    }
  }) 
}

// * Code for changing the main image when clicking the thumbnails
function onMainImageChange(current) {
  mainImage.setAttribute("src", `images/image-product-${current + 1}.jpg`);
}

// Show lightbox gallery by clicking the main image
mainImage.addEventListener("click", () => {
  const mainImageNum = mainImage.getAttribute("src").slice(21, 22); // This code is to get the number of the main image so that we can sync it with our lightbox main image
  lightboxGallery.classList.remove("hidden");
  onLightboxMainImageChange(mainImageNum);
})

closeLightbox.addEventListener("click", () => {
  lightboxGallery.classList.add("hidden");
})

// Lightbox functionalities
lightboxThumbnailImageContainers.forEach((lightboxThumbnailImageContainer, index) => {
  lightboxThumbnailImageContainer.addEventListener("click", () => {
    prevNextCounter = index + 1; // We added + 1 to the index of 
    onLightboxActive(index);
  })
})

function onLightboxActive(selected) {
  lightboxThumbnailImageContainers.forEach((lightboxThumbnailImageContainer, index) => {
    const lightboxThumbnailClass = lightboxThumbnailImageContainer.classList;
    const lightboxThumbnailChild = lightboxThumbnailImageContainer.querySelector(".lightbox-thumbnail-image").classList;

    if (selected == index) {
      lightboxThumbnailClass.add("add-border");
      lightboxThumbnailChild.add("add-opacity");
      // We added + 1 to the selected because the starting number of the main images is 1, meaning not an index which starts at 0
      onLightboxMainImageChange(selected + 1);
    } else {
      lightboxThumbnailClass.remove("add-border");
      lightboxThumbnailChild.remove("add-opacity");
    }
  })
}

// * Code for changing the lightbox main image
function onLightboxMainImageChange(current) {
  lightboxMainImage.setAttribute("src", `images/image-product-${current}.jpg`);
}

nextButton.addEventListener("click", () => {
  if (prevNextCounter < 4) {
    prevNextCounter++;
    prevNext();
  }
})

previousButton.addEventListener("click", () => {
  if (prevNextCounter > 1) {
    prevNextCounter--;
    prevNext();
  }
})

function prevNext() {
  onLightboxMainImageChange(prevNextCounter);
  onLightboxActive(prevNextCounter - 1);
}

// Adding to cart
incrementButton.addEventListener("click", () => {
  counter++;
  onCounterChange();
})

decrementButton.addEventListener("click", () => {
  if (counter > 0) {
    counter--;
    onCounterChange();
  }
})

function onCounterChange() {
  cartCounter.innerText = counter;
}


