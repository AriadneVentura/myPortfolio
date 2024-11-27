
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

        // dont have handler() bc then ur callingit rn
        // with just ahndler then u r telling it to be called in the future
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
//     document.addEventListener("DOMContentLoaded", () => {
//         const carousel = document.querySelector(".projects");
//         const images = document.querySelectorAll(".pics");
//         const creationsBox = document.querySelector("#creations_box");
//
//         // Calculate total width of the carousel, accounting for borders and gaps
//         const borderWidth = 1; // 1px left and right borders on carousel
//         const imageBorderWidth = 1; // 1px border on each image
//         const columnGap = 10; // 10px gap between images
//         const totalImageWidth = Array.from(images).reduce((total, img) => total + img.offsetWidth, 0);
//         const totalGaps = (images.length - 1) * columnGap; // Total space occupied by gaps between images
//         const totalCarouselWidth = totalImageWidth + (images.length * imageBorderWidth * 2) + totalGaps + (borderWidth * 2); // Total width
//
//         console.log(totalCarouselWidth)
//         creationsBox.addEventListener("mousemove", (e) => {
//             const boxRect = creationsBox.getBoundingClientRect();
//             let mouseX = e.clientX - boxRect.left; // Mouse position relative to creations_box
//             // Clamp mouseX to the bounds of creations_box
//             mouseX = Math.max(0, Math.min(mouseX, boxRect.width));
//             const boxWidth = boxRect.width;
//
//             // Calculate scrollable width (total carousel width minus visible width)
//             const scrollableWidth = totalCarouselWidth - boxWidth;
//
//             // Calculate scroll position based on mouse position
//             const scrollPosition = (mouseX / boxWidth) * scrollableWidth;
//
//             // Ensure scroll position doesn't exceed boundaries
//             // const clampedScrollPosition = Math.max(0, Math.min(scrollPosition, scrollableWidth));
//
//             console.log(scrollPosition)
//
//             // Apply the scroll position
//             carousel.style.transform = `translateX(${scrollPosition}px)`;
//         });
//     });

const carouselMovement = () => {

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.projects');
        const images = document.querySelectorAll('.pics');
        const creationsBox = document.querySelector('#creations_box');
        const numImages = images.length;

        const borderWidth = 1; // 1px left and right borders on carousel
        const imageBorderWidth = 1; // 1px border on each image
        const columnGap = 10; // 10px gap between images

        // // Calculate total width of images, gaps, and borders
        // const totalImageWidth = Array.from(images).reduce((total, img) => total + img.offsetWidth, 0);
        // const totalGaps = (numImages - 1) * columnGap; // Total space for gaps
        // const totalBorders = numImages * imageBorderWidth * 2; // Borders around all images
        // const totalCarouselWidth = totalImageWidth + totalGaps + totalBorders + borderWidth * 2; // Full width of carousel


        // Calculate the total width of all images (this allows the images to show fully)
        let totalImageWidth = 0;
        images.forEach(image => {
            totalImageWidth += image.offsetWidth;
        });


        document.addEventListener('mousemove', (e) => {
            const boxRect = creationsBox.getBoundingClientRect();
            let mouseX = e.clientX - boxRect.left; // Mouse position relative to the creations_box
            // Clamp mouseX to the bounds of creations_box
            mouseX = Math.max(0, Math.min(mouseX, boxRect.width));
            const boxWidth = boxRect.width; // Width of creations_box
            const carouselWidth = boxWidth; // Match carousel width to creations_box width

            // Calculate the index based on the mouse position (box?)
            let index = Math.floor((mouseX / boxWidth) * numImages);
            index = Math.max(0, Math.min(index, numImages - 1)); // Ensure index is within valid bounds

            // Calculate the scroll position
            let scrollPosition;
            console.log(index)

            if (index === 0) {
                // Scroll to the start for the first image
                scrollPosition = 0;
            } else if (index === numImages - 1) {
                // Scroll to the end for the last image
                scrollPosition = carousel.scrollWidth - carouselWidth;
            } else {
                scrollPosition = ((index / numImages) * carousel.scrollWidth);
            }

            // Apply the scroll position
            carousel.style.transform = `translateX(${-scrollPosition}px)`;
        });
    });
}



