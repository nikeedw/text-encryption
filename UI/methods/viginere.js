export function encryptVigenere(text, keyword) {
	if (keyword.length > text.length) {
		throw new Error('Ключ должен быть либо меньше, либо равным длине исходного текста');
	}

	let encryptedText = '';
	let keywordIndex = 0;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (char.match(/[a-z]/i)) {
			const isUpperCase = char === char.toUpperCase();
			const baseCharCode = isUpperCase ? 65 : 97;
			const keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length) - 65;
			const charCode = char.charCodeAt(0);
			const encryptedCharCode = (charCode - baseCharCode + keywordCharCode) % 26 + baseCharCode;
			encryptedText += String.fromCharCode(encryptedCharCode);
			keywordIndex++;
		} else {
			encryptedText += char;
		}
	}
	return encryptedText;
}

export function decryptVigenere(text, keyword) {
	if (keyword.length > text.length) {
		throw new Error('Ключ должен быть либо меньше, либо равным длине исходного текста');
	}

	let decryptedText = '';
	let keywordIndex = 0;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (char.match(/[a-z]/i)) {
			const isUpperCase = char === char.toUpperCase();
			const baseCharCode = isUpperCase ? 65 : 97;
			const keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length) - 65;
			const charCode = char.charCodeAt(0);
			const decryptedCharCode = (charCode - baseCharCode - keywordCharCode + 26) % 26 + baseCharCode;
			decryptedText += String.fromCharCode(decryptedCharCode);
			keywordIndex++;
		} else {
			decryptedText += char;
		}
	}
	return decryptedText;
}
