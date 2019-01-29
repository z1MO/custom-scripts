/*
**
** Пропуск extended треков в плеере
**
*/

{
	const targetObserve = document.querySelector('.top_audio_player_title_wrap');
	const configObserve = {childList: true};
	const callbackObserve = mutations => {
		mutations.forEach(mutation => {
			if(mutation.addedNodes.length && Boolean(localStorage.getItem('skipExtendedTracks'))) {
				if(
					mutation.addedNodes[0].innerText.includes('Extended')
					&& !window.location.pathname.includes('audios')
				) {
					document.querySelector('.top_audio_player_next').click();
				}
			}
		});
	};

	if(localStorage.getItem('skipExtendedTracks') === null) localStorage.setItem('skipExtendedTracks', '1');

	new MutationObserver(callbackObserve).observe(targetObserve, configObserve);
}