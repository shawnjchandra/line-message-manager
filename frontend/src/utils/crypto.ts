export const crypto = {
    async getKey(): Promise<CryptoKey> {
        const encoder = new TextEncoder();
        const keyMaterial = encoder.encode(process.env.SECRET_KEY);

        return await globalThis.crypto.subtle.importKey('raw', keyMaterial.slice(0,32),
        {name : 'AES-CGM'},
        false,
        ['encrypt','decrypt'])

    },

    encrypt(data:string) : string {
        try {
            let result = '';
            const sk = process.env.REACT_APP_SECRET_KEY || "";
            for (let i =0 ; i <data.length ; i++ ){
                const charCode = data.charCodeAt(i) ^ sk?.charCodeAt(i % sk.length);
                result += String.fromCharCode(charCode);
            }
            // console.log(sk,result, btoa(result))

            return btoa(result);
        } catch (error) {
            throw new Error("Failed to encrypt data");
        }
    },

    decrypt(encryptedData: string) : string {
        try {
            const decoded = atob(encryptedData);
            let result = '';
            
            const sk = process.env.REACT_APP_SECRET_KEY || "";
            
            for (let i =0 ; i <decoded.length ; i++ ){
                const charCode = decoded.charCodeAt(i) ^ sk?.charCodeAt(i % sk.length);
                result += String.fromCharCode(charCode);
            }
            // console.log(result)
            return result;  

        } catch (error) {
            throw new Error("Failed to decrypt data");
        }
    },

    encryptObject<T> (obj: T) : string {
        const jsonString = JSON.stringify(obj);
        return this.encrypt(jsonString);
    },

    decryptObject<T> (encryptedData: string) : T {
        const decrypted = this.decrypt(encryptedData);
        return JSON.parse(decrypted) as T;
    }
}