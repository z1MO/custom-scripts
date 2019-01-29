/*
**
** Добавление кнопки "найти в вк" для стрима с музыкой
**
*/

function addButtonVKSearch() {
	const searchContainer = document.querySelector('#search-input');
	let buttVKSearch = document.querySelector('.search-in-vk');

	searchContainer.classList.add('add-new-button');

	if(buttVKSearch) {
		return;
	} else {
		buttVKSearch = document.createElement('a');
	};

	buttVKSearch.classList.add('search-in-vk');
	buttVKSearch.classList.add('icon-vk');
	buttVKSearch.setAttribute('target', '_blank');
	buttVKSearch.addEventListener('click', () => {
		const valueInputSearch = document.querySelector('input#search').value;

		buttVKSearch.setAttribute('href', '//vk.com/audio?q=' + encodeURIComponent(valueInputSearch));
	});

	searchContainer.appendChild(buttVKSearch);
}

function removeButtonVKSearch() {
	const searchContainer = document.querySelector('#search-input');

	searchContainer.classList.remove('add-new-button');
}

/*
** Установка слежки за изменением страницы
*/

{
	const titlePage = document.querySelector('title');

	function checkPage() {
		if(titlePage.innerText.toLowerCase().includes('radio')) {
			addButtonVKSearch();
		} else {
			removeButtonVKSearch();
		}
	};
	checkPage();

	const observer = new MutationObserver(checkPage);
	observer.observe(titlePage, { attributes: true, childList: true, characterData: true });
}

