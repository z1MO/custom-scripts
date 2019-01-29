/*
**
** Добавляем ссылки на сообщества в левое меню
**
*/
function insertAfter(elem, refElem) {
	return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

const lCommLast = [...document.querySelectorAll('.l_comm')].pop();
const newGroups = [
	{
		name: 'EDM People',
		link: '/edm_people'
	},
	{
		name: 'Speeeedy Blog',
		link: '/speeeedy'
	},
	{
		name: 'FHSD',
		link: '/futurehouse5'
	}
];

newGroups.reverse().forEach(group => {
	var newElem = document.createElement('li');

	newElem.classList.add('l_comm');
	newElem.setAttribute('id', `l_mg-${group.link}`);
	newElem.innerHTML = `
		<a href="${group.link}" onclick="return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});" class="left_row">
			<span class="left_fixer">
				<span class="left_icon fl_l"></span>
				<span class="left_label inl_bl">${group.name}</span>
			</span>
		</a>
		<div class="left_settings" onclick="menuSettings(1)">
			<div class="left_settings_inner"></div>
		</div>
	`;

	insertAfter(newElem, lCommLast);
});