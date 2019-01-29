/*
**
** Добавление кнопки "копировать название" к превью-трекам
**
*/


let bCopyNameTitle = 'Скопировать название аудиозаписи';
const topAudioPlayer = document.querySelector('.top_audio_player');
let bCopyName = document.querySelector('.top_audio_player_btn').cloneNode(true);

bCopyName.className = 'top_audio_player_btn top_audio_player_copy-name';
bCopyName.querySelector('.blind_label').innerText = bCopyNameTitle;
bCopyName.title = bCopyNameTitle;
bCopyName.addEventListener('click', copyAudioName);

bCopyName = topAudioPlayer.insertBefore(bCopyName, topAudioPlayer.children[0]);

function copyAudioName() {
	let titleAudio = document.querySelector('.top_audio_player_title').innerText;
	let isPreview = (() => {
		if(titleAudio.includes('Preview')) {
			titleAudio = titleAudio.replace('[Preview] ', '');
			return true;
		}

		return false;
	})();

	if(!copyToClipboard(titleAudio)) return false;

	if(isPreview) {
		const {postIDTrack, dateReleaseTrack} = getInfoTrack(titleAudio);

		if(dateReleaseTrack !== null) {
			const urlCalendar = 'https://calendar.google.com/calendar/r/day/' +
				`${dateReleaseTrack.getFullYear()}/${dateReleaseTrack.getMonth() + 1}/${dateReleaseTrack.getDate()}`;

			if(confirm('Открыть гугл-календарь?')) {
				window.open(urlCalendar, '_blank');
				setLikePost(postIDTrack);
			}
		}
	}

}
function copyToClipboard(text) {
	return window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

/*
**
** func getInfoTrack
** param title: string
** return null
** return object
**
*/
function getInfoTrack(title) {
	// const nameTrack = title.split(' – ')[1];
	// const audioRowTitle = [...document.querySelectorAll('.audio_row__title')].filter(item => item.textContent === nameTrack)[0];
	const audioRow = document.querySelector('.audio_row__current');
	if(audioRow === null) return null;

	const audioRowInfo = parseJSON(audioRow.getAttribute('data-audio'));
	if(audioRowInfo[11] === 'replies') return null; // если аудио находится в комментариях -> выход

	const postIDTrack = audioRowInfo[11].split(':')[1];
	let objectDate = null;
	const postText = audioRow.parents('.wall_text').querySelector('.wall_post_text').innerText;
	const groupNick = audioRow.parents('._post_content').querySelector('.post_image').getAttribute('href').replace('/', '');

	if(groupNick === 'speeeedy') {
		const textDate = postText.match(/\d{4}-\d{2}-\d{2}/);

		if(textDate !== null) {
			objectDate = new Date(textDate);
		}
	} else if(groupNick === 'edm_people') {
		const textDate = postText.match(/(\d{2})\s(\w+)/i);

		if(textDate !== null) {
			objectDate = new Date(`${textDate[1]} ${textDate[2]} ${new Date().getFullYear()}`);
		}
	}

	return {
		postIDTrack: postIDTrack,
		dateReleaseTrack: objectDate
	}
}

/*
**
** void func setLikePost
** param postID: string
**
*/
function setLikePost(postID) {
	const likeBtn = document.querySelector(`#post${postID} ._like_wall${postID} .like_btn.like:not(.active)`);

	if(likeBtn) likeBtn.click();
}

Element.prototype.parents = function(selector) {
	let elem = this;

	while((elem = elem.parentElement) !== null) {
		if(elem.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if(elem.matches(selector)) {
			return elem;
		}
	}

	return elem;
}