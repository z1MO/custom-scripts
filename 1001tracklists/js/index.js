function cleaningString(str) {

	const extraWords = [
		/\(Official Music Video\)/,
		/\(Lyric Video\)/,
		/\(Official Lyric Video\)/,
		/\[.+\]/,
		/feat\. /,
		/ft\. /,
		/[x&+]\s/
	];

	for (let word of extraWords) {
		str = str.replace(RegExp(word, 'gi'), '');
	}
	return str.trim();
}

const generateNameTrack = (elem) => {
	return encodeURIComponent(
		cleaningString(
			Array.from(elem.children).reduce((res, current) => {
				return res + current.innerText;
			}, '')
		)
	);
};
const createButton = (nameTrack) => {
	const buttVk = document.createElement('a');
	const buttVkContent = document.querySelector('.tlUserInfo[title="IDer of this track"]').cloneNode(true);
	const linkToVk = 'https://vk.com/audios30486391?q=' + nameTrack;

	buttVkContent.removeAttribute('title');
	buttVkContent.removeAttribute('id');
	buttVkContent.firstElementChild.classList.add('fa-vk');
	buttVkContent.querySelector('.spL > .blueTxt').innerHTML = 'Open this track in VK';
	buttVkContent.querySelector('.tgHid > a').removeAttribute('title');
	buttVkContent.querySelector('.tgHid > a').setAttribute('href', linkToVk);

	buttVk.setAttribute('href', linkToVk);
	buttVk.setAttribute('target', '_blank');
	buttVk.innerHTML = buttVkContent.outerHTML;

	return buttVk;
};

Array.from(document.querySelectorAll('.tlpItem')).forEach((item, i) => {
	const isIDTrack = !Boolean(item.querySelector('meta'));
	if(isIDTrack) return false;

	const nameTrack = cleaningString(item.querySelector('meta[itemprop=name]').getAttribute('content'));
	const newButton = createButton(nameTrack);
	const listButtons = item.querySelector('[id^=tlptrv_]');

	listButtons.insertBefore(newButton, null);
});