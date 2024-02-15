// функция для зашифровки текста шифром Цезяря (+3)
function encryptCesar(text, shift) {
	if (shift < 0 || shift > 9) {
		throw new Error ("Сдвиг должен состоять только из 1 символа!")
	}
		return text.split('').map(char => {
			if (char.match(/[a-z]/i)) // проверка на Латинский алфавит
			{
				const code = char.charCodeAt(0); // кодировка по UTF-8 (A === 65)
				const isUpperCase = char === char.toUpperCase(); // boolean
				// код заглавных 65 и строчных 97 букв
				const baseCode = isUpperCase ? 65 : 97;
				// новый код (всего 26 букв в алфавите)
				const shiftedCode = (code - baseCode + shift + 26) % 26 + baseCode;
				// приведение кода к символу
				return String.fromCharCode(shiftedCode);
			}
			else {
				return char;
			}
		}).join('');g
}

// Функция для расшифровки текста шифром Цезаря
function decryptCesar(text, shift) {
	const inverseShift = -shift
	return text.split('').map(char => {
		if (char.match(/[a-z]/i)) // проверка на Латинский алфавит
		{
			const code = char.charCodeAt(0); // кодировка по UTF-8 (A === 65)
			const isUpperCase = char === char.toUpperCase(); // boolean
			// код заглавных 65 и строчных 97 букв
			const baseCode = isUpperCase ? 65 : 97;
			// новый код (всего 26 букв в алфавите)
			const shiftedCode = (code - baseCode + inverseShift + 26) % 26 + baseCode;
			// приведение кода к символу
			return String.fromCharCode(shiftedCode);
		}
		else {
			return char;
		}
	}).join('');
}

// Исходный текст pt
const originalText = "Securitatea Informationala";
const shiftAmount = 13;

// Зашифрованный текст ct
const encryptedText = encryptCesar(originalText, shiftAmount);
console.log("Зашифрованный текст:", encryptedText);

const decryptedText = decryptCesar(encryptedText, shiftAmount);
console.log("Расшифрованный текст:", decryptedText);
