// Создание слежки за элементами
function mutationElems(targets, callbacks, config) {
	let stackMutations = [];

	for(let i = 0; i < targets.length; i++) {
		stackMutations.push(mutationElem(targets[i], callbacks, config));
	}

	return stackMutations;
}
// Создание слежки за элементом
/*
	Это для того, чтобы в коллбек можно передать несколько отдельных функций
	и сам коллбек запускался только на последней мутации (например, ВК изменяет страницу несколько раз во время полной загрузки)
*/
function mutationElem(target, callbacks, config) {

	var timer, // переменная для записи setTimeout в MutationObserver
		observer = new MutationObserver(observerCallback); // создаём экземпляр MutationObserver

	var exeptionsClasses = [
		'_count',
		'replies',
		// 'audio'
	];

	function observerCallback(mutations) {
		// если класс измененного элемента находится в списке запрещённых - отключаем коллбеки
		if(!config.skipClassCheck) {
			for(var i in mutations) {
				var mutation = mutations[i];

				for(var j in exeptionsClasses) {
					var classList = mutation.target.classList.value;

					if(classList.indexOf(exeptionsClasses[j]) != -1) {
						return false;
					}
				}
			}
		}

		//console.log(mutations);

		// если существует таймер — уничтожаем, чтобы раньше времени не запустить коллбеки (таймер запустится, когда мутации закончаться)
		if(timer) clearTimeout(timer);

		timer = setTimeout(function() {
			switch(callbacks.constructor.name) {
				case 'Function':
					callbacks();
					break;
				case 'Array':
					for(var i = 0; i < callbacks.length; i++) {
						callbacks[i](mutations);
					}
					break;
				default: break;
			}
		}, 500);
	}

	observer.observe(target, config);

	return observer;
}