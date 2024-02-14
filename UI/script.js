import { encryptCesar } from "./methods/cesar.js";
import { decryptCesar } from "./methods/cesar.js";
import { encryptVigenere } from "./methods/viginere.js";
import { decryptVigenere } from "./methods/viginere.js";
import { vernamEncrypt } from "./methods/vernam.js";
import { vernamDecrypt } from "./methods/vernam.js";

document.getElementById('submitButton').addEventListener('click', function () {
	const textInput = document.getElementById('textInput').value;
	const operation = document.getElementById('operation').value;
	const method = document.getElementById('method').value;
	let keyInput = document.getElementById('keyInput').value;

	// Замена всех пробелов в ключе на букву "A"
	keyInput = keyInput.replace(/\s/g, 'A');

	let result;
	try {
		if (method === 'cesar') {
			const shift = parseInt(document.getElementById('keyInput').value);
			if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
				throw new Error('Shift must be a number between 1 and 25.');
			}
			result = operation === 'encrypt' ? encryptCesar(textInput, shift) : decryptCesar(textInput, shift);
		} else if (method === 'vigenere') {
			const keyword = keyInput.toUpperCase();
			if (!/^[A-Z]+$/.test(keyword)) {
				throw new Error('Keyword must contain letters only.');
			}
			result = operation === 'encrypt' ? encryptVigenere(textInput.toUpperCase(), keyword) : decryptVigenere(textInput.toUpperCase(), keyword);
		} else if (method === 'vernam') {
			if (!/^[A-Z]+$/.test(keyInput) || keyInput.length !== textInput.length) {
				throw new Error('Key must contain letters only and have the same length as the text.');
			}
			result = operation === 'encrypt' ? vernamEncrypt(textInput.toUpperCase(), keyInput) : vernamDecrypt(textInput.toUpperCase(), keyInput);
		}

		document.getElementById('output').textContent = result;
	} catch (error) {
		document.getElementById('output').textContent = error.message;
	}
});