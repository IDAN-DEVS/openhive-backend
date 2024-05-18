import { ENVIRONMENT } from '@/common/config';
import bcrypt from 'bcryptjs';
import { randomBytes, randomInt } from 'crypto';
import { Request } from 'express';
import { encode } from 'hi-base32';
import { nanoid } from 'nanoid';

const generateRandomString = () => {
	return randomBytes(32).toString('hex');
};

const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 12);
};

const comparePassword = async (password: string, hashedPassword: string) => {
	return await bcrypt.compare(password, hashedPassword);
};

const isValidFileNameAwsUpload = (fileName: string) => {
	const regex = /^[a-zA-Z0-9_\-/]+\/[a-zA-Z0-9_-]+(?:\.(jpg|png|jpeg))$/;
	return regex.test(fileName);
};

const generateRandomBase32 = () => {
	const buffer = randomBytes(15);
	return encode(buffer).replace(/=/g, '').substring(0, 24);
};

const generateRandom6DigitKey = () => {
	let randomNum = randomInt(0, 999999);

	// Ensure the number is within the valid range (000000 to 999999)
	while (randomNum < 100000) {
		randomNum = randomInt(0, 999999);
	}
	// Convert the random number to a string and pad it with leading zeros if necessary
	return randomNum.toString().padStart(6, '0');
};

const dateFromString = async (value: string) => {
	const date = new Date(value);

	if (isNaN(date?.getTime())) {
		return false;
	}

	return date;
};

const extractUAData = (req: Request) => ({
	country: req.headers['cf-ipcountry']?.toString() || '',
	city: req.headers['cf-ipcity']?.toString() || '',
	postalCode: req.headers['cf-postal-code']?.toString() || '',
	ipv4: req.headers['cf-connecting-ip']?.toString() || '',
	ipv6: req.headers['x-envoy-external-address']?.toString() || '',
	geo: {
		lat: req.headers['cf-iplatitude']?.toString() || '',
		lng: req.headers['cf-iplongitude']?.toString() || '',
	},
	region: req.headers['cf-region']?.toString() || '',
	continent: req.headers['cf-ipcontinent']?.toString() || '',
	timezone: req.headers['cf-timezone']?.toString() || '',
	os: req.headers['sec-ch-ua-platform']?.toString() || '',
});

const generateUniqueIdentifier = () => {
	const prefix = 'ABG-RF-';
	const randomChars = nanoid();

	return `${prefix}${randomChars}`;
};

const getDomainReferer = (req: Request) => {
	try {
		const referer = req.get('x-referer');

		if (!referer) {
			return `${ENVIRONMENT.FRONTEND_URL}`;
		}

		return referer;
	} catch (error) {
		return null;
	}
};

export {
	extractUAData,
	dateFromString,
	generateRandom6DigitKey,
	generateRandomBase32,
	generateRandomString,
	hashPassword,
	isValidFileNameAwsUpload,
	generateUniqueIdentifier,
	getDomainReferer,
	comparePassword,
};
