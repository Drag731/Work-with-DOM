var falseArray = [false, undefined, 'null', '\"\"', 0, NaN];
var parentElem = document.body;
var table = document.createElement('table');
var table2 = document.createElement('table');

parentElem.insertBefore(table, parentElem.children[0]);
parentElem.insertBefore(table2, parentElem.children[1]);

for (var i = 0; i < (falseArray.length+1); i += 1) {
	var tr = document.createElement('tr');
	table.appendChild(tr);
	table.classList.add('table');
	for(var j = 0; j < (falseArray.length+1); j += 1) {
		var td = document.createElement('td');
		tr.appendChild(td);
	}
}

for (var i = 0; i < (falseArray.length+1); i += 1) {
	var tr = document.createElement('tr');
	table2.appendChild(tr);
	table2.classList.add('table2');
	for(var j = 0; j < (falseArray.length+1); j += 1) {
		var td = document.createElement('td');
		tr.appendChild(td);
	}
}

table.rows[0].cells[0].innerHTML = '==';
table2.rows[0].cells[0].innerHTML = '===';


for (var i = 1, j = 0; i < (falseArray.length +1); i++, j++) {
	table.rows[0].cells[i].innerHTML = falseArray[j];
	table2.rows[0].cells[i].innerHTML = falseArray[j];

	table.rows[0].cells[i].classList.add('th');
	table2.rows[0].cells[i].classList.add('th');

	table.rows[i].cells[0].innerHTML = falseArray[j];
	table2.rows[i].cells[0].innerHTML = falseArray[j];

	table.rows[i].cells[0].classList.add('th');
	table2.rows[i].cells[0].classList.add('th');
};




for (var i = 1, k = 0; i < (falseArray.length+1); i += 1, k++) {
	for (var j = 1; j < (falseArray.length +1); j++) {
		table.rows[i].cells[j].innerHTML = falseArray[k]==falseArray[j-1];
		table2.rows[i].cells[j].innerHTML = falseArray[k]===falseArray[j-1];

		if(falseArray[j-1] === 'null') {
			table.rows[i].cells[j].innerHTML = falseArray[k]==null;
			if(falseArray[k] === 'null') {
				table.rows[i].cells[j].innerHTML = null==null;
			} else if (falseArray[k] === '\"\"') {
				table.rows[i].cells[j].innerHTML = 0==null;
			}
			continue;
		}
		if(falseArray[j-1] === '\"\"') {
			table.rows[i].cells[j].innerHTML = falseArray[k]==0;
			if(falseArray[k] === '\"\"') {
				table.rows[i].cells[j].innerHTML = 0==0;
			} else if (falseArray[k] === 'null') {
				table.rows[i].cells[j].innerHTML = null==0;
			}
			continue;
		}
		if(falseArray[k] === 'null') {
			table.rows[i].cells[j].innerHTML = null==falseArray[j-1];
			if(falseArray[j-1] === 'null') {
				table.rows[i].cells[j].innerHTML = null==null;
			} else if (falseArray[j-1] === '\"\"') {
				table.rows[i].cells[j].innerHTML = null==0;
			}
			continue;
		}
		if(falseArray[k] === '\"\"') {
			table.rows[i].cells[j].innerHTML = 0==falseArray[j-1];
			if(falseArray[j-1] === 'null') {
				table.rows[i].cells[j].innerHTML = 0==null;
			} else if (falseArray[j-1] === '\"\"') {
				table.rows[i].cells[j].innerHTML = 0==0;
			}
			continue;
		}
	};
}

// // the first variant of the event handler
table.addEventListener('click' , showIndex);
table2.addEventListener('click' , showIndex);

function showIndex(event) {
  var target = event.target;

  if (target.tagName != 'TD') return;

  alert('\"' + event.target.parentElement.rowIndex + ' ' + event.target.cellIndex + '\"');
};

// the second variant of the event handler
// tableChildNodes = table.childNodes;
// table2ChildNodes = table2.childNodes;

// for (var i = 0; i < tableChildNodes.length; i++) {
// 	tableChildNodes[i].addEventListener('click' , showIndex);
// 	table2ChildNodes[i].addEventListener('click' , showIndex);
// }

// function showIndex(event) {
// 	alert('\"' + event.currentTarget.rowIndex + ' ' + event.target.cellIndex + '\"');
// }