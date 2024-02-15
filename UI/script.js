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
			if (!Number.isInteger(shift) || shift < 0 || shift > 9) {
				throw new Error('Ключ должен содержать только 1 символ 0-9');
			}
			result = operation === 'encrypt' ? encryptCesar(textInput, shift) : decryptCesar(textInput, shift);
		} else if (method === 'vigenere') {
			const keyword = keyInput.toUpperCase();
			if (!/^[A-Z]+$/.test(keyword)) {
				throw new Error('Ключ должен содержать только символы');
			}
			result = operation === 'encrypt' ? encryptVigenere(textInput.toUpperCase(), keyword) : decryptVigenere(textInput.toUpperCase(), keyword);
		} else if (method === 'vernam') {
			if (!/^[A-Z]+$/.test(keyInput) || keyInput.length !== textInput.length) {
				throw new Error('Ключ должен сожержать только буквы и быть одного размера с исходным текстом');
			}
			result = operation === 'encrypt' ? vernamEncrypt(textInput.toUpperCase(), keyInput) : vernamDecrypt(textInput.toUpperCase(), keyInput);
		}

		document.getElementById('output').textContent = result;
	} catch (error) {
		document.getElementById('output').textContent = error.message;
	}
});