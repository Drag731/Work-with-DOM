var city = {
			'Lviv': ['Gorodok', 'Mykolayiv', 'Stryi', 'Zolochiv', 'Yavoriv', 'Zhovkva'],
			'Ivano-Frankivsk': ['Dolyna', 'Kalush', 'Kolomyia', 'Nadvirna'],
			'Ternopil': ['Berezhany', 'Chortkiv', 'Kremenec'],
			'Uzhgorod': ['Khust', 'Mukachevo'],
			'Luck': ['Kovel', 'Shack', 'Volodymyr-Volynskiy'],
			'Rivne': []
}
var amountOfCities = Object.keys(city);
var parentElem = document.body;
var ul = document.createElement('ul');
var amountOfLi;
var outerLinks;

parentElem.insertBefore(ul, parentElem.children[0]);

for (var i = 0; i < amountOfCities.length; i += 1) {
	var li = document.createElement('li');
	var span = document.createElement('span');
	var brackets = ' (' + city[amountOfCities[i]].length + ')';

	li.classList.add('outerLi');

	if(city[amountOfCities[i]].length == 0) {
		brackets = '';
		span.classList.add('empty');
	}

	ul.appendChild(li);
	li.appendChild(span);
	span.appendChild(document.createTextNode(amountOfCities[i] + brackets));
};

amountOfLi = ul.children;

for(var i = 0; i < amountOfLi.length; i += 1) {
	if(city[amountOfCities[i]].length == 0) {
		continue;
	}
	var innerUl = document.createElement('ul');
	innerUl.classList.add('subMenu');
	amountOfLi[i].appendChild(innerUl);
	for(var j = 0; j < city[amountOfCities[i]].length; j += 1) {
		var innerLi = document.createElement('li');
		var span = document.createElement('span');

		innerUl.appendChild(innerLi);
		innerLi.appendChild(span);
		span.appendChild(document.createTextNode(city[amountOfCities[i]][j]));	
	}
}
// the first variant of the event handler
var tree = document.getElementsByTagName('ul')[0];

tree.addEventListener('click' , hiddenSubMenu);

function hiddenSubMenu(event) {
  var target = event.target;

  if (target.tagName != 'SPAN') {
    return;
  }
  if(target.classList.contains("empty") ) {
  	alert('empty');
  }

  var li = target.parentNode;
  var childrenContainer = li.getElementsByTagName('ul')[0];

  if (!childrenContainer) return;

  childrenContainer.classList.toggle('menu-on');
}

// the second variant of the event handler
// outerLinks = document.querySelectorAll('.outerLi>span')

// for (var i = 0; i < outerLinks.length; i++) {
// 	outerLinks[i].addEventListener('click' , hiddenSubMenu)
// }

// function hiddenSubMenu() {
// 	if(this == document.querySelector('.empty')) {
// 		alert('empty');
// 	}
// 	this.classList.toggle('menu-on');
// }