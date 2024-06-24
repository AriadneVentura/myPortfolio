
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

const carouselMovement = () => {

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.projects');
        const images = document.querySelectorAll('.pics');
        const numImages = images.length;
        console.log( carousel.scrollWidth);

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const screenWidth = window.innerWidth;
            const carouselWidth = 57/100 * screenWidth;


            // Calculate the index based on the mouse position
            let index = Math.floor((mouseX / carouselWidth) * numImages);
            if (index > numImages)
            {
                index = numImages - 1;
            }

            // Calculate the scroll position
            // TODO total - scroll?
            let scrollPosition;

            if (index === 0) {
                // Scroll to the start for the first image
                scrollPosition = 0;
            } else if (index === numImages - 1) {
                // Scroll to the end for the last image
                scrollPosition = carousel.scrollWidth - carouselWidth;
            } else {
                // Scroll to center the current image
                // const imageCenter = (index + 0.5) * images[index].clientWidth;
                // console.log(imageCenter);
                // scrollPosition = imageCenter - (carouselWidth / 2);
                scrollPosition = ((index / numImages) * carousel.scrollWidth);
            }

            console.log(index);

            // if (index === 1)
            // {
            //     console.log(images[index].width)
            //     console.log(scrollPosition);
            // }

            // Apply the scroll position
            carousel.style.transform = `translateX(${-scrollPosition}px)`;
        });
    });
}

// Julia set https://en.wikipedia.org/wiki/Julia_set canvas
const juliaSet = () => {
    // const canvas = document.getElementById("canvas").getContext("2d");
    //
    // canvas.style.width = 200/devicePixelRatio + "px";
    // canvas.style.height = 100/devicePixelRatio + "px";
    //
    // // ctx.fillRect(2, 2, 1, 1);
    //
    //
    // // choose R > 0 such that R**2 - R >= sqrt(cx**2 + cy**2)
    // const r = 40;
    // // for ()


}



