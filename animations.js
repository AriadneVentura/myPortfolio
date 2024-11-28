
const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active")
        } else {
            reveals[i].classList.remove("active")
        }
    }
}

const scroll = () => window.addEventListener("scroll", reveal);

const aestheticActivate = () => {
    const text = document.getElementById("theVibes");
    text.innerText = "lighter";


    document.querySelector("input[type=checkbox]").addEventListener("change", function() {
        var image = document.getElementById('get-image');
        if (this.checked) {
            text.innerText = "darker";
            image.src = "thingies/aaiconL.png";
            document.querySelector('html').toggleAttribute('data-light-mode')

        } else {
            text.innerText = "lighter";
            image.src = "thingies/aaicon.png";
            document.querySelector('html').toggleAttribute('data-light-mode')

        }
    }, false);
}

const typing = () => {
    const names = ["Ariadne. ", "Endaira. "]
    let idx = 0
    let charIdx = 0
    let direction = 1
    const elem = document.getElementById("lol")
    const max = 700;
    const min = 0;


    const handler = () => {
        // ALLOWED
        if (direction > 0 ) {
            elem.innerText += names[idx][charIdx]
        } else {
            elem.innerText = elem.innerText.substring(0, elem.innerText.length - 1)
        }

        // increment the charatcer
        charIdx += direction
        if (charIdx === names[idx].length) {
            direction = -1;
        } else if (charIdx === 0) {
            direction = 1;
            // loop through the array length
            // NOTE: cool operator
            idx = (idx + 1) % names.length
        }

        // dont have handler() bc then ur calling it rn
        // with just handler then ur telling it to be called in the future
        setTimeout(handler, Math.random() * (max - min) + min)
    }

    handler();
}

const activeIngredients = () => {
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav .navlist .links li");
    window.onscroll = () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                console.log(section)
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");

            if (li.querySelector("a").href.endsWith(current)) {
                li.classList.add("active");
            }
        });
    };
}

const slider = () => {
    const slider = document.querySelector('.gallery');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', _ => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', _ => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const SCROLL_SPEED = 3;
        const walk = (x - startX) * SCROLL_SPEED;
        slider.scrollLeft = scrollLeft - walk;
    });

}

// const carouselMovement = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         const carousel = document.querySelector('.wrapThisAgain');
//         const track = document.querySelector('.projects');
//         const images = document.querySelectorAll('.pics');
//         const creationsBox = document.querySelector('#creations_box');
//
//         const columnGap = 10; // Spacing between images
//         let totalImageWidth = 0;
//
//         // Calculate total width of all images and gaps
//         images.forEach(image => {
//             totalImageWidth += image.offsetWidth + columnGap;
//         });
//
//         // Mousemove event listener
//         carousel.addEventListener('mousemove', (e) => {
//             const boxRect = creationsBox.getBoundingClientRect();
//             const boxWidth = boxRect.width;
//             let mouseX = e.clientX - boxRect.left; // Mouse position relative to carousel
//             // Clamp mouseX to the bounds of creations_box
//             mouseX = Math.max(0, Math.min(mouseX, boxWidth));
//             const boxCenter = boxRect.width / 2;
//
//             // Find the image closest to the cursor
//             let closestImageIndex = 0;
//             let minDistance = Infinity;
//
//             images.forEach((image, index) => {
//                 const imageCenter = image.offsetLeft + image.offsetWidth / 2;
//                 const distance = Math.abs(imageCenter - mouseX);
//                 if (distance < minDistance) {
//                     minDistance = distance;
//                     closestImageIndex = index;
//                 }
//             });
//
//             // Scroll so the closest image's center aligns with the cursor
//             const closestImage = images[closestImageIndex];
//             const imageCenter = closestImage.offsetLeft + closestImage.offsetWidth / 2;
//             const scrollOffset = imageCenter - boxCenter;
//
//             track.style.transform = `translateX(${-scrollOffset}px)`;
//         });
//     });
// }

// TODO julia set canvas
// On Hover, click on program w

const carouselMovement = () => {

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.projects');
        const images = document.querySelectorAll('.pics');
        const creationsBox = document.querySelector('#creations_box');
        const numImages = images.length;
        const columnGap = 10; // 10px gap between images

        // Calculate the total width of all images (this allows the images to show fully)
        let totalImageWidth = 0;
        images.forEach(image => {
            totalImageWidth += image.offsetWidth;
        });


        document.addEventListener('mousemove', (e) => {
            const boxRect = creationsBox.getBoundingClientRect();
            // Mouse position relative to the creations_box
            let mouseX = e.clientX - boxRect.left;
            // Width of creations_box
            const boxWidth = boxRect.width;
            // Clamp mouseX to the bounds of creations_box
            mouseX = Math.max(0, Math.min(mouseX, boxWidth));
            const carouselWidth = document.getElementById("zoom").offsetWidth;

            // Calculate the index (aka image to scroll to) based on the mouse position
            let index = Math.floor((mouseX / boxWidth) * numImages);
            index = Math.max(0, Math.min(index, numImages - 1)); // Ensure index is within valid bounds

            let scrollPos = 0;

            let scrollPosition = 0;
            if (index === 0) {
                // Scroll to the start for the first image
                scrollPosition = 0;
            } else if (index === numImages - 1) {
                // Scroll to the end for the last image
                scrollPosition = carousel.scrollWidth - carouselWidth;
            } else {
                // Left edge of the current image
                const currentX = images[index].offsetLeft;
                // Width of the current image
                const imageWidth = images[index].offsetWidth;
                // The ending X-coordinate of the current image (its right edge),
                const nextX = currentX + imageWidth + columnGap;

                // Calculate the center of the current image
                const imageCenter = Math.floor(currentX + imageWidth / 2);

                // Only update scroll position if outside the bounds to prevent excess jittering
                // if (mouseX < currentX || mouseX > nextX) {
                //     // Align the center of the image with the cursor's position
                //     // scrollPosition = imageCenter - mouseX;
                //
                //     scrollPosition = imageCenter - mouseX;
                //
                // }

                if (mouseX < currentX || mouseX > nextX) {
                    // Store the previous scroll position
                    const previousScrollPosition = scrollPos;

                    // Align the center of the image with the cursor's position
                    scrollPos = imageCenter - mouseX;

                    //  directional check to prevent reverse movement
                    if ((scrollPos > previousScrollPosition && mouseX < imageCenter) ||
                        (scrollPos < previousScrollPosition && mouseX > imageCenter)) {
                        scrollPos = previousScrollPosition; // Cancel out the incorrect direction
                    }
                }

                carousel.style.transform = `translateX(${-scrollPos}px)`;


            }
            // Apply the scroll position
            // smoothScrollTo(scrollPosition);
            console.log(index, scrollPosition)
            carousel.style.transform = `translateX(${-scrollPosition}px)`;
        });
    });
}
