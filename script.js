let opened = false;

let icon = document.querySelector(".icon");
let pin = document.querySelector(".pin");
let ul = document.querySelector(".navigators");
let gif = document.querySelector(".gif");
let descriptionA = document.querySelector(".a");
let descriptionB = document.querySelector(".b");
let carousel = document.querySelector(".container");
let body = document.querySelector("body");
let prev = document.querySelector(".leftArrow");
let next = document.querySelector(".rightArrow");
let images = document.querySelectorAll(".image");

setTimeout(() => {
	if (!opened) {
		console.log("Click On The Dragon Icon To Open Menu");
		throwIcon();
	}
}, 2000);

icon.addEventListener("click", throwIcon);

icon.addEventListener("animationend", () => {
	icon.style.animation = "";
	pin.style.transform = "rotate(90deg)";
	ul.style.visibility = "visible";
	setTimeout(() => (pin.style.visibility = "hidden"), 1500);
});

gif.addEventListener("mousedown", () => {
	gif.classList.toggle("initial");
	descriptionB.classList.toggle("animateBounce");
	descriptionA.classList.toggle("animateBounce");
});

carousel.addEventListener("mousedown", (e) => {
	isDragStart = true;
	prevPageX = e.pageX;
	prevScrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("mousemove", scrollByDrag);
body.addEventListener("mouseup", () => {
	isDragStart = false;
	carousel.classList.remove("dragging");
});

function throwIcon() {
	console.log("here");
	if (ul.style.visibility == "") {
		opened = true;
		pin.style.visibility = "visible";
		icon.style.animation = "1s linear iconAnimation";
		ul.style.animation = "2s linear 1s visible";
	}
	if (opened) icon.removeEventListener("click", throwIcon);
}

let isDragStart = false,
	prevPageX,
	prevScrollLeft;

function scrollByDrag(e) {
	if (isDragStart) {
		carousel.classList.add("dragging");
		carousel.scrollLeft = e.pageX;
		carousel.scrollLeft = prevScrollLeft - (e.pageX - prevPageX);
	}
}

prev.addEventListener("click", () => {});
