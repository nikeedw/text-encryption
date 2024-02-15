// функция для зашифровки шифром Виженера
function encryptVigenere(text, keyword) {
	if (keyword.length === 0 || keyword.length >= text.length) {
		throw new Error('Некорректная длина ключа. Длина ключа должна быть больше 0 и меньше длины исходного текста.');
	}
	let encryptedText = ''; // переменная для сохранения зашифрованного текста
	let keywordIndex = 0; // индекс символа в ключевом слове

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		// проверка на Латинский алфавит
		if (char.match(/[a-z]/i)) {
			const isUpperCase = char === char.toUpperCase();
			// даём базовый номер кода в зависимости от Заглавной буквы
			const baseCharCode = isUpperCase ? 65 : 97;
			// получаю числовой код текущего сивола в КЛючевом СЛОВЕ (1, 4, 2)
			const keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length) - 65;
			// кодируем символ по УТФ
			const charCode = char.charCodeAt(0);
			const encryptedCharCode = (charCode - baseCharCode + keywordCharCode) % 26 + baseCharCode;
			// привожу код к Символу
			encryptedText += String.fromCharCode(encryptedCharCode);
			// в цикле меняю индекс символа в ключе
			keywordIndex++;
		} else {
			encryptedText += char;
		}
	}
	return encryptedText;
}

// функция для расшифровки текста шифром Виженера
function decryptVigenere(text, keyword) {
	if (keyword.length === 0 || keyword.length >= text.length) {
		throw new Error('Некорректная длина ключа. Длина ключа должна быть больше 0 и меньше длины исходного текста.');
	}

	let decryptedText = ''; // переменная для сохранения расшифрованного текста
	let keywordIndex = 0; // индекс символа в ключе

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		// проверка на Латынь
		if (char.match(/[a-z]/i)) {
			const isUpperCase = char === char.toUpperCase();
			const baseCharCode = isUpperCase ? 65 : 97;
			// находим код символа ключа
			const keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length) - 65;
			// кодирую символ по UTF
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

// Пример
const originalText = "Milan";
const keyword = "ABCDEFG"

const encryptedText = encryptVigenere(originalText, keyword);
console.log("Зашифрованный текст:", encryptedText);

const decryptedText = decryptVigenere(encryptedText, keyword);
console.log("Расшифрованный текст:", decryptedText);