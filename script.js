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
let image = document.querySelector(".image");
let newReleases = document.querySelector("#new");
let cardsContainer = document.querySelector(".cardsContainer");
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

setTimeout(() => {
	if (!opened) {
		console.log("Click On The Dragon Icon To Open Menu");
		throwIcon();
	}
}, 2000);

let scrollComplete = false;
let mouseOnCarousel = false;
function autoScroll() {
	displayPrevNext();
	if (!mouseOnCarousel) {
		// console.log("mouse not over");
		if (carousel.scrollLeft == scrollWidth) {
			// console.log("Scroll Complete");
			scrollComplete = true;
		} else if (carousel.scrollLeft == 0) {
			// console.log("Scroll Remaining");
			scrollComplete = false;
		}
		if (scrollComplete) {
			// console.log("Scrolling Back");
			setTimeout(() => displayPrevNext(), 60);
			carousel.scrollLeft -= image.clientWidth - 25;
		} else {
			// console.log("Scrolling Ahead");
			setTimeout(() => displayPrevNext(), 60);
			carousel.scrollLeft += image.clientWidth + 25;
		}
	}
}

icon.addEventListener("click", throwIcon);

icon.addEventListener("animationend", () => {
	icon.style.animation = "";
	pin.style.transform = "rotate(90deg)";
	ul.style.visibility = "visible";
	setTimeout(() => (pin.style.visibility = "hidden"), 1500);
});

gif.addEventListener("mousedown", bounceText);

function bounceText() {
	gif.classList.toggle("initial");
	descriptionB.classList.toggle("animateBounce");
	descriptionA.classList.toggle("animateBounce");
}

function scrollMouseDown(e) {
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = carousel.scrollLeft;
}

function scrollMouseUp() {
	isDragStart = false;
	carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", scrollMouseDown);
carousel.addEventListener(
	"touchstart",
	(e) => {
		scrollMouseDown(e);
		mouseOnCarousel = true;
	},
	{ passive: true }
);

carousel.addEventListener("mousemove", scrollByDrag);
carousel.addEventListener("touchmove", scrollByDrag, { passive: true });

carousel.addEventListener("mouseup", scrollMouseUp);
carousel.addEventListener("touchend", (e) => {
	scrollMouseUp(e);
	mouseOnCarousel = false;
});

carousel.addEventListener("mouseover", () => {
	mouseOnCarousel = true;
});
carousel.addEventListener("mouseout", () => {
	mouseOnCarousel = false;
	scrollMouseUp();
});

prev.addEventListener("click", handlePrev);
next.addEventListener("click", handleNext);

function throwIcon() {
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
		carousel.scrollLeft =
			prevScrollLeft - ((e.pageX || e.touches[0].pageX) - prevPageX);
		setTimeout(displayPrevNext, 60);
	}
}

async function handlePrev() {
	setTimeout(() => displayPrevNext(), 60);
	carousel.scrollLeft = carousel.scrollLeft - image.clientWidth - 25;
}

function handleNext() {
	setTimeout(() => displayPrevNext(), 60);
	carousel.scrollLeft += image.clientWidth + 25;
}

function displayPrevNext() {
	prev.style.display = carousel.scrollLeft == 0 ? "none" : "block";
	next.style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
let scroll = null;
function isInViewport() {
	const rect = newReleases.getBoundingClientRect();
	if (
		!(
			(rect.top >= 0 && rect.top <= window.innerHeight / 2)
			// rect.top >= 0 &&
			// rect.left >= 0 &&
			// rect.bottom <=
			// 	(window.innerHeight || document.documentElement.clientHeight) &&
			// rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		)
	) {
		clearInterval(scroll);
		scroll = null;
	} else if (scroll == null) {
		scroll = setInterval(autoScroll, 2000);
	}
}

setInterval(isInViewport, 2000);

let active = null;
cardsContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("card")) {
		if (active != e.target) {
			if (active != null) active.classList.remove("cardActive");
			e.target.classList.add("cardActive");
			active = e.target;
		} else {
			active.classList.remove("cardActive");
			active = null;
		}
	}
});
