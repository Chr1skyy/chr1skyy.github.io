const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const clock = document.querySelector('.clock');

function czas() {
  clock.style.display = "flex";
	const d = new Date();
	let month = d.getMonth();
	let day = d.getDay();
	let date = d.getDate();
	let hours = d.getHours();
  let minutes = d.getMinutes();
	let seconds = d.getSeconds();
	
	const secondsDeg = 360/60*seconds;
	const minutesDeg = 360/60*minutes;
	const hoursDeg = 360/12*hours;
	
	secondEl.style.transform = "translate(-50%, -100%) rotate("+secondsDeg+"deg)";
	minuteEl.style.transform = "translate(-50%, -100%) rotate("+minutesDeg+"deg)";
	hourEl.style.transform = "translate(-50%, -100%) rotate("+hoursDeg+"deg)";
	
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	timeEl.innerHTML = hours + ":" + minutes;
}

czas();
setInterval(czas, 1000);