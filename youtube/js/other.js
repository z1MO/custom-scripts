/*
**
** Мелкие модули, которые точно пригодятся
**
*/


/*
** Так как высота вычисляется жсом, нужно делать перерасчет на основе новых стилей для этого же плеера
*/
setTimeout(() => {
	const windowResizeEvent = new Event('resize');

	window.dispatchEvent(windowResizeEvent);
}, 300);


/*
** Перенос фокуса на плеер после перемотки видео (чтобы громкостью можно было управлять)
*/
// ждем пока сгенерируется плеер в фоне
setTimeout(() => {

	// ставим события фокуса
	document.querySelector('.ytp-progress-bar').addEventListener('focus', () => {
		setTimeout(() => {
			// переносим фокус на весь плеер, чтобы была возможность управлять громкостью через клавишные стрелки
			document.querySelector('#ytd-player > div').focus();
		}, 1000);
	});

}, 5000);


function likeVideo() {
	const inactiveButtonLike = document.querySelector('#menu > ytd-menu-renderer > #top-level-buttons > ytd-toggle-button-renderer:nth-child(1):not(.style-default-active)');

	if(inactiveButtonLike) inactiveButtonLike.click();
}