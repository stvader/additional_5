module.exports = function check(str, bracketsConfig) {

	if (str.length%2) return false;

	let strArr = str.split('');
	let bracketsOpen = []; 
	let bracketsClose = [];

	function searchFirstClosedBracket(beginPos, arr, arrClose, arrOpen) {
		for (let i=beginPos+1; i<arr.length; i++) {
			if (arrClose.indexOf(arr[i]) !== -1) {
				if(checkBracketsEqual(arr[i], arrOpen, arrClose)
					&& arr[i] !== arr[beginPos]) {
					return searchFirstClosedBracket(i, arr, arrClose, arrOpen);
				}

				return i;
			}
		}
	}

	function checkBracketsPair(openBracket, closeBracket, arr) {
		for (let i=0; i<arr.length; i++) {
			if (arr[i][0] === openBracket && arr[i][1] === closeBracket) return true;		
		}
		return false;
	}

	function checkBracketsEqual(closeBreak, arrOpen, arrClose) {
		let posCloseArr = arrClose.indexOf(closeBreak);
		if (closeBreak === arrOpen[posCloseArr]) return true;
		return false;
	}

	function getCheckedBracket(current, start) {//arr
		let numberCloseBracket = 2*current-start-1; 
		let checkedBracket = strArr[numberCloseBracket];

		/*if(bracketsOpen.indexOf(checkedBracket)) {
			current = numberCloseBracket;////////
			return getCheckedBracket(current, start);
		}*/

		return numberCloseBracket;
	}

	bracketsConfig.forEach((item) => {
		bracketsOpen.push(item[0]);
		bracketsClose.push(item[1]);
	});

	for (let i=0; i<strArr.length; i++) {
		let beginBracket = strArr[i];
		if (beginBracket === null) continue;
		if (bracketsOpen.indexOf(beginBracket) === -1) return false;

		let currentClose = searchFirstClosedBracket(i, strArr, bracketsClose, bracketsOpen);
		/////

		let checkedNum = getCheckedBracket(currentClose, i);
		let checkedBracket = strArr[checkedNum];

		
		//////

		if (!checkBracketsPair(beginBracket, checkedBracket, bracketsConfig)) return false;

		strArr[i] = null;
		strArr[2*currentClose-i-1] = null;
	}

	strArr.forEach((item) => {
		if (item !== null) return false;
	});

	return true;  
  
}
