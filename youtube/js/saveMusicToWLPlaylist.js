/*
**
** Добавление кнопки в левое меню, по клику которой сохраняется музыка из списка каналов (localStorage)
**
*/

//document.querySelectorAll('button[title="Удалить"]').forEach((item, i) => setTimeout(() => item.click(), i * 300));
//Mike Stud - Fault (KDrew Remix)

/*
**
** TODO:
** прикрутить промисы к подгрузке контента
** скрывать сообщение "видео добавлено в список" на время добавления
** плавная прокрутка страницы для подгрузки контента
** скрывать кнопку "добавить музыку", а не удалять
**
*/

'use strict';

const delayAddItemToWL = 1000;
const delayParsingNextPage = 4000;

function checkPage() {
	let saveMusicButt = document.querySelector('.ytd-save-music');

	if(location.pathname.includes('/feed/subscriptions')) {
		if(saveMusicButt === null) addSaveMusicButton();
	} else {
		if(saveMusicButt !== null) saveMusicButt.parentElement.remove();
	}
}
checkPage();

{
	const observer = new MutationObserver(checkPage);
	observer.observe(document.querySelector('title'), { attributes: true, childList: true, characterData: true });
}

function addSaveMusicButton() {
	const buttWL = document.querySelector('a[href="/playlist?list=WL"]').parentNode; // WL = Watch later
	const newButt = buttWL.cloneNode(true);
	const newButtTitle = 'Добавить музыку в плейлист "Посмотреть позже"';

	buttWL.parentNode.insertBefore(newButt, buttWL.nextElementSibling);

	newButt.firstElementChild.setAttribute('title', newButtTitle);
	newButt.firstElementChild.classList.add('ytd-save-music');
	newButt.firstElementChild.removeAttribute('href');
	newButt.querySelector('.title').innerText = newButtTitle;
	newButt.querySelector('yt-icon').appendChild(buttWL.querySelector('yt-icon > svg').cloneNode(true)); // после клонирования кнопки, почему-то не копируется svg иконка - поэтому снова принудительно копируем и вставляем
	newButt.querySelector('yt-img-shadow').setAttribute('hidden', true);

	newButt.addEventListener('click', () => {
		const lastVideoName = prompt('Название последнего видео', localStorage.getItem('lastVideo') || '');

		if(lastVideoName) addVideosToWL(lastVideoName);
	});
}

function addVideosToWL(lastVideoName = false) {
	if(!lastVideoName) return false;

	const musicVideos = [];

	// поиск видео с музыкой до lastVideoName
	searchMusicVideo(lastVideoName);

	// добавление видео в WL
	const eventMouseEnter = new Event('mouseenter', {bubbles: true, composed: true}),
		eventMouseLeave = new Event('mouseleave', {bubbles: true, composed: true});

	for(let i = musicVideos.length - 1, j = 0, videoThumbnail; i >= 0; i--, j++) {
		videoThumbnail = musicVideos[i].querySelector('ytd-thumbnail');

		setTimeout(function() {

			try {
				videoThumbnail.dispatchEvent(eventMouseEnter);
				videoThumbnail.querySelector('ytd-thumbnail-overlay-toggle-button-renderer').click();
				videoThumbnail.dispatchEvent(eventMouseLeave);

				// musicVideos[i].querySelector('button[is=paper-icon-button-light]').click();
				// document.querySelector('ytd-popup-container').querySelector('yt-formatted-string').click();

				if(!i) {
					localStorage.setItem('lastVideo', musicVideos[i].querySelector('#video-title').innerText);
					alertFinished(musicVideos.length);
				}
			} catch(err) {
				console.log(err, musicVideos[i]);
			}

		}, j * delayAddItemToWL);
	}

	function searchMusicVideo(lastVideoName) {
		const videos = document.querySelectorAll('ytd-grid-video-renderer:not(.ytd-grid-video-renderer--checked)');

		for(let i = 0; i < videos.length; i++) {
			videos[i].classList.add('ytd-grid-video-renderer--checked');

			// если это последнее видео: возвращаем список видео
			if(videos[i].querySelector('#video-title').innerText.includes(lastVideoName)) {
				window.scrollTo(0, videos[i].offsetTop - window.innerHeight / 2 + 100);
				return true;
			}
			// если видео проходит контроль - добавляем его в список
			if(
				isFavoritesVideo(videos[i]) &&
				!isViewedVideo(videos[i]) &&
				!isStreamVideo(videos[i]) &&
				!isNotReleasedVideo(videos[i]) &&
				!isVideoFound(videos[i])
			) {
				videos[i].classList.add('ytd-grid-video-renderer--add-list');
				musicVideos.push(videos[i]);
			}
			// если видео последнее - крутим страницу дальше и перезапускаем цикл
			if(i === videos.length - 1) {
				window.scrollTo(0, document.documentElement.scrollHeight);
				setTimeout(() => searchMusicVideo(lastVideoName), delayParsingNextPage);
				return false;
			}
		}
	}
	function alertFinished(count) {
		alert(`В плейлист "Посмотреть позже" добавлено ${count} видео`);
	}
	function isFavoritesVideo(video, favChannels = favoriteChannels) {
		const channelNameVideo = video.querySelector('#byline > a').innerText;

		return favChannels.some(chann => {
			if(chann.name === channelNameVideo) return true;
		});
	}
	function isViewedVideo(video) {
		return Boolean(video.querySelectorAll('#progress').length);
	}
	function isStreamVideo(video) {
		const timestamp = video.querySelector('.ytd-thumbnail-overlay-time-status-renderer');

		if(timestamp !== null) return timestamp.innerText.includes('ПРЯМАЯ ТРАНСЛЯЦИЯ');

		return true;
	}
	function isNotReleasedVideo(video) {
		const timestamp = video.querySelector('.ytd-thumbnail-overlay-time-status-renderer');

		if(timestamp !== null) return timestamp.innerText.includes('СКОРО ПРЕМЬЕРА');

		return true;
	}
	function isVideoFound(video) {
		const searchTitle = Utils.getTitleVideo(video);

		return musicVideos.some(video => Utils.getTitleVideo(video) === searchTitle);
	}
}