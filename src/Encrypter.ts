// @ts-ignore
const crypto = require('crypto');
const config = require('../encrypt.json');
const encryptionType = 'aes-256-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';

class Encrypter {
  AesKey: string;
  AesIV: string;

  constructor() {
    this.AesKey = config.key;
    this.AesIV = config.iv;
  }

  encrypt(jsonObject: Object): string {
    const val = JSON.stringify(jsonObject);
    const key = Buffer.from(this.AesKey, bufferEncryption);
    const iv = Buffer.from(this.AesIV, bufferEncryption);
    // @ts-ignore
    const cipher = crypto.createCipheriv(encryptionType, key, iv);
    let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding);
    encrypted += cipher.final(encryptionEncoding);
    return encrypted;
  }

  decrypt(base64String: string): any {
    const buff = Buffer.from(base64String, encryptionEncoding);
    const key = Buffer.from(this.AesKey, bufferEncryption);
    const iv = Buffer.from(this.AesIV, bufferEncryption);
    // @ts-ignore
    const decipher = crypto.createDecipheriv(encryptionType, key, iv);
    const deciphered = decipher.update(buff) + decipher.final();
    return JSON.parse(deciphered);
  }
}

export default Encrypter;
