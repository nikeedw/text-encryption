// Функция для генерации случайного ключа определенной длины в верхнем регистре
function generateKey(length) {
	const key = [];
	const usedChars = {}; // Объект для отслеживания использованных символов
	for (let i = 0; i < length; i++) {
		let randomCharCode;
		do {
			randomCharCode = Math.floor(Math.random() * 26) + 65; // Случайный код буквы A-Z
		} while (usedChars[randomCharCode]); // Проверяем, использовался ли этот символ
		usedChars[randomCharCode] = true; // Отмечаем символ как использованный
		const char = String.fromCharCode(randomCharCode);
		key.push(char);
	}
	return key.join('');
}

// Функция для зашифровки Вернама
function vernamEncrypt(message, key) {
	// Проверка на длину ключа
	if (message.length !== key.length) {
		throw new Error('Длины сообщения и ключа должны совпадать.');
	}

	let encryptedText = ''; // Переменная для хранения зашифрованного текста
	for (let i = 0; i < message.length; i++) {
		const char = message[i];
		if (char.match(/[A-Z]/)) {
			const charCode = (char.charCodeAt(0) + key.charCodeAt(i) - 130) % 26 + 65;
			encryptedText += String.fromCharCode(charCode);
		} else {
			encryptedText += char; // Сохраняем символы, не являющиеся буквами
		}
	}
	return encryptedText;
}

function vernamDecrypt(encryptedText, key) {
	if (encryptedText.length !== key.length) {
		throw new Error('Длины зашифрованного текста и ключа должны совпадать.');
	}

	let decryptedText = '';
	for (let i = 0; i < encryptedText.length; i++) {
		const char = encryptedText[i];
		if (char.match(/[A-Z]/)) {
			const charCode = ((char.charCodeAt(0) - key.charCodeAt(i) + 26) % 26) + 65;
			decryptedText += String.fromCharCode(charCode);
		} else {
			decryptedText += char; // Сохраняем символы, не являющиеся буквами
		}
	}
	return decryptedText;
}

// Пример использования
const originalMessage = "Tehnical Sequirity";
const key = generateKey(originalMessage.length).toUpperCase(); // Приводим ключ к верхнему регистру

const encryptedMessage = vernamEncrypt(originalMessage.toUpperCase(), key);
console.log("Зашифрованное сообщение:", encryptedMessage);

const decryptedMessage = vernamDecrypt(encryptedMessage, key);
console.log("Расшифрованное сообщение:", decryptedMessage);
