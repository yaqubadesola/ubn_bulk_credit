import { JSEncrypt } from 'jsencrypt';
import { AES, enc, mode, pad } from 'crypto-js';
//Encrypting a simple text like a password

var key = enc.Utf8.parse(process.env.REACT_APP_AES_KEY);
var iv = enc.Utf8.parse(process.env.REACT_APP_AES_IV);

export const encryptAES = (data) => {
    const encryptedData = AES.encrypt(enc.Utf8.parse(data), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });
    return encryptedData.toString();
};

export const decryptAES = (data) => {
    const decryptedData = AES.decrypt(data, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });
    return enc.Utf8.stringify(decryptedData);
};

export const textEncryption = (textVal) => {
    //console.log('text Val ', textVal);
    const RSA_Encrypt = new JSEncrypt();
    RSA_Encrypt.setPublicKey(process.env.REACT_APP_RSA_PUB_KEY);
    return RSA_Encrypt.encrypt(textVal);
};
