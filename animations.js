
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
    /*
    I think what i need to do is split the rectangle into fractions of the number of photos i hav

    Say i have 3 images, if the cursor is in 1/3 area then scroll to first image
    2/3 area -> middle iamge
    3/3 area -> third image
     */

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // width of the box is 66vw/2 = 33vw which is the center
    const visibleSize = 66*vw/100;
    const ratio = vw/visibleSize;

    const numbImages = document.getElementById("Cursor").length;
    const fractionWidth = visibleSize/numbImages;


    var max = 1;
    var min = 2;


    const cursor = document.getElementById("Cursor");
    const images = document.querySelectorAll(".a");
    document.body.addEventListener("mousemove", (event) => {
        // if (event.clientX)

        // check which fraction of the rectangle the mouse is in
        // then scroll to that image

        const move = (event.clientX * ratio);

        // for eahc

        const whichImage = Math.floor(event.clientX/fractionWidth);
        console.log("eweg" + whichImage);
        // const pos = images[whichImage].getAttribute("width");


        // if (move < 0) {
        //     move = 0;
        // }
        // * by 0.7 for smoothness (apparently, it's not tht smooth tho)
        cursor.style.transform = "translate3d(" + -(move) + "px, 0px, 0px)"
    });
}

const maze = () => {
    // 1. Start with a grid of unvisited cells.
    let dimensions = 20;
    let cells = [];
    for (let x = 0; x < dimensions; x++ ) {
        // initialize the empty rows, maze width = x + 1
        cells[x] = []
        // [[], [], [], [], [], []]
        for (let y = 0; y < dimensions; y++) {
            // create each cell in row we just made
            // [[0, 0], [1, 0], [2, 0]]
            // i think this is an object lol
            let cell = {
                x: x,
                y: y,
                // y, x?
                index: [x, y],
                status: "unvisited",
                adjacents: [],
                connections: []
            };
            cells[x][y] = cell;
            // add to unvisited set
            // unvisited.add(cell);
            // add adjacents
            if (cells[y - 1]) {
                if (cells[y - 1][x]) {
                    let up = cells[y - 1][x];
                    cell.adjacents.push(up);
                    up.adjacents.push(cell);
                }
            }


        }


    }
    // 2. Create two empty sets, marking visited cells, and what we’ll call frontier cells.
    // 3. Choose a random cell as the starting point, and add it to the visited set.
    // 4. Add all unvisited cells that are adjacent to the current cell to the frontier set.
    // 5. Choose a cell randomly from the frontier set and make it the current cell, removing it from the frontier set and adding it to the visited set.
    // 6. Remove the wall between the current cell and a random adjacent cell that belongs to the visited set.
    // 7.Repeat steps 4 through 6 until there are no more frontier cells.
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // i want to use prims algorithm

    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

}



