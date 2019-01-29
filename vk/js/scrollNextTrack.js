/*
**
** Прокрутка страницы после переключения трека
**
*/
if(localStorage.getItem('scrollInOpenPage') === null) localStorage.setItem('scrollInOpenPage', '0');

let openPage = true;

document.addEventListener('visibilitychange', function(e) {
	openPage = document.visibilityState === 'visible' ? true : false;
});

function getOffsetRect(elem) {
	const box = elem.getBoundingClientRect();

	const body = document.body;
	const docElem = document.documentElement;

	const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	const clientTop = docElem.clientTop || body.clientTop || 0;
	const clientLeft = docElem.clientLeft || body.clientLeft || 0;

	return {
		top: box.top +  scrollTop - clientTop,
		left: box.left + scrollLeft - clientLeft
	}
}

/*
**
** Простой перезапуск плеера для отображения текущей аудиозаписи в новых постах
** (когда трек переключен, а пост появляется потом - не происходит отображение текущего трека, поэтому и нужен перезапуск)
**
*/
function restartPlayer() {
	const playerPlayBtn = document.querySelector('.top_audio_player_play');

	for(let i = 0; i < 2; i++) {
		playerPlayBtn.click();
		console.log('top_audio_player_btn click');
	}
}
function getPosts() {

	if(typeof getPostsAttempt === 'undefined') {
		getPostsAttempt = 1;
	} else {
		if(getPostsAttempt++ > 5) {
			return false;
		}
	}

	wall.showMore(10);

	setTimeout(() => {
		restartPlayer();
		scrollToPostAudio();
		listenerAudioChange();
	}, 1500);

	return true;
}
function checkMutationsAudio(mutationList) {
	let oldValue, newValue,
		forbiddenMutation = false,
		prohibitedClasses = ['audio_row__playing', 'audio_row__added'];

	mutationList.forEach(mutation => {
		if(forbiddenMutation === true) return true;

		oldValue = mutation.oldValue;
		newValue = mutation.target.classList['value'];

		if(
			prohibitedClasses.some(clss => oldValue.includes(clss)) ||
			prohibitedClasses.some(clss => newValue.includes(clss))
		) forbiddenMutation = true;
	});

	return forbiddenMutation;
}

function scrollToPostAudio(mutationList) {
	console.log('Run "scrollToPostAudio" script');

	if(!Number(localStorage.getItem('scrollInOpenPage')) && openPage) return false;
	if(checkMutationsAudio(mutationList)) return false;

	const currentAudio = document.querySelector('.post .audio_row__current');

	if(!currentAudio) {
		getPosts();
		return false;
	}

	const currentAudioPost = (() => {
		for(let parentElem = currentAudio; parentElem = parentElem.parentElement;) {
			if(parentElem.classList.contains('post')) {
				return parentElem;
			}
		}
	})();

	window.scrollToY(getOffsetRect(currentAudio).top - window.clientHeight() + currentAudio.offsetHeight * 3);
}

function listenerAudioChange() {
	console.log('Run "listenerAudioChange" script');

	let audioRowsTracked = document.querySelectorAll('.post .audio_row:not(.audio_row--tracked)');

	audioRowsTracked.forEach((elem) => {
		elem.classList.add('audio_row--tracked');
		elem.removeEventListener('click', listenerAudioChange);
	});

	audioObserver.push( mutationElems(audioRowsTracked, [scrollToPostAudio], {attributes: true, attributeOldValue: true, attributeFilter: ['class']}) );
}

function listenerClickAudio() {
	console.log('Run "listenerClickAudio" script');

	if(typeof audioObserver !== 'undefined') {
		audioObserver.forEach((item) => {
			item.forEach((item) => {
				item.disconnect();
			});
		});
		audioObserver = [];
	} else {
		audioObserver = [];
	}

	const audioRows = document.querySelectorAll('.post .audio_row:not(.audio_row--tracked)');

	if(document.querySelectorAll('#fw_summary_wrap').length) {
		listenerAudioChange();
	} else {
		audioRows.forEach((elem) => {
			elem.addEventListener('click', listenerAudioChange);
		});
	}
}

listenerClickAudio();

/*
** Установка слежки
*/
mutationElems(document.querySelectorAll('#page_body, #wrap3'), listenerClickAudio, {childList: true});
mutationElems(document.querySelectorAll('#page_wall_posts'), listenerAudioChange, {childList: true});

