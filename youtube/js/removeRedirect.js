/*
**
** Автопереход по внешным ссылкам для youtube
**
*/

function removeRedirectLink(url) {
	const paramsURL = new URLSearchParams(url);

	return decodeURIComponent(paramsURL.get('q'));
}

function checkLinks(event) {
	if(event.target.tagName === 'A' && event.target.href.includes('redirect')) {
		event.preventDefault();
		event.target.href = removeRedirectLink(event.target.href);
	}
}
document.body.addEventListener('click', checkLinks);