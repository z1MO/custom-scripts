/*
**
** Добавление пунктов в меню действий со страницей
**
*/
function pageActions() {
	console.log('Run "pageActions" script');

	// Добавление ссылки на статистику группы
	var $groupActions = $('.page_actions_inner:not(.page_actions_inner--changed)'),
		isProfile = Boolean( $('#profile').length );

	if($groupActions.length) {
		var templateNewLi = '<a href="?" target="_blank" class="page_actions_item ?">?</a>',
			renderNewLi = '';

		var replaceArray = [],
			replaceArrayIndex = 0;

		var pageID = ( $('#page_wall_count_own:last').next().data('post-id') ).split('_')[0].replace('-', '');

		if(isProfile) { // если страница является профилем
			replaceArray.push([`/feed?obj=${pageID}&q=&section=mentions`, 'page_mention_profile', 'Упоминания в новостях']);
			replaceArray.push([`https://www.google.com.ua/search?q=vk.com/id${pageID}&tbs=li:1`, 'page_in_google', 'Упоминание в гугле']);
			replaceArray.push([`https://vlkh.pp.ua/index2.php?page=search&user_id=${pageID}`, 'page_in_vlkhph', 'Поиск фото на влх']);
		} else { // если страница является сообществом
			replaceArray.push([`/stats?gid=${pageID}&act=visitors`, 'page_group_stats', 'Статистика сообщества']);
		}

		replaceArray.forEach(item => {
			renderNewLi += templateNewLi.replace(/\?/g, function() {
				if(replaceArrayIndex > 2) replaceArrayIndex = 0;

				return item[replaceArrayIndex++];
			});
		});

		$groupActions.append(renderNewLi).addClass('page_actions_inner--changed');
	}


	// Изменение ссылки на статистику личной страницы
	var $statsMyPage = $('.page_actions_btn.stats:not(.stats--changed)');

	if($statsMyPage.length) {
		$statsMyPage
			.attr('href', (i, value) => {
				return value + '&act=visitors';
			})
			.addClass('stats--changed');
	}
}
pageActions();

/*
** Установка слежки
*/
mutationElems(document.querySelectorAll(globElemsMutation), pageActions, {childList: true});