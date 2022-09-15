// =========================== Sternen Hintergrund ===========================
const numStars = 3500;

for (let i = 0; i < numStars; i++) {
	let star = document.createElement('div');
	star.className = 'star';
	var xy = getRandomPosition();
	star.style.top = xy[0] + 'px';
	star.style.left = xy[1] + 'px';
	document.body.append(star);
}

function getRandomPosition() {
	var y = window.innerWidth;
	var x = window.innerHeight;
	var randomX = Math.floor(Math.random() * x);
	var randomY = Math.floor(Math.random() * y);
	return [randomX, randomY];
}

// =========================== Start fenster mit Yoda ===========================
const dialog = document.getElementById('modul');

const welcome = () => {
	dialog.style.display = 'block';
};
function superCodeStart() {
	document.getElementById('starCodeStart').className = 'starCode';
	dialog.style.display = 'none';

	/*
	 * Sound copyright by The Walt Disney Company.
	 */
	var audio = new Audio('assets/audio/Star_Wars_original_opening_crawl_1977.mp3');
	audio.volume = 0.3;
	audio.play();
}
