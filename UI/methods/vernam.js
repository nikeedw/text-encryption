export function vernamEncrypt(text, key) {
	const keyLength = key.length;
	let keyIndex = 0;
	let encryptedText = '';

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		let encryptedCharCode;

		if (char.match(/[A-Z]/)) {
			const charCode = char.charCodeAt(0) - 65;
			const keyCode = key.charCodeAt(keyIndex % keyLength) - 65;
			encryptedCharCode = (charCode + keyCode) % 26 + 65;
			keyIndex++;
		} else {
			encryptedCharCode = char.charCodeAt(0); 
		}

		encryptedText += String.fromCharCode(encryptedCharCode);
	}
	return encryptedText;
}

export function vernamDecrypt(text, key) {
	const processedKey = key.replace(/\s/g, '');
	let decryptedText = '';
	let keyIndex = 0;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (char.match(/[A-Z]/)) {
			let charCode = char.charCodeAt(0) - 65;
			let keyCode = processedKey.charCodeAt(keyIndex % processedKey.length) - 65;
			const decryptedCharCode = (charCode - keyCode + 26) % 26;
			decryptedText += String.fromCharCode(decryptedCharCode + 65);
			keyIndex++;
		} else {
			decryptedText += char;
		}
	}
	return decryptedText;
}