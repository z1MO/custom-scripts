/*
**
** Избранные каналы
** (когда нибудь перенесу в отдельный файл-класс)
**
*/
const favoriteChannels = [
	{
		name: 'Monstercat: Uncaged',
		id: 'UCJ6td3C9QlPO9O_J5dF4ZzA'
	},
	{
		name: 'Spinnin\' Records',
		id: 'UCpDJl2EmP7Oh90Vylx0dZtA'
	},
	{
		name: 'Trap Nation',
		id: 'UCa10nxShhzNrCE1o2ZOPztg'
	},
	{
		name: 'Chill Nation',
		id: 'UCM9KEEuzacwVlkt9JfJad7g'
	},
	{
		name: 'Indie Nation',
		id: 'UCS34YVeqtFViWRB3jc3o2FQ'
	},
	{
		name: 'House Nation',
		id: 'UCj_Y-xJ2DRDGP4ilfzplCOQ'
	},
	{
		name: 'Mike Tompkins',
		id: 'UCYEnCCeFBCbrlmuNVzs21LQ'
	},
	{
		name: 'Revealed Recordings',
		id: 'UCnhHe0_bk_1_0So41vsZvWw'
	},
	{
		name: 'AirwaveMusicTV',
		id: 'UCwIgPuUJXuf2nY-nKsEvLOg'
	},
	{
		name: 'Proximity',
		id: 'UC3ifTl5zKiCAhHIBQYcaTeg'
	},
	{
		name: 'MrSuicideSheep',
		id: 'UC5nc_ZtjKW1htCVZVRxlQAQ'
	},
	{
		name: 'Oliver Heldens',
		id: 'UC-EVnno6x6-aAG6g1ZVoN3A'
	},
	{
		name: 'Hardwell',
		id: 'UCPT5Q93YbgJ_7du1gV7UHQQ'
	},
	{
		name: 'SuicideSheeep',
		id: 'UCLTZddgA_La9H4Ngg99t_QQ'
	},
	{
		name: 'Superior Tracks',
		id: 'UChtp2LyTC7GklMDzgsw3pfw'
	},
	{
		name: 'Future House Music',
		id: 'UCXvSeBDvzmPO05k-0RyB34w'
	},
	{
		name: 'NoCopyrightSounds',
		id: 'UC_aEa8K-EOJ3D6gOs7HcyNg'
	},
	{
		name: 'Selected.',
		id: 'UCFZ75Bg73NJnJgmeUX9l62g'
	},
	{
		name: 'Illumi Music',
		id: 'UCXarSAuECvnQFBb1vMcMsjQ'
	},
	{
		name: 'Future House Cloud',
		id: 'UCO0sfpPwj3PGVVH_jiqBA6A'
	}
];


/*
**
** Подгрузка модулей
**
*/
const modules = [
	// {
	// 	src: '//apis.google.com/js/api.js',
	// 	onload: `this.onload=function(){};gapi.load('client:auth2');`
	// },
	'mutationElems.js',
	'utils.js',
	// 'favoriteChannels.js',
	'changeTitleVideo.js?v=1.5.2',
	'saveMusicToWLPlaylist.js?v=2.01',
	'removeRedirect.js?v=2',
	'editFieldSearchForStreamVideo.js?v=1.1',
	'controlsTracklist.js?v=2.6',
	'other.js',
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

function addingModulesToPage() {
	for (let i = 0; i < modules.length; i++) {
		dynamicallyLoadScript(modules[i]);
	}
}

if(window.location.pathname === '/watch') {
	setTimeout(addingModulesToPage, 1000);
} else {
	addingModulesToPage();
}



/*
**
** Подгрузка стилей
**
*/
const style = document.createElement('link');
const timeStamp = +new Date();

style.charset = 'utf-8';
style.href = `//vlkh.pp.ua/custom-scripts/${nameSite}/css/index.css?v=${timeStamp}`;
style.rel = 'stylesheet';

document.head.appendChild(style);