// функция для генерации случайного ключа опеределённой длинны в верхнем регистре
function generateKey(length) {
	const key = [];
	for (let i = 0; i < length; i++) {
		const randomCharCode = Math.floor(Math.random() * 26) + 65; // случайный код буквы A-Z
		// добавляем символ в массив и инвертируем код в символ
		key.push(String.fromCharCode(randomCharCode));
	}
	// соеденяем символы без пробела
	return key.join('');
}

// функция для зашифровки Вернама
function vernamEncrypt(message, key) {
	// проверка на длинну ключа
	if (message.length !== key.length) {
		throw new Error('Длины сообщения и ключа должны совпадать.');
	}

	let encryptedText = ''; // переменная для хранения зашифрованного текста
	for (let i = 0; i < message.length; i++) {
		const char = message[i];
		// проверка на Латынь
		if (char.match(/[A-Z]/)) {
			//складываем код ключа и pt
			//вычитаю 130 для перехода к правильному диапазону от 0 до 25
			const charCode = (char.charCodeAt(0) + key.charCodeAt(i) - 130) % 26 + 65;
			encryptedText += String.fromCharCode(charCode);
		} else {
			encryptedText += char; // сохраняем символы, не являющиеся буквами
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
			// получаю код символа (key.charCodeAt -> код ключа на текущей позиции)
			const charCode = ((char.charCodeAt(0) - key.charCodeAt(i) + 26) % 26) + 65;
			// привожу код к Символу
			decryptedText += String.fromCharCode(charCode);
		} else {
			decryptedText += char; // сохраняем символы, не являющиеся буквами (ошибка с пробелами и запятыми)
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
