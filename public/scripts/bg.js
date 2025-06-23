const images = [
    'images/slide/p1.jpg',
    'images/slide/p2.jpg',
    'images/slide/p3.jpg',
    'images/slide/p4.jpg',
    'images/slide/p5.jpg',
    'images/slide/p6.jpg',
    'images/slide/p7.jpg',
    'images/slide/p8.jpg',
    'images/slide/p9.jpg',
    'images/slide/p10.jpg',
    'images/slide/p11.jpg',
    'images/slide/p12.jpg',
    'images/slide/p13.jpg'
];


let index = 0;
let current = 1;

const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

// początkowe tło
bg1.style.backgroundImage = `url(${images[0]})`;
bg1.style.opacity = 1;

function crossfade() {
    const nextImage = images[(index + 1) % images.length];

    if (current === 1) {
        bg2.style.backgroundImage = `url(${nextImage})`;
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
        current = 2;
    } else {
        bg1.style.backgroundImage = `url(${nextImage})`;
        bg1.style.opacity = 1;
        bg2.style.opacity = 0;
        current = 1;
    }

    index = (index + 1) % images.length;
}

setInterval(crossfade, 5000);