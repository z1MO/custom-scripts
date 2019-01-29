/*
**
** Скрытие верхней панели iframe в просмотре документов
**
*/
if(window.location.pathname.indexOf('doc') != -1) {
	$('.iframe').css('padding-top', 0);
}