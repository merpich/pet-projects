window.addEventListener('DOMContentLoaded', () => {

	function setYear(selector, year) {
		document.querySelector(selector).innerText = year + 1
	}

	function updateTimer({ daysSelector, hoursSelector, minutesSelector, secondsSelector, deadline }) {
		const nextYear = new Date(deadline)
		const currentTime = new Date()
		const diffTime = nextYear - currentTime

		const days = Math.floor(diffTime / 1000 / 60 / 60 / 24),
					hours = Math.floor((diffTime / 1000 / 60 / 60) % 24),
					minutes = Math.floor((diffTime / 1000 / 60) % 60),
					seconds = Math.floor((diffTime / 1000) % 60)

		document.querySelector(daysSelector).innerText = days
		document.querySelector(hoursSelector).innerText = hours
		document.querySelector(minutesSelector).innerText = minutes
		document.querySelector(secondsSelector).innerText = seconds
	}

	function initApp() {
		const currentYear = new Date().getFullYear()
		const deadline = `January 01 ${currentYear + 1} 00:00:00`

		const timerElements = {
			daysSelector: '#days',
			hoursSelector: '#hours',
			minutesSelector: '#minutes',
			secondsSelector: '#seconds',
			deadline
		}

		setYear('#year', currentYear)

		updateTimer(timerElements)
		setInterval(() => updateTimer(timerElements), 1000)
	}

	initApp()

})
