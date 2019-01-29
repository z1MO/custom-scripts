/*
** Добавление параметра "сначала новые сообщения" в поиск по теме
*/
const input = document.createElement('input');
input.type = 'hidden';
input.name = 'sort';
input.value = 'dd';
input.id = 'last-search-mess';

const forms = document.querySelectorAll('form[name="search"]');

forms.forEach(form => form.appendChild(input.cloneNode(true)));
