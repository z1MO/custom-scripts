/*
 **
 ** Обертка геометки в ссылку на гугл карты
 **
 */
if (location.pathname.includes('explore/locations')) {
	const h1 = document.querySelector('h1');
	const linkMaps = `https://google.com.ua/maps/search/${h1.innerText}`;

	h1.innerHTML = createLink(linkMaps, h1.innerText).outerHTML;

	function createLink(url, text) {
		text = text || url;

		const link = document.createElement('a');

		link.href = url;
		link.target = '_blank';
		link.innerText = text;

		return link;
	}
}