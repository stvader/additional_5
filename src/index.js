module.exports = function check(str, bracketsConfig) {
	let configObj = {};
	//let strArr = str.split('');
	let stack = [];


	if (str.length%2) return false;

	for (let i=0; i<bracketsConfig.length; i++) {
		let bracketPair = bracketsConfig[i];
		let openedBracket = bracketPair[0];
		configObj[openedBracket] = {};
		configObj[openedBracket].closedBracket = bracketPair[1];
		if (openedBracket === bracketPair[1]) {
			configObj[openedBracket].isEqualBrackets = true;
			configObj[openedBracket].isInStack = false;
		} else {
			configObj[openedBracket].isEqualBrackets = false;
		}
	}

	for (let i=0; i<str.length; i++) {
		let currentBracket = str[i];
		let lastBracket;
		let sameFlag = false;

		if (configObj.hasOwnProperty(currentBracket)
			&& (!configObj[currentBracket].isEqualBrackets 
				|| (configObj[currentBracket].isEqualBrackets 
					&& !configObj[currentBracket].isInStack))) {
			stack.push(currentBracket);
		    if (configObj[currentBracket].isEqualBrackets) {
		    	configObj[currentBracket].isInStack = !configObj[currentBracket].isInStack;
		    }
			
		} else {
			if (stack.length === 0) return false;

			lastBracket = stack[stack.length-1];
			if(currentBracket !== configObj[lastBracket].closedBracket) return false;
			if (configObj[lastBracket].isEqualBrackets) {
		    	configObj[lastBracket].isInStack = !configObj[lastBracket].isInStack;
		    }
			stack.pop();
		}
	}

	if (stack.length !== 0) return false;	
  
	return true;  
}
