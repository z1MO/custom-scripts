// favoriteChannels2.test();

function wrapTitle() {
	const titleVideo = document.querySelector('h1.title');
	const newTitleVideo = (document.querySelector('title')).innerText.replace(' - YouTube', '');
	const videoDuration = document.querySelector('.ytp-time-duration').innerText;

	const link = document.createElement('a');
	link.innerText = newTitleVideo;
	link.setAttribute('href', `https://vk.com/audio?q=${ encodeURIComponent(Utils.replaceWordsTitleVideo(newTitleVideo)) }&duration=${videoDuration}`);
	link.setAttribute('target', '_blank');
	link.addEventListener('click', () => {
		likeVideo();
	});

	titleVideo.innerHTML = '';
	titleVideo.appendChild(link);
}

function deleteLinkTitle() {
	const titleVideo = document.querySelector('h1.title');

	titleVideo.innerText = newTitleVideo;
}

function noticeOfClip() {
	const newTitleVideo = (document.querySelector('title')).innerText.replace(' - YouTube', '');

	if(
		newTitleVideo.includes('Official Music Video')
		&& document.visibilityState === 'hidden'
	)
		alert('Это видео - клип. Посмотри меня, плиз!');
}

function changeTitle() {
	if(!document.querySelector('h1.title').textContent) return false;

	if (Utils.isFavoriteChannel()) {
		setTimeout(noticeOfClip, 500);
		wrapTitle();
	} else {
		deleteLinkTitle();
	}
}
changeTitle();

{
	const observer = new MutationObserver(changeTitle);

	observer.observe(document.querySelector('title'), { attributes: true, childList: true, characterData: true });
}