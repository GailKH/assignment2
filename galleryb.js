
let compare;
let favouritesCount = 0;

let favourites = document.getElementById("favourites");
let favouritesBox = document.createElement("div");
favourites.appendChild(favouritesBox);


window.addEventListener("load", setupGallery);

function setupGallery() {
    let imageCount = imageFiles.length;
    let galleryBox = document.getElementById("photos");
    let currentSlide = 1;
    let runShow = true;
    let showRunning;



    //Create the H1 element for the title
    let title = document.createElement("h1");
    title.id = galleryTitle;
    let titleContent = "Butterflies of the United Kingdom"; 
    title.textContent = titleContent;
    titleBox = document.getElementById("title");
    titleBox.appendChild(title);



    //div to hold slideshow
    let slideBox = document.createElement("div");
    slideBox.id = "slideBox";
    galleryBox.appendChild(slideBox);
    
    for (let i = 0; i < imageCount; i++) 
    {
        let image = document.createElement("img");
        image.src = imageFiles[i];
        image.alt = imageCaptions[i];
        image.onclick = createModal;
        slideBox.appendChild(image);
    }

    //counter for slides
    let slideCounter = document.createElement("div");
    slideCounter.id = "slideCounter";
    slideCounter.textContent = currentSlide + "/" + imageCount;
    galleryBox.appendChild(slideCounter);

    //box for left arrow, right arrow, play/pause
    let controlsBox = document.createElement("div");
    controlsBox.id = "controlsBox";
    galleryBox.appendChild(controlsBox);

    let leftBox = document.createElement("div");
    leftBox.id = "leftBox";
    leftBox.innerHTML = "&#9664;";
    leftBox.onclick = moveToLeft;
    controlsBox.appendChild(leftBox);

    let playPause = document.createElement("div");
    playPause.id = "playPause";
    playPause.innerHTML = "&#9199;";
    playPause.onclick = startStopShow;
    controlsBox.appendChild(playPause);

    let rightBox = document.createElement("div");
    rightBox.id = "rightBox";
    rightBox.innerHTML = "&#9654;";
    rightBox.onclick = moveToRight;
    controlsBox.appendChild(rightBox);
    
    
    function moveToRight() {
        let firstImage = slideBox.firstElementChild.cloneNode("true");
        firstImage.onclick = createModal;
        slideBox.appendChild(firstImage);
        slideBox.removeChild(slideBox.firstElementChild);
        currentSlide++;
        if (currentSlide > imageCount) {
            currentSlide = 1;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function moveToLeft() {
        let lastImage = slideBox.lastElementChild.cloneNode("true");
        lastImage.onclick = createModal;
        slideBox.removeChild(slideBox.lastElementChild);
        slideBox.insertBefore(lastImage, slideBox.firstElementChild);
        currentSlide--;
        if (currentSlide ===0) {
            currentSlide = imageCount;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function startStopShow() {
        if(runShow) {
            showRunning = window.setInterval(moveToRight, 2000);
            runShow = false;
        }
        else {
            window.clearInterval(showRunning);
            runShow = true;
        }
    }

    let modalImage;
    function createModal() {
        let modalWindow = document.createElement("div");
        modalWindow.id = "lbOverlay";
        let figureBox = document.createElement("figure");
        modalWindow.appendChild(figureBox);

        modalImage = this.cloneNode("true");
        figureBox.appendChild(modalImage);

        let figureCaption = document.createElement("figcaption");
        figureCaption.textContent = modalImage.alt;
        figureBox.appendChild(figureCaption);
        
        let favouriteButton = document.createElement("button");
        favouriteButton.id = "favButton";
        favouriteButton.textContent = "Favourite";
        figureBox.appendChild(favouriteButton);
        favouriteButton.addEventListener("click", setupFavourites);

        

        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = function() {
            document.body.removeChild(modalWindow);
        }
        modalWindow.appendChild(closeBox);
      
        document.body.appendChild(modalWindow);
    }
        


    

    
    function setupFavourites() {
        document.getElementById("favourites").style.border = "5px solid black";
        //if the amount of favourites is less than 5, add image to favourites otherwise present error message
        if (favouritesCount < 5) {
            let favouritesFigure = document.createElement("figure");
            favouritesFigure.id = "favouritesFigure";
            let favouriteImage = modalImage.cloneNode(false);
            compare = modalImage.getAttribute("src");

            //if image is already in the favourites array, present error message
            compareBoolean = imageFavourites.includes(compare);

                if (compareBoolean == true) {
                window.alert("Only one of each photo can be added.") 
                favourites.removeChild(favouritesFigure);
                }
    
                else {
                    //get the src of the image and store it in array 
                    favouritesCount++;
                    imageFavourites.push(compare);
    
                    favourites.appendChild(favouritesFigure);
                    favouritesFigure.appendChild(favouriteImage);
                    //pushpin 
                    let pin = document.createElement("div");
                    pin.id = "pin";
                    favouritesFigure.appendChild(pin);
    
                    let captionButton = document.createElement("figcaption");
                    favouritesFigure.appendChild(captionButton);
                    let removeButton = document.createElement("button");
                    captionButton.appendChild(removeButton);
    
                    removeButton.id = "remButton";
                    removeButton.textContent = "Remove";
                    removeButton.addEventListener("click", removeImage);
                    function removeImage() {
                        //remove parent node + array entry
                        let toRemove = favouriteImage.getAttribute("src");
                        let index = imageFavourites.indexOf(toRemove);
                        imageFavourites.splice(index);
                        favourites.removeChild(favouritesFigure);
            
                        
                    }
                }

            }
        else {
            window.alert("Only five favourites allowed. Please remove one.")
        }
        


        
        
            } 
        


}    
