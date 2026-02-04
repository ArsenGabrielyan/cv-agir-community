"use server"
import crypto from "crypto"
import { env } from "@/lib/env"
import { getTranslations } from "next-intl/server"

const secretKey = env.AES_SECRET

const key = crypto.createHash("sha256").update(secretKey).digest()

export async function encryptData<T extends string>(data: T){
     const errMsg = await getTranslations("error-messages");
     if (typeof data !== "string") throw new Error(errMsg("encryption.invalidForEncryption"));
     if (!data) return "";
     const iv = crypto.randomBytes(12);
     const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

     const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
     const authTag = cipher.getAuthTag();

     return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

export async function decryptData<T extends string>(data: T){
     const errMsg = await getTranslations("error-messages");
     if (typeof data !== "string") {
          throw new Error(errMsg("encryption.invalidForDecryption"));
     }
     if (!data) return "";
     const [ivHex, authTagHex, encryptedHex] = data.split(":");
     if (!ivHex || !authTagHex || !encryptedHex) throw new Error(errMsg("encryption.missingParts"));

     const iv = Buffer.from(ivHex, "hex");
     const authTag = Buffer.from(authTagHex, "hex");
     const encryptedText = Buffer.from(encryptedHex, "hex");

     const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
     decipher.setAuthTag(authTag);

     const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
     return decrypted.toString("utf8");
}