// countdown
let secondsCountdown = 10;

const seconds = document.getElementsByClassName("seconds");

seconds[0].innerHTML = `<span>${secondsCountdown}</span>`;

const showBaby = () => {
    clearInterval(timer);
    document.querySelector(".scene1").style.display = "none";
    document.querySelector(".scene2").style.display = "flex";
    document.body.classList.add("reveal-gender-fake");
    document.querySelector("#actual").classList.add("showed");
    makeBurst();
    document.addEventListener("click", () => {
        document.querySelector(".scene2").style.display = "none";
        makeBurst(["#FF00FF", "#FF69B4", "#DA70D6", "#FFC0CB"]);
        document.querySelector(".scene3").style.display = "flex";
        document.body.classList.add("reveal-gender");
        document.body.classList.remove("reveal-gender-fake");
    });
};

const timer = setInterval(() => {
    secondsCountdown -= 1;
    secondsCountdown = secondsCountdown;
    if (secondsCountdown == 0) return showBaby();
    seconds[0].innerHTML = `<span>${secondsCountdown}</span>`;
}, 1000);

/// confetti
const burstAmount = 1000;
const grav = 0.05;
const maxVelocity = 10;

const particles = [];
const genericColors = ["#500404", "#a80a0a", "#0f611a", "#05cf20"];

update();

function makeParticle(colors) {
    const p = document.createElement("div");
    p.classList.add("confetti");
    document.querySelector('.overlay').append(p)
    p.x = window.innerWidth / 2;
    p.y = window.innerHeight / 2;    

    p.vx = getRandomInt(-maxVelocity, maxVelocity);
    p.vy = getRandomInt(-maxVelocity * 1.5, maxVelocity);
    p.o = 1;
    p.style.opacity = p.o;
    p.style.left = p.x + "px";
    p.style.top = p.y + "px";
    p.style.background = getRandomColor(colors);
    particles.push(p);
}

function makeBurst(colors) {
    for (let i = 0; i < burstAmount; i++) {
        makeParticle(colors);
    }
}

function update() {
    if (particles.length > 0) {
        particles.forEach((p, i) => {
            p.vy += grav;
            p.y += p.vy;
            p.x += p.vx;
            p.o = p.o - 0.01;
            p.style.opacity = p.o;
            p.style.top = p.y + "px";
            p.style.left = p.x + "px";
            if (p.o <= 0) {
                particles.splice(i, 1);
            }
        });
    }
    window.requestAnimationFrame(update);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
}

function getRandomColor(colors) {
    if (colors) return colors[Math.floor(getRandomInt(0, colors.length))];
    return genericColors[Math.floor(getRandomInt(0, genericColors.length))];
}