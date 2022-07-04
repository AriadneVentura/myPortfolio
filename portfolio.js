function positionElement(el, x, y) {
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
}

const blue_b = document.getElementById('blue_box');
console.log(positionElement(blue_b, 662, 124));

// console.log(box1.style.left); // 👉️ "662"
// console.log(box1.style.top); // 👉️ "124"

const blue_h = document.getElementById('blue_hollow');
console.log(positionElement(blue_h, 685, 145));

const pink_b = document.getElementById('pink_box');
console.log(positionElement(pink_b, 162, 610));

const pink_h = document.getElementById('pink_hollow');
console.log(positionElement(pink_h, 193, 635));

const grey_b = document.getElementById('grey_box');
console.log(positionElement(grey_b, 1227, 787));

const grey_h = document.getElementById('grey_hollow');
console.log(positionElement(grey_h, 1263, 820));