var timestamp = [],
	linkPosition = 0,
	switchesIncluded = false;

function playlistPodcasts() {

	var classButton = 'comment-playlist';

	// html кнопки
	var bindPlaylistButt = `<span class="${classButton}">Связать плейлист</span>`;

	// добавление кнопки "связать плейлист"
	$('.comment-thread-renderer:not(.comment-thread-playlist)')
		.addClass('comment-thread-playlist')
		.children('.comment-renderer').find('span[role=radiogroup]').addClass('comment-renderer-reply comment-radiogroup').after(bindPlaylistButt);

	$('body').on('click', `.${classButton}`, function() {
		var $this = $(this),
			commContent = $this.parents('.comment-renderer-content');

		// заполняем ссылки на временные метки
		fillTimestamp(commContent);

		if( !timestamp.length ) {
			$this
				.removeClass(`${classButton}`).addClass(`${classButton}--nolist`)
				.text('Плейлист не обнаружен');

			return false;
		}

		// добавляем кнопки в плеер
		if( !switchesIncluded ) addButtonPlayer();

		// меняем статус кнопки
		$(`.${classButton}--active`)
			.addClass(`${classButton}`).removeClass(`${classButton}--active`)
			.text('Связать плейлист');
		$this
			.removeClass(`${classButton}`).addClass(`${classButton}--active`)
			.text('Плейлист связан');

		// очищаем текст комментария от лишних символов
		var textComment = commContent.find('.comment-renderer-text-content');
		deletesCharacters(textComment);

		// разворачиваем полностью комментарий
		commContent.find('.read-more').trigger('click');
		commContent.find('.comment-renderer-text-content').addClass('expanded');
	});

	function fillTimestamp(commContent) {
		// берем все ссылки из поста
		var $linksComment = commContent.find('.spf-link');
		// очищаем от старых ссылок
		timestamp = [];
		// отбираем только ссылки временных меток и заполняем массив
		$linksComment.each(function(i, dom) {
			if(dom.innerText.search(/^\d{2}(:\d{2}){1,2}$/i) != -1) {
				timestamp.push(dom);
			}
		});
	}

	function addButtonPlayer() {
		var iconSvgRewind = '<svg version="1.1" viewBox="-25 -30 115 115" width="100%" height="100%"><path d="M56.461,8.625c-0.333-0.172-0.73-0.145-1.036,0.069L29,27.277V9.5c0-0.373-0.208-0.716-0.539-0.888  c-0.333-0.172-0.731-0.146-1.036,0.07l-27,19C0.158,27.869,0,28.175,0,28.5s0.158,0.631,0.425,0.817l27,19  C27.597,48.439,27.798,48.5,28,48.5c0.157,0,0.315-0.037,0.461-0.112C28.792,48.216,29,47.873,29,47.5V29.723l26.425,18.583  c0.172,0.12,0.373,0.182,0.575,0.182c0.157,0,0.315-0.037,0.461-0.112C56.792,48.203,57,47.86,57,47.487V9.513  C57,9.14,56.792,8.797,56.461,8.625z" fill="#FFFFFF"></path></svg>',
			controls = $('.ytp-left-controls'),
			rewindButt = controls.find('.ytp-prev-button').clone().html(iconSvgRewind).removeClass('ytp-prev-button').addClass('ytp-rewind'),
			rewindPrevButt = rewindButt.clone().addClass('ytp-rewindprev-button'),
			rewindNextButt = rewindButt.clone().addClass('ytp-rewindnext-button');

		controls
			.children().eq(0).after(rewindPrevButt)
			.siblings().eq(1).after(rewindNextButt);

		rewindPrevButt.on('click', function() {
			console.log('rewindPrevButt');
		});
	}

	function deletesCharacters(textComment) {
		textComment.html(function(index, value) {
			return value.replace(/°/g, '');
		});
	}
}
playlistPodcasts();

function switchPlaylist(e) {

	function switchTimestamp() {
		$(timestamp).removeClass('spf-link--active');
		timestamp[linkPosition].classList.add('spf-link--active');
		timestamp[linkPosition].click();
	}

	e.preventDefault();
}

// выбираем целевой элемент
var target = document.querySelector('#watch-discussion');
// создаём экземпляр MutationObserver
var observer = new MutationObserver(function(mutations) {
	setTimeout(playlistPodcasts, 300);
	console.log(true);
});
// конфигурация нашего observer:
var config = { childList: true, subtree: true };
// передаём в качестве аргументов целевой элемент и его конфигурацию
observer.observe(target, config);



/*
**
** Стили для сайта
**
*/
var style = document.createElement('link');

style.href = '//vlkh.pp.ua/customFeatures/css/youtube.css';
style.rel = 'stylesheet';
document.head.appendChild(style);


// window.addEventListener('load', function() {

// 	var timestamp = [],
// 		linkPosition = 0;

// 	function playlistPodcasts() {
// 		// Добавление кнопки "связать плейлист"
// 		var bindPlaylistButt = '<span class="comment-playlist">Связать плейлист</span>';
// 		$('.comment-thread-renderer > .comment-renderer span[role=radiogroup]')
// 			.addClass('comment-renderer-reply comment-radiogroup')
// 			.after(bindPlaylistButt);


// 		function fillTimestamp($this, commContent) {
// 			// берем все ссылки из поста
// 			var $linksComment = commContent.find('.spf-link');
// 			// очищаем от старых ссылок
// 			timestamp = [];
// 			// отбираем только ссылки временных меток и заполняем массив
// 			$linksComment.each(function(i, dom) {
// 				if(dom.innerText.search(/^\d{2}:\d{2}$/i) != -1) {
// 					timestamp.push(dom);
// 				}
// 			});
// 		}

// 		$('body').on('click', '.comment-playlist', function() {
// 			var $this = $(this),
// 				commContent = $this.parents('.comment-renderer-content');
// 			// заполняем ссылки на временные метки
// 			fillTimestamp($this, commContent);

// 			$('.comment-playlist--active').addClass('comment-playlist').removeClass('comment-playlist--active').text('Связать плейлист');
// 			$this.removeClass('comment-playlist').addClass('comment-playlist--active').text('Плейлист связан');

// 			// вешаем обработчик на кнопки ибо уже есть ссылки на timestamp
// 			document.body.onkeypress = switchPlaylist;
// 			// разворачиваем полностью комментарий
// 			commContent.find('.read-more').trigger('click');
// 			commContent.find('.comment-renderer-text-content').addClass('expanded');
// 		});
// 	}
// 	playlistPodcasts();

// 	function switchPlaylist(e) {
// 		switch(e.keyCode) {
// 			case 176: // кнопка "следующий трек"

// 				if(linkPosition + 1 > timestamp.length - 1) {
// 					break;
// 				} else {
// 					linkPosition++;
// 				}
// 				console.log(linkPosition);

// 				switchTimestamp();

// 				break;

// 			case 177: // кнопка "предыдущий трек"

// 				if(linkPosition - 1 < 0) {
// 					break;
// 				} else {
// 					linkPosition--;
// 				}
// 				console.log(linkPosition);

// 				switchTimestamp();

// 				break;

// 			default: break;
// 		}

// 		function switchTimestamp() {
// 			$(timestamp).removeClass('spf-link--active');
// 			timestamp[linkPosition].classList.add('spf-link--active');
// 			timestamp[linkPosition].click();
// 		}

// 		e.preventDefault();
// 	}

// 	// выбираем целевой элемент
// 	var target = document.querySelector('#watch-discussion');
// 	// создаём экземпляр MutationObserver
// 	var observer = new MutationObserver(function(mutations) {
// 		setTimeout(playlistPodcasts, 300);
// 		console.log(true);
// 	});
// 	// конфигурация нашего observer:
// 	var config = { childList: true };
// 	// передаём в качестве аргументов целевой элемент и его конфигурацию
// 	observer.observe(target, config);

// });


// window.addEventListener('load', function() {
// 	var style = document.createElement('style');

// 	var styleCnt = '' +
// 		'	.comment-playlist {						' +
// 		'		color: #555;						' +
// 		'		opacity: 0.75;						' +
// 		'		cursor: pointer;					' +
// 		'	}										' +
// 		'	.comment-playlist:hover {				' +
// 		'		opacity: 1;							' +
// 		'	}										' +
// 		'	.comment-playlist--active {				' +
// 		'		color: #128ee9;						' +
// 		'		opacity: 1;							' +
// 		'	}										' +
// 		'	.spf-link--active {						' +
// 		'		font-size: 1.3em;					' +
// 		'		text-decoration: underline;			' +
// 		'	}										' +
// 		'											' +
// 		'';

// 	style.rel = 'stylesheet';
// 	style.innerText = styleCnt;

// 	document.head.appendChild(style);
// });



/*
**
** Автодобавление
**
*/