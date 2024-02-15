export function encryptCesar(text, shift) {
	return text.split('').map(char => {
		if (char.match(/[a-z]/i)) {
			const code = char.charCodeAt(0);
			const isUpperCase = char === char.toUpperCase();
			const baseCode = isUpperCase ? 65 : 97;
			const shiftedCode = (code - baseCode + shift + 26) % 26 + baseCode;
			return String.fromCharCode(shiftedCode);
		} else {
			return char;
		}
	}).join('');
}

export function decryptCesar(text, shift) {
	const inverseShift = -shift;
	return text.split('').map(char => {
		if (char.match(/[a-z]/i)) {
			const code = char.charCodeAt(0);
			const isUpperCase = char === char.toUpperCase();
			const baseCode = isUpperCase ? 65 : 97;
			const shiftedCode = (code - baseCode + inverseShift + 26) % 26 + baseCode;
			return String.fromCharCode(shiftedCode);
		} else {
			return char;
		}
	}).join('');
}