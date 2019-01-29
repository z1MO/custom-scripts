/*
**
** Обход ссылок-ловушек на соц.сети
**
*/
function bypassLinksTraps() {
	console.log('Run "bypassLinksTraps" script');

	var links = document.querySelectorAll('#profile #wide_column a:not(.link-checked)');

	if(!links.length) return false;

	var services = {
		'ask.fm': 'askfm',
		'instagram.com': 'instgram',
		'twitter.com': 'twiter',
		'sprashivai.ru': ['sparshivai', 'sprashevai', 'sprashivaii', 'sprashlvai'],
		'facebook.com': 'facebock',
		'askbook.me': 'askbook'
	};

	for(var i = 0, link, fakeDomain; i < links.length; i++) { // проход по всем найденным ссылкам
		link = links[i];

		for(var realDomain in services) { // проход по фейковым доменам
			fakeDomain = services[realDomain];

			switch(typeof fakeDomain) {
				case 'string':
					checkLink(link, fakeDomain, realDomain);
					break;

				case 'object':
					for(var j = 0; j < fakeDomain.length; j++) {
						checkLink(link, fakeDomain[j], realDomain);
					}
					break;

				default: break;
			}
		}
	}

	function checkLink(link, fakeDomain, realDomain) {
		if(link.href.indexOf(fakeDomain) > -1) {
			link.href = link.href.replace( new RegExp(fakeDomain + '.[a-zа-я]{2,3}'), realDomain );
			link.innerText += ' ✓';
		}

		link.classList.add('link-checked');
	}
}
bypassLinksTraps();

/*
** Установка слежки
*/
mutationElems(document.querySelectorAll(globElemsMutation), bypassLinksTraps, {childList: true});