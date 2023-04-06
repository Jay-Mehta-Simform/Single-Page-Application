let opened = false;
setTimeout(() => {
	if (!opened) {
		console.log("Click On The Dragon Icon To Open Menu");
		throwIcon();
	}
}, 2000);

let icon = document.querySelector(".icon");
let pin = document.querySelector(".pin");
let ul = document.querySelector(".navigators");
let gif = document.querySelector(".gif");
let description = document.querySelector(".description");

function throwIcon() {
	console.log("here");
	if (ul.style.visibility == "") {
		opened = true;
		pin.style.visibility = "visible";
		icon.style.animation = "1s linear iconThrow, 1s linear iconAnimation";
		ul.style.animation = "2s linear 1s visible";
	}
	if (opened) icon.removeEventListener("click", throwIcon);
}

icon.addEventListener("click", throwIcon);

icon.addEventListener("animationend", () => {
	icon.style.animation = "";
	pin.style.animation = "0.3s fall";
});

pin.onanimationend = () => {
	pin.style.visibility = "hidden";
	pin.style.animation = "";
	ul.style.visibility = "visible";
};

let isAnimationOn = false;

gif.addEventListener("click", () => {
	if (!isAnimationOn) {
		gif.classList.toggle("initial");
		description.classList.toggle("animateBounce");
		isAnimationOn = true;
	}
});

description.addEventListener("animationstart", () => {
	gif.classList.toggle("initial");
});

description.addEventListener("animationend", () => {
	description.classList.toggle("animateBounce");
	isAnimationOn = false;
});
