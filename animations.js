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


    document.querySelector("input[type=checkbox]").addEventListener("change", function () {
        var image = document.getElementById('get-image');
        var mail = document.getElementById('email');
        var git = document.getElementById('git');
        var linkedin = document.getElementById('linkedin');

        if (this.checked) {
            text.innerText = "darker";
            image.src = "thingies/aaiconL.png";
            document.querySelector('html').toggleAttribute('data-light-mode')
            mail.src = "thingies/mail_icon.png";
            git.src = "thingies/github_icon.png";
            linkedin.src = "thingies/linkedin_icon.png";

        } else {
            text.innerText = "lighter";
            image.src = "thingies/aaicon.png";
            document.querySelector('html').toggleAttribute('data-light-mode')
            mail.src = "thingies/mail_pink.png";
            git.src = "thingies/github_pink.png";
            linkedin.src = "thingies/linkedin_pink.png";

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
        if (direction > 0) {
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
        const creationsBox = document.querySelector('#creations_box');
        const numImages = images.length;

        let totalImageWidth = 0;
        images.forEach(image => {
            totalImageWidth += image.offsetWidth;
        });

        let scrollPosition = 0;
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
            // Ensure index is within valid bounds
            index = Math.max(0, Math.min(index, numImages - 1));

            // let scrollPosition = 0;
            if (index === 0) {
                // Scroll to the start for the first image
                scrollPosition = 0;
                console.log(images[index].offsetWidth)
            } else if (index === numImages - 1) {
                // Scroll to the end for the last image
                scrollPosition = carousel.scrollWidth - carouselWidth;
                console.log(images[index].offsetWidth)
            } else {
                // Get the bounding rectangle of the current image
                const imageRect = images[index].getBoundingClientRect();
                // Get the bounding rectangle of the projects container
                const containerRect = carousel.getBoundingClientRect();

                // Use the scroll step to calculate the exact scroll position
                // const imageCenter = scrollStep + imageWidth / 2;
                const imageCenter = imageRect.left - containerRect.left + imageRect.width / 2;

                // Floor this to stop jittering
                scrollPosition = Math.floor(imageCenter - boxWidth / 2);
            }

            // // Apply the scroll position
            carousel.style.transform = `translateX(${-scrollPosition}px)`;
        });
    });
}

let display;
const displayTitle = (image) => {
    // First click displays, next click hides.
    const box = image.closest('.box');
    const title = box.querySelector('.title');
    const explanation = box.querySelector('.explanation');
    const concepts = box.querySelector('.concepts');
    const languages = box.querySelector('.languages');


    // Check if the overlay already exists
    if (!display) {
        // Dim the image further
        // Note: doing just image.filter.style, javascript adds the styles inline which overrides all other css rules
        // including hover. This way is way better
        image.classList.add("darker");

        // Change their display styles
        title.classList.add("appear");
        explanation.classList.add("appear");
        concepts.classList.add(("appear"));
        languages.classList.add("appear");

        display = true;
    } else {
        // Undo
        image.classList.remove("darker");
        title.classList.remove("appear");
        explanation.classList.remove("appear");
        concepts.classList.remove(("appear"));
        languages.classList.remove("appear");
        display = false;
    }
}
