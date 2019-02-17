const globElemsMutation = '#page_body, #wrap3, #wrap2, #page_wall_posts';

/*
** Подгрузка модулей
*/
const modules = [
	'mutationElems.js',
	'leftMenu.js?v=1.2',
	'pageActions.js',
	'bypassLinksTraps.js',
	'scrollNextTrack.js?v=1.4',
	'copyNameTrack.js?v=2.5`',
	'viewerDocs.js',
	'skipExtendedTracks.js'
];
const nameSite = window.location.hostname.match(/(www\.)?(\w+)\..+/)[2];


function dynamicallyLoadScript(module) {
	let tagModule = document.createElement('script');

	tagModule.charset = 'utf-8';
	tagModule.async = false;

	if(typeof module === 'object') {
		for(let key in module) {
			tagModule.setAttribute(key, module[key]);
		}
	} else {
		tagModule.src = `//vlkh.pp.ua/custom-scripts/${nameSite}/js/${module}`;
	}

	document.head.appendChild(tagModule);
}

for (let i = 0; i < modules.length; i++) {
	dynamicallyLoadScript(modules[i]);
}

/*
** Подгрузка стилей
*/
const style = document.createElement('link');
const timeStamp = +new Date();

style.charset = 'utf-8';
style.href = `//vlkh.pp.ua/custom-scripts/${nameSite}/css/index.css?v=${timeStamp}`;
style.rel = 'stylesheet';

document.head.appendChild(style);