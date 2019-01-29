
/*
** Подгрузка модулей
*/
const modules = [
	'sortingSearch.js',
	'scrollToMessage.js?v=1.2'
];

for (let i = 0; i < modules.length; i++) {
	let tagModule = document.createElement('script');

	tagModule.charset = 'utf-8';
	tagModule.src = `//vlkh.pp.ua/customFeatures/4pda/js/${modules[i]}`;
	document.head.appendChild(tagModule);
}

/*
** Подгрузка стилей
*/
let style = document.createElement('link');
const timeStamp = +new Date();

style.charset = 'utf-8';
style.href = '//vlkh.pp.ua/customFeatures/4pda/css/index.css?v=' + timeStamp;
style.rel = 'stylesheet';
document.head.appendChild(style);