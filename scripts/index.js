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
const cartContentMain = document.querySelector(".cart-content-main");
const rightSection = document.querySelector(".right-section");
const addToCartButton = document.querySelector(".add-to-cart-button");
const cartMessage = document.querySelector(".cart-message");
const checkoutButton = document.querySelector(".checkout-button");
const cartHeader = document.querySelector(".icon-cart-header");
const cartContainer = document.querySelector(".cart-container");
const cartNotification = document.querySelector(".cart-notification");
const cartNotificationCounter = document.querySelector(".cart-notification-counter");

let cartItems = [];
let prevNextCounter = 1; // We used 1 as the initial value so that it matches up initial value of image-product
let counter = 0;
let notificationsCount = 0;

addToCartButton.addEventListener("click", () => {
  const productImg = thumbnailImages[0].getAttribute("src");
  const productName = rightSection.querySelector("h1").innerText;
  const productPrice = Number(rightSection.querySelector(".current-price").innerText.slice(1, 4));
  const productQuantity = Number(cartCounter.innerText);
  const productTotal = productPrice * productQuantity;
  const id = new Date().getTime();

  cartItems.push({
    img: productImg,
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    total: productTotal,
    id: id
  })

  notificationsCount++;
  onShowNotification();
  renderCart();
})
  
function renderCart() {
  cartContentMain.innerHTML = ""; // Nireset natin ang cartContentMain para hindi mag-multiply ang nirerender
  // ! Continue with cart functionality
  if (cartItems.length >= 1) {
    cartMessage.classList.add("hidden");
    cartContentMain.classList.remove("hidden");
    checkoutButton.classList.remove("hidden");
  } else {
    cartMessage.classList.remove("hidden");
    cartContentMain.classList.add("hidden");
    checkoutButton.classList.add("hidden");
  }

  cartItems.forEach(cartItem => {
    const cartContent = document.createElement("div");
    cartContent.className = "cart-content";
    cartContent.id = cartItem.id;
    cartContentMain.appendChild(cartContent);
    
    const productImage = document.createElement("img");
    productImage.className = "product-image"
    productImage.setAttribute("src", cartItem.img);
    cartContent.appendChild(productImage);
    
    const productPriceNameContainer = document.createElement("div");
    cartContent.appendChild(productPriceNameContainer);

    const productName = document.createElement("p");
    productName.innerText = cartItem.name;
    productName.className = "product-name";
    productPriceNameContainer.appendChild(productName);

    const productPrice = document.createElement("p");
    productPrice.innerText = `$${cartItem.price}.00 x `;
    productPrice.className = "product-price";
    productPriceNameContainer.appendChild(productPrice);

    const productQuantity = document.createElement("span");
    productQuantity.innerText = `${cartItem.quantity} `;
    productQuantity.className = "product-quantity";
    productPrice.appendChild(productQuantity);

    const productTotal = document.createElement("strong");
    productTotal.innerText = `$${cartItem.total}.00`;
    productTotal.className = "product-total";
    productPrice.appendChild(productTotal);

    const productDelete = document.createElement("img");
    productDelete.setAttribute("src", "images/icon-delete.svg");
    productDelete.addEventListener("click", () => {
      cartPopup.classList.remove("hidden");
    })
    productDelete.className = "product-delete";
    cartContent.appendChild(productDelete);

    const cartPopup = document.createElement("div");
    cartPopup.className = "cart-popup hidden";
    cartContent.appendChild(cartPopup);

    const cartPopupContainer = document.createElement("div");
    cartPopupContainer.className = "cart-popup-container";
    cartPopup.appendChild(cartPopupContainer);

    const confirmMessage = document.createElement("div");
    confirmMessage.innerText = "Delete item from cart?";
    cartPopupContainer.appendChild(confirmMessage);

    const confirmButtonsContainer = document.createElement("div");
    confirmButtonsContainer.className = "confirm-buttons-container";
    cartPopupContainer.appendChild(confirmButtonsContainer);

    const yesButton = document.createElement("button");
    yesButton.innerText = "Yes";
    yesButton.className = "yes-button";
    yesButton.addEventListener("click", onDelete(cartItem));
    yesButton.id = cartItem.id;
    confirmButtonsContainer.appendChild(yesButton);

    const noButton = document.createElement("button");
    noButton.innerText = "No";
    noButton.addEventListener("click", () => {
      cartPopup.classList.add("hidden");
    })
    confirmButtonsContainer.appendChild(noButton);
    
  })
}

function deleteItem(itemId) {
  cartItems = cartItems.filter(cartItem => {
    if (cartItem.id == itemId) {
      return false;
    } else {
      return true;
    }
  })
}

function onDelete(itemToDelete) {
  return function() { // Parang sinasabi natin, return the result of this function.
    deleteItem(itemToDelete.id); // magrurun ang code sa loob ng function
    renderCart(); // kung wala naman tayong gagawin sa result sa loob ng returned function, HINDI na kailangan mag-return
    console.log(itemToDelete)
  }
}
// * Show Notification
function onShowNotification() {
  // The condition is if cartContainer is hidden and notifications count is greater than or equal to 1, then show the notifications
  // but if cartContainer is not hidden, then cartNotif value is 0 and hide the notification.
  if (cartContainer.classList[1] == "hidden") {
    if (notificationsCount >= 1) {
      cartNotificationCounter.innerText = notificationsCount;
      cartNotification.classList.remove("hidden");
    }
  } else {
    notificationsCount = 0;
    cartNotification.classList.add("hidden");
  }
}

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

cartHeader.addEventListener("click", () => {
  cartContainer.classList.toggle("hidden");
  // Calling the function onShowNotification to test 
  onShowNotification();
})

// ! Fix the styling of lightbox

// Di ko kailangan pala eto i-run, wala pa naman ako i-rerender na nakalagay sa cartItems array, so i-call lang natin eto kung meron i.e. clicking the add to cart button.
// renderCart();  



// ! Sample closures

let contura = 0; // kung merong gagamit pa ng value na eto then mas magandang ilagay sa global scope, pero kung wala naman, sa loob na lang ng function mismo i DECLARE ang variable, and if you want the data to persist, then use a closure
function sampleCounter() {
  
return () => {
  contura++
  return () => {
    contura++
    return contura;
  };
}
  
}

const count = sampleCounter();