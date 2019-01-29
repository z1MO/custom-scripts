
/*
**
** Смена логики кнопки "Перейти к сообщению" (к другому сообщению)
**
*/

const linkToMessage = document.querySelectorAll('.postcolor a[title="Перейти к сообщению"]');

linkToMessage.forEach(butt => {
	butt.removeAttribute('target');
	butt.addEventListener('click', scrollToMessage);
});

function scrollToMessage(e) {
	const thisMessageID = findAncestor(e.target, 'ipbtable').getAttribute('data-post');
	const linkToMessage = e.target.tagName === 'IMG' ? e.target.parentElement.href : e.target.href;
	const toMessageID = new URLSearchParams(linkToMessage).get('pid');
	const postNode = document.querySelector(`table[data-post="${toMessageID}"]`);

	// Помечаем для истории браузера сообщение, чтобы можно было вернуться по ветке ответов
	window.location.hash = 'entry' + thisMessageID;

	if(postNode) {
		e.preventDefault(); // Отменяем стандартное поведение ссылки
		window.location.hash = 'entry' + toMessageID; // Переходим к сообщению
	}
}

function findAncestor(elem, desiredClass) {
	while(elem = elem.parentElement) {
		if(elem.classList.contains(desiredClass)) break;
	}
	return elem;
}