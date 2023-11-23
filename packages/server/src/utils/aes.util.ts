import * as crypto from 'crypto';
import { aesConfig } from '../config/aes.config';

const encryptAes = (plainText) => {
	// base64 인코딩된 문자열을 반환
	plainText = Buffer.from(plainText).toString('base64');

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

	// base64 디코딩된 문자열을 반환
	plainText = Buffer.from(plainText, 'base64').toString();
	return plainText;
};

export { encryptAes, decryptAes };
