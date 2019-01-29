/*
**
** Кнопка "переголосовать" в опросе
**
*/
function repollButt() {
	console.log('Run "repollButt" script');

	var $postPoll = $('.page_media_poll:not(.page_media_poll--passed)');

	if($postPoll.length) {
		var $this, $pollCode, pollID;

		for(var i = 0; i < $postPoll.length; i++) {
			$this = $postPoll.eq(i);

			if($this.children('.page_poll_options').length == 0) {
				$pollCode = $this.find('.page_poll_code');
				pollID = ( $this.children('input').attr('value') ).split('_')[1];

				$pollCode.before('<a href="//vk.com/repoll#' +pollID+ '" target="_blank" class="fl_r page_poll_code page_poll_repoll" onclick="$(this).text(\'Переголосовано\').css(\'font-weight\', \'bold\');">Переголосовать</a>' +
					'<span class="divider"></span>');
				$this.addClass('page_media_poll--passed');
			}
		}
	}
}
repollButt();

/*
** Установка слежки
*/
mutationElems(document.querySelectorAll(globElemsMutation), repollButt, {childList: true});