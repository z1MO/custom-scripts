function getCoords(elem) { // кроме IE8-
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

function autoSubscr(mode) {
	if(mode === null) return false;

	var timingClick = mode === '+' ? 4000 : 15000;
	var windowListSubscr = document.querySelector('.isgrP');
	var allListSubscr = [...document.querySelectorAll('.wo9IH')];
	var specialListUsers = prompt('Есть список определенённых юзеров? Вставь сюда список логинов разделенных пробелом:');
		specialListUsers = specialListUsers !== null || specialListUsers !== '' ? specialListUsers.split(' ') : null;
	var processedLogins = [];
	var unsubscrButtonClass = '-Cab_';

	var j = -1;
	allListSubscr.forEach(function(userItem, i) {
		const userSubscrButton = userItem.querySelector('button');
		const userLogin = userItem.querySelector('.FPmhX').innerText;

		if(specialListUsers !== null) {
			if(!( specialListUsers.some(item => item === userLogin) )) return false;
		}

		if(mode === '+' && userSubscrButton.innerText.includes('Подписки')) return false;
		if(mode === '-' && userSubscrButton.innerText.includes('Подписаться')) return false;

		++j;

		setTimeout(function() {
			userSubscrButton.click();

			if(mode === '-') {
				setTimeout(() => document.querySelector(`.${unsubscrButtonClass}`).click(), 700);
			}

			windowListSubscr.scrollTo(0, -(getCoords(windowListSubscr).top - getCoords(userItem).top) + windowListSubscr.scrollTop);
			console.log('Клик: ' + j + 1, userLogin);
		}, j * timingClick);
	});

	setTimeout(() => console.log('end'), ++j * timingClick);
}

var modeSubscr = prompt('Подписаться "+", отписаться "-"', "+");
autoSubscr(modeSubscr);

// copy(JSON.stringify($$('.wo9IH .FPmhX').map(item => item.href)));