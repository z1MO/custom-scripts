/*
**
** Добавление кнопки в левое меню, по клику которой сохраняется музыка из списка каналов (localStorage)
**
*/

// Client ID and API key from the Developer Console
const CLIENT_ID = '529345583546-um820icd7pqsttjimvb5ms9kdadjncjr.apps.googleusercontent.com';
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';


function checkPage() {
	if(document.querySelector('.ytd-save-music')) return false;

	if(location.pathname.includes('/feed/subscriptions')) {
		addSaveMusicButton(); // клонирование существующей кнопки и её изменение
	} else {
		const saveMusicButt = document.querySelector('.ytd-save-music').parentElement;

		if(saveMusicButt) saveMusicButt.remove();
	}
}
checkPage();

const observer2 = new MutationObserver(() => {
	checkPage();
});
observer2.observe(document.querySelector('title'), { attributes: true, childList: true, characterData: true });

function addSaveMusicButton() {
	const buttWL = document.querySelector('a[href="/playlist?list=WL"]').parentNode; // WL = Watch later
	const newButt = buttWL.cloneNode(true);
	const newButtTitle = 'Добавить музыку в плейлист Посмотреть позже';

	newButt.firstElementChild.setAttribute('title', newButtTitle);
	newButt.firstElementChild.classList.add('ytd-save-music');
	newButt.querySelector('.title').innerText = newButtTitle;
	newButt.querySelector('yt-icon').appendChild(buttWL.querySelector('yt-icon > svg').cloneNode(true)); // после клонирования кнопки, почему-то не копируется svg иконка - поэтому снова принудительно копируем и вставляем
	newButt.querySelector('yt-img-shadow').setAttribute('hidden', true);

	newButt.addEventListener('click', () => {
		const lastVideoName = prompt('Название последнего видео', localStorage.getItem('lastVideo') || '');

		if(lastVideoName) addVideosToWL(lastVideoName);
	});

	buttWL.parentNode.insertBefore(newButt, buttWL.nextElementSibling);
}

function addVideosToWL(lastVideoName) {
	initClient();
	console.log(true);
}
function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function() {
		if(!gapi.auth2.getAuthInstance().isSignedIn.get()) {
			gapi.auth2.getAuthInstance().signIn();
		}
	});
}
