const headerTexts = document.querySelectorAll(".header-text-container"); // * This is the container of header-text
const thumbnailContainers = document.querySelectorAll(".thumbnail-image-container");
const thumbnailImages = document.querySelectorAll(".thumbnail-image");
const mainImage = document.querySelector(".main-image");

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

function onMainImageChange(current) {
  mainImage.setAttribute("src", `images/image-product-${current + 1}.jpg`);
}

// ! Continue lightbox functionality 