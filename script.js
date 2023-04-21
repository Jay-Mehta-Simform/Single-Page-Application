//? To handle Navbar
let opened = false; //? Check if icon is clicked.
let icon = document.querySelector(".icon");
let pin = document.querySelector(".pin");
let ul = document.querySelector(".navigators");

//? To handle Home animation
let gif = document.querySelector(".gif");
let descriptionA = document.querySelector(".a");
let descriptionB = document.querySelector(".b");

//? TO handle Carousel
let carousel = document.querySelector(".container");
let body = document.querySelector("body");
let prev = document.querySelector(".leftArrow");
let next = document.querySelector(".rightArrow");
let image = document.querySelector(".image");
let newReleases = document.querySelector("#new");
let scrollComplete = false;
let mouseOnCarousel = false;
let isDragStart = false,
	prevPageX,
	prevScrollLeft;
let scroll = null;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

//? To handle card select
let active = null;
let cardsContainer = document.querySelector(".cardsContainer");

//? To submit new comment
let commentButton = document.querySelector(".userWrapper button");
let commentText = document.querySelector(".userComment textarea");
let commentHistory = document.querySelector(".history");

//? Navbar events
setTimeout(() => {
	if (!opened) throwIcon();
}, 2000);

icon.addEventListener("click", throwIcon);

icon.addEventListener("animationend", pinAnimation);

function throwIcon() {
	if (ul.style.visibility == "") {
		opened = true;
		pin.style.visibility = "visible";
		icon.style.animation = "1s linear iconAnimation";
		ul.style.animation = "2s linear 1s visible";
	}
	if (opened) icon.removeEventListener("click", throwIcon);
}

function pinAnimation() {
	icon.style.animation = "";
	pin.style.transform = "rotate(90deg)";
	ul.style.visibility = "visible";
	setTimeout(() => (pin.style.visibility = "hidden"), 1500);
}

//? Home Events
gif.addEventListener("mousedown", bounceText);

function bounceText() {
	gif.classList.toggle("initial");
	descriptionB.classList.toggle("animateBounce");
	descriptionA.classList.toggle("animateBounce");
}

//? Carousel Events
setInterval(isInViewport, 2000);

if (
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i) ||
	navigator.userAgent.match(/BlackBerry/i) ||
	navigator.userAgent.match(/Windows Phone/i)
) {
	carousel.addEventListener(
		"touchstart",
		(e) => {
			scrollMouseDown(e);
			mouseOnCarousel = true;
		},
		{ passive: true }
	);
	carousel.addEventListener("touchmove", scrollByDrag, { passive: true });
	carousel.addEventListener("touchend", (e) => {
		scrollMouseUp(e);
		mouseOnCarousel = false;
	});
} else {
	carousel.addEventListener("mousedown", scrollMouseDown);

	carousel.addEventListener("mousemove", scrollByDrag);

	carousel.addEventListener("mouseup", scrollMouseUp);
}

carousel.addEventListener("mouseover", () => (mouseOnCarousel = true));
carousel.addEventListener("mouseout", () => {
	mouseOnCarousel = false;
	scrollMouseUp();
});
prev.addEventListener("click", handlePrev);
next.addEventListener("click", handleNext);

function isInViewport() {
	const rect = newReleases.getBoundingClientRect();
	if (!(rect.top >= 0 && rect.top <= window.innerHeight / 2)) {
		clearInterval(scroll);
		scroll = null;
	} else if (scroll == null) {
		scroll = setInterval(autoScroll, 2000);
	}
}

function scrollMouseDown(e) {
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = carousel.scrollLeft;
}

function scrollByDrag(e) {
	if (isDragStart) {
		carousel.classList.add("dragging");
		carousel.scrollLeft = e.pageX;
		carousel.scrollLeft =
			prevScrollLeft - ((e.pageX || e.touches[0].pageX) - prevPageX);
		setTimeout(displayPrevNext, 60);
	}
}

function scrollMouseUp() {
	isDragStart = false;
	carousel.classList.remove("dragging");
}

function handlePrev() {
	setTimeout(() => displayPrevNext(), 60);
	carousel.scrollLeft = carousel.scrollLeft - image.clientWidth - 25;
}

function handleNext() {
	setTimeout(() => displayPrevNext(), 60);
	carousel.scrollLeft += image.clientWidth + 25;
}

function autoScroll() {
	displayPrevNext();
	if (!mouseOnCarousel) {
		if (carousel.scrollLeft == scrollWidth) {
			scrollComplete = true;
		} else if (carousel.scrollLeft == 0) {
			scrollComplete = false;
		}
		if (scrollComplete) {
			setTimeout(() => displayPrevNext(), 60);
			carousel.scrollLeft -= image.clientWidth - 25;
		} else {
			setTimeout(() => displayPrevNext(), 60);
			carousel.scrollLeft += image.clientWidth + 25;
		}
	}
}

function displayPrevNext() {
	prev.style.display = carousel.scrollLeft == 0 ? "none" : "block";
	next.style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

//? Handle Card Select
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

//? Add Comment
commentButton.addEventListener("click", () => {
	createComment(commentText.value);
	commentText.value = "";
});

function createComment(text) {
	let commentDiv = document.createElement("div");
	commentDiv.className = "comment";

	let userDiv = document.createElement("div");
	userDiv.className = "user";

	let img = document.createElement("img");
	img.src = "/Assets/user.svg";

	let name = document.createElement("h1");
	name.innerText = "Jay Mehta : ";

	let commentBodyDiv = document.createElement("div");
	commentBodyDiv.className = "commentBody";
	commentBodyDiv.innerText = text;

	userDiv.append(img, name);
	commentDiv.append(userDiv, commentBodyDiv);
	commentHistory.appendChild(commentDiv);
}

function highlightFirst() {
	let flexChildren = document.querySelectorAll(".card");
	let leftPosition = flexChildren[0].offsetLeft;
	for (let flexChild of flexChildren) {
		if (flexChild.offsetLeft <= leftPosition) {
			flexChild.classList.add("firstColumn");
		} else {
			flexChild.classList.remove("firstColumn");
		}
	}
}
// window.addEventListener("resize", highlightFirst);
highlightFirst();
