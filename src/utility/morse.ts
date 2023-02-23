const characters : Record<string, number[]> =  {
	"a":[1,2],
	"b":[2,1,1,1],
	"c":[2,1,2,1],
	"d":[2,1,1],
	"e":[1],
	"f":[1,1,2,1],
	"g":[2,2,1],
	"h":[1,1,1,1],
	"i":[1,1],
	"j":[1,2,2,2],
	"k":[2,1,2],
	"l":[1,2,1,1],
	"m":[2,2],
	"n":[2,1],
	"o":[2,2,2],
	"p":[1,2,2,1],
	"q":[2,2,1,2],
	"r":[1,2,1],
	"s":[1,1,1],
	"t":[2],
	"u":[1,1,2],
	"v":[1,1,1,2],
	"w":[1,2,2],
	"x":[2,1,1,2],
	"y":[2,1,2,2],
	"z":[2,2,1,1],
	"0":[2,2,2,2,2],
	"1":[1,2,2,2,2],
	"2":[1,1,2,2,2],
	"3":[1,1,1,2,2],
	"4":[1,1,1,1,2],
	"5":[1,1,1,1,1],
	"6":[2,1,1,1,1],
	"7":[2,2,1,1,1],
	"8":[2,2,2,1,1],
	"9":[2,2,2,2,1],
	".":[1,2,1,2,1,2],
	",":[2,2,1,1,2,2],
	"?":[1,1,2,2,1,1],
	"'":[1,2,2,2,2,1],
	"/":[2,1,1,2,1],
	"(":[2,1,2,2,1],
	")":[2,1,2,2,1,2],
	":":[2,2,2,1,1,1],
	"=":[2,1,1,1,2],
	"+":[1,2,1,2,1],
	"-":[2,1,1,1,1,2],
	'"':[1,2,1,1,2,1],
	"@":[1,2,2,1,2,1],
	"$":[1,1,1,2,1,1,2],
	"_":[1,1,2,2,1,2],
	";":[2,1,2,1,2,1],
	"&":[1,2,1,1,1],
	"!":[2,1,2,1,2,2],
	"#":[1,2,1,2,1,1],
	" ":[0],
};
export const createMorse = function(input: string){
	const lower = input.toLowerCase();
	let morse: number[] = [];
	for (var i=0,len=lower.length;i<len;i++){
		if (characters[lower[i]]){
			morse = morse.concat(characters[lower[i]]);
		}
		if (i<lower.length-1 && morse.length > 0 && morse[morse.length-1] != 0){
			morse.push(0);
		}
	}
	return morse;
}
export const fromMorse = function(input: number[]){
	let toCharacter: Record<string, string> = {};
	for (var c in characters){
		let str = "";
		for (var j=0,len=characters[c].length;j<len;j++){
			str += characters[c][j];
		}
		toCharacter[str] = c;
	}
	let output: string = "";
	let currentString: string = "";
	for (var i=0,len=input.length;i<len;i++){
		if (input[i] == 0){
			if (currentString.length == 0){
				output += " ";
			}
			else if (toCharacter[currentString]){
				output += toCharacter[currentString];
			}
			else {
				output += "?";
			}
			currentString = "";
		}
		else {
			currentString += input[i];
		}
	}
	output = output.replace(/[ ]{2,}/g," ");
	return output;
}
export const fromMorseProgress = function(morse: number[],progress: boolean[],maxmorse: number,word: string){
	let pidx = 0;
	let output = [];
	let mlen = morse.length;
	if (maxmorse < morse.length && maxmorse >= 0){
		mlen = 0;
		for (var i=maxmorse;i>=0;i--){
			if (morse[i] == 0){
				mlen = i+1;
				break;
			}
		}
	}
	for (var i=0;i<mlen;i++){
		if (morse[i] == 0){
			output.push(0);
		}
		else if (morse[i] == 1){
			if (pidx < progress.length && progress[pidx]){
				output.push(1);
			}
			else {
				output.push(0);
			}
			pidx++;
		}
		else if (morse[i] == 2){
			let m = 0;
			if (pidx < progress.length && progress[pidx]){
				m++;
			}
			pidx++;
			if (pidx < progress.length && progress[pidx]){
				m++;
			}
			pidx++;
			output.push(m);
		}
		
	}
	let lowerWord = fromMorse(output);
	let out = "";
	for (var i=0;i<Math.min(word.length,lowerWord.length);i++){
		let char = word[i];
		if (char !== char.toLowerCase() && char === char.toUpperCase()){
			out += lowerWord[i].toUpperCase();
		}
		else {
			out += lowerWord[i];
		}
	}
	for (var i=word.length;i<lowerWord.length;i++){
		out += lowerWord[i];
	}
	return out;
	
}