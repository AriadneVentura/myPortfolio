
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

window.addEventListener("scroll", reveal);


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


