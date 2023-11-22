import * as crypto from 'crypto';
import { aesConfig } from '../config/aes.config';

const encryptAes = (plainText) => {
	const algorithm = 'aes-256-cbc'; // 암호 알고리즘
	const key = crypto.scryptSync(aesConfig.password, aesConfig.salt, 32); // 암호화 키
	const iv = aesConfig.iv; // 초기화 벡터

	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let cipherText = cipher.update(plainText, 'utf8', 'base64');
	cipherText += cipher.final('base64');
	return cipherText;
};

const decryptAes = (cipherText) => {
	const algorithm = 'aes-256-cbc'; // 암호 알고리즘
	const key = crypto.scryptSync(aesConfig.password, aesConfig.salt, 32); // 암호화 키
	const iv = aesConfig.iv; // 초기화 벡터

	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let plainText = decipher.update(cipherText, 'base64', 'utf8');
	plainText += decipher.final('utf8');
	return plainText;
};

export { encryptAes, decryptAes };
