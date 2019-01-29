/*
** Подгрузка модулей
*/
const modules = [
	'autoSubscr.js',
	'locationInGoogleMaps.js'
];

for (let i = 0; i < modules.length; i++) {
	let tagModule = document.createElement('script');

	tagModule.charset = 'utf-8';
	tagModule.src = `//vlkh.pp.ua/customFeatures/instagram/js/${modules[i]}`;
	document.head.appendChild(tagModule);
}

/*
** Подгрузка стилей
*/
let style = document.createElement('link');
const timeStamp = +new Date();

style.charset = 'utf-8';
style.href = '//vlkh.pp.ua/customFeatures/instagram/css/index.css?v=' + timeStamp;
style.rel = 'stylesheet';
document.head.appendChild(style);