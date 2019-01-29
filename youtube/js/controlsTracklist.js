/*
**
** Чтение треклиста из 1001tracklists для видео-подкастов
** и вывод кнопки прокрутки на основе таймкодов
**
*/
'use strict';

let videoControls;

class ControlsTracklist {
	constructor(options = {tracklistInDescription: false}) {
		this.podcastTitle = document.querySelector('h1.title').textContent;
		this.tracklist = [];
		this.currentTrackNumber = 0;

		if(options.tracklistInDescription) {
			this.parseDescriptionVideo();
			ControlsTracklist.removeControls();
			this.addControls();
			this.outputTitleFoundTracklist();

			this.consolelog('Uploaded tracklist: ' + this.podcastTitle);
			this.consolelog(this.tracklist);
		} else {
			this.getInfoPodcast(`https://vlkh.pp.ua/custom-scripts/${nameSite}/php/parse1001Tracklist.php`, {titlePosdcast: this.podcastTitle})
				.then(response => {
					if(response.ok) {
						return response.json();
					}
					throw new Error('Network response was not ok.');
				})
				.then(response => {
					// проверка в ответе на ошибки от сервера
					if(response.error) {
						throw new Error(response.error);
					}

					this.podcastTitle = response.name;
					this.tracklist = response.tracklist;

					// add controls
					ControlsTracklist.removeControls();
					this.addControls();
					this.outputTitleFoundTracklist();

					this.consolelog('Uploaded tracklist: ' + this.podcastTitle);
					this.consolelog(this.tracklist);
				})
				.catch(err => {
					this.consolelog('', err);
					alert(err);
				});
		}

	}

	consolelog(message, ...other) {
		if(other.length === 0) {
			other = '';
		} else if (other.length === 1) {
			other = other[0];
		}

		console.log('CONTROLS-TRACKLIST:', message, other);
	}

	getInfoPodcast(url, params) {
		return fetch(`${url}?${paramsToString(params)}`);

		function paramsToString(data) {
			if(typeof data === 'object') {
				return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
			} else {
				return null;
			}
		}
	}

	parseDescriptionVideo() {
		const descriptionVideo = document.querySelector('#description'),
			timestampLinks = descriptionVideo.querySelectorAll('a[href*="&t="]');

		if(timestampLinks.length) {
			timestampLinks.forEach((item, i, arr) => {
				const name = item.nextSibling.textContent.trim();
				const timestamp = item.href.match(/t=(\d+)s/)[1];
				const duration = (() => {
					const nextLinkTimestamp = arr[i + 1];

					if(nextLinkTimestamp !== undefined) {
						const nextTrackTimestamp = nextLinkTimestamp.href.match(/t=(\d+)s/)[1];
						const durationSeconds = nextTrackTimestamp - timestamp;

						return `${parseInt(durationSeconds / 60)}:${durationSeconds%60}`;
					} else {
						return undefined;
					}
				})();
				const url = null;

				this.tracklist.push({
					name,
					duration,
					timestamp,
					url
				});
			});
		} else {

		}
	}

	static removeControls() {
		const controls = [...document.querySelectorAll('.controls-tracklist')];

		if(controls.length) {
			controls.forEach(item => item.remove());

			// Восстановление исходных классов для работы корректной расширения StreamKeys
			document.querySelectorAll('a.ytp-prev-video-button, a.ytp-next-video-button').forEach(button => {
				button.className = button.className.replace('-video', '');
			});

			document.querySelector('.info-block-upload-tracklist').remove();
		}
	}
	static isAddingControls() {
		return Boolean(document.querySelector('.controls-tracklist'));
	}
	static isShowControls() {
		if(this.isAddingControls()) {
			const controls = [...document.querySelectorAll('.controls-tracklist')];

			function isShow(item) {
				return Boolean(item.offsetParent);
			}

			return controls.every(isShow);
		} else {
			return false;
		}
	}
	static visibilityControls(state = 'visible') {

		if(this.isAddingControls()) {
			const controls = [...document.querySelectorAll('.controls-tracklist')];
			const displayStyle = state === 'visible' ? 'inline-block' : 'none';

			controls.forEach(item => item.style.display = displayStyle);
		}
	}
	addControls() {
		const leftControls = document.querySelector('.ytp-left-controls');

		const buttPrevTrack = createButton(
			'Предыдущий трек в подкасте',
			['ytp-button', 'ytp-prev-button', 'controls-tracklist', 'controls-tracklist--prev'],
			this.rewindToPrevTrack.bind(this)
		);
		const buttNextTrack = createButton(
			'Следующий трек в подкасте',
			['ytp-button', 'ytp-next-button', 'controls-tracklist', 'controls-tracklist--next'],
			this.rewindToNextTrack.bind(this)
		);
		const buttSearchTrackInVk = createButton(
			'Найти в ВК',
			['ytp-button', 'controls-tracklist', 'controls-tracklist--in-vk'],
			this.searchTrackInVk.bind(this)
		);

		leftControls.insertBefore(buttNextTrack, leftControls.querySelector('a.ytp-next-button').nextElementSibling);
		leftControls.insertBefore(buttSearchTrackInVk, leftControls.querySelector('a.ytp-next-button').nextElementSibling);
		leftControls.insertBefore(buttPrevTrack, leftControls.querySelector('a.ytp-next-button').nextElementSibling);

		// Удаление классов для работы корректной расширения StreamKeys
		document.querySelectorAll('a.ytp-prev-button, a.ytp-next-button').forEach(button => {
			button.className = button.className.replace(/(ytp-\w+)(-button)/, '$1-video$2');
		});


		function createButton(title, classes, listener) {
			const butt = document.createElement('button');
			butt.title = title;
			butt.setAttribute('aria-title', title);

			if(typeof classes === 'string') classes = classes.split(' ');
			classes.map(val => butt.classList.add(val));

			butt.addEventListener('click', listener);

			return butt;
		}
	}

	outputTitleFoundTracklist() {
		const titleVideo = document.querySelector('h1');

		const infoBlock = document.createElement('div');
		infoBlock.classList.add('info-block-upload-tracklist');
		infoBlock.innerText = 'Uploaded tracklist: ' + this.podcastTitle;

		titleVideo.parentElement.insertBefore(infoBlock, titleVideo);
	}

	setCurrentTrackNumber() {
		const ytPlayer = document.querySelector('video');
		const ytPlayerCurrTime = ytPlayer.currentTime;
		var i = 0;

		for(; i < this.tracklist.length; i++) {
			if(i === 0 && ytPlayerCurrTime < this.tracklist[i].timestamp) break;
			if(i === this.tracklist.length - 1 && ytPlayerCurrTime >= this.tracklist[i].timestamp) break;
			if(ytPlayerCurrTime >= this.tracklist[i].timestamp && ytPlayerCurrTime < this.tracklist[i + 1].timestamp) break;
		}

		this.currentTrackNumber = i;
	}

	rewindToPrevTrack() {
		this.setCurrentTrackNumber();

		if(this.currentTrackNumber === 0 && document.querySelector('.ytp-prev-video-button')) {
			document.querySelector('.ytp-prev-video-button').click();
		} else {
			this.currentTrackNumber -= this.currentTrackNumber === 0 ? 0 : 1;

			const currentTrackTimestamp = this.tracklist[this.currentTrackNumber].timestamp;
			document.querySelector('video').currentTime = currentTrackTimestamp;
		}

	}

	rewindToNextTrack() {
		this.setCurrentTrackNumber();

		if(this.currentTrackNumber === this.tracklist.length - 1) {
			document.querySelector('.ytp-next-video-button').click();
		} else {
			this.currentTrackNumber += 1;

			const currentTrackTimestamp = this.tracklist[this.currentTrackNumber].timestamp;
			document.querySelector('video').currentTime = currentTrackTimestamp;
		}

	}

	searchTrackInVk() {
		this.setCurrentTrackNumber();

		const currentTrack = this.tracklist[this.currentTrackNumber],
			currentTrackName = currentTrack.name,
			currentTrackDuration = currentTrack.duration;

		if(currentTrackName === null) return alert('This is the unknown track. Sorry.');

		let encodeCurrentTrackName = encodeURIComponent(Utils.replaceWordsTitleVideo(currentTrackName.replace(/&amp;/g, '&')));

		window.open(`https://vk.com/audio?q=${encodeCurrentTrackName}&duration=${currentTrackDuration}`);
	}
}

{
	const titlePage = document.querySelector('title');

	function checkPage(mutations) {
		// Youtube зачем-то передобавляет текстовую ноду в title страницы
		// Вот эта проверка отключает повторный запуск модуля
		if(
			mutations !== undefined &&
			mutations[0].addedNodes[0].textContent === mutations[0].removedNodes[0].textContent
		) {
			return false;
		}

		if(
			Utils.isWatchPage() &&
			Utils.isFavoriteChannel() &&
			Utils.isPodcast()
		) {
			videoControls = new ControlsTracklist();
		} else {
			ControlsTracklist.removeControls();
		}
	};
	checkPage();

	const observer = new MutationObserver(checkPage);
	observer.observe(titlePage, { attributes: true, childList: true, characterData: true });
}