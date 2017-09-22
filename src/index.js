module.exports = function check(str, bracketsConfig) {

	if (str.length%2) return false;

	let strArr = str.split('');
	let bracketsOpen = []; 
	let bracketsClose = [];

	function searchFirstClosedBracket(beginPos, arr, arrClose) {
		for (let i=beginPos; i<arr.length; i++) {
			if (arrClose.indexOf(arr[i]) !== -1) return i;
		}
	}

	function checkBracketsPair(openBracket, closeBracket, arr) {
		for (let i=0; i<arr.length; i++) {
			if (arr[i][0] === openBracket && arr[i][1] === closeBracket) return true;		
		}
		return false;
	}

	bracketsConfig.forEach((item) => {
		bracketsOpen.push(item[0]);
		bracketsClose.push(item[1]);
	});

	for (let i=0; i<strArr.length; i++) {
		let beginBracket = strArr[i];
		if (beginBracket === null) continue;
		if (bracketsOpen.indexOf(beginBracket) === -1) return false;

		let currentClose = searchFirstClosedBracket(i, strArr, bracketsClose);
		let checkedBracket = strArr[2*currentClose-i-1];

		if (!checkBracketsPair(beginBracket, checkedBracket, bracketsConfig)) return false;

		strArr[i] = null;
		strArr[2*currentClose-i-1] = null;
	}

	strArr.forEach((item) => {
		if (item !== null) return false;
	});

	return true;
	

  
   /* for (let i=0; i<bracketsConfig.length; i++) {



	    let sign1 = bracketsConfig[i][0];
	    let sign2 = bracketsConfig[i][1];
	    let reg = new RegExp("(\\" 
	  	        + sign1 
	  	        + "+(\.{0}|\.{2,})\\" 
	  	        + sign2 
	  	        + "+)+");

	    if(!reg.test(str)) return false;

	    let regErr = new RegExp("(\\" 
	  	        + sign2 
	  	        + "+\\" 
	  	        + sign1 
	  	        + "+)+");

	    if(regErr.test(str)) return false;
    }

    return true;*/
  /*let rez = str.match(reg);
  if (rez === str) return true;
  return false;*/
}
