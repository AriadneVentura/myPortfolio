
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

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    const imgs = document.getElementById("Cursor").getElementsByClassName("pics");
    const numbImages = imgs.length;


    const cursor = document.getElementById("Cursor");
    const portfolio = document.getElementById("zoom");
    const lengthOfPortfolio = 57*vw/100;


    // Find the inner length of the carousel, including gaps
    let innerCarousel = 0;
    for (let i = 0; i < numbImages; i++) {
        innerCarousel += parseInt(imgs[i].getAttribute("width"));
        // Not the last image
        if (i < numbImages - 1) {
            // The gap is 10px, so add to the legnth
            innerCarousel += 10;
        }
    }

    portfolio.addEventListener("mousemove", (event) => {
        const rect = event.target.getBoundingClientRect();
        //x position within the element.
        const x = event.clientX - rect.left;
        // percentage the cursor is through the creations box
        const percentage = (x / lengthOfPortfolio);
        const move = percentage * innerCarousel;

        console.log(x, percentage, move)

        // TODO apply acceleration (value u want, += acceleration until u get to it, curve)
        cursor.style.transform = "translate3d(" + -(move) + "px, 0px, 0px)";
    });

    // // used to get the pixels rather than viewport width
    // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // const creationsBoxWidth = 66*vw/100;
    // const flexboxWidth = 57*vw/100;
    //
    // const imgs = document.getElementById("Cursor").getElementsByClassName("pics");
    // const numbImages = imgs.length;
    // const fractionWidth = creationsBoxWidth/numbImages;
    // const cursor = document.getElementById("Cursor");
    //
    // let max = 0;
    // for (let i = 0; i<numbImages; i++) {
    //     max += imgs[i].width;
    // }
    //
    // document.getElementById("zoom").addEventListener("mousemove", (event) => {
    //
    //     // Jake said this: but idk how to do that i tried i will get back to it
    //     //      using scrollLeft and scrollMax and making mouse percentage along the images correspond to the scrollMax
    //
    //     // check which fraction of the rectangle the mouse is in, then scroll to that image
    //     // -1 bc for some reaosn my math is wrong shut up
    //     const whichImage = Math.floor(event.clientX/fractionWidth) -1;
    //
    //     let width = 0;
    //     // recursively add the pixels?
    //     for (let i = 0; i<numbImages - 1; i++) {
    //         if (i === whichImage) {
    //             break
    //         }
    //         width += imgs[i].width;
    //     }
    //
    //     // Find the max scroll that would keep the final image in view without going into negative space;
    //
    //
    //     // width of the 'wrapThisAgain` box - the width of the last image to get the negative space
    //     cursor.style.transform = "translate3d(" + -(width) + "px, 0px, 0px)";
    //     console.log(whichImage);
    //
    //
    //
    //     // TODO later -> scroll on mouse speed
    // });
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



