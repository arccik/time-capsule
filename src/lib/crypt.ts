export const encrypt = (salt: string, text: string): string => {
  const textToChars = (text: string): number[] =>
    Array.from(text, (c) => c.charCodeAt(0));

  const applySaltToChar = (codes: number[]): number =>
    codes.reduce((a, b) => a ^ b, 0);

  const byteToHex = (n: number): string => n.toString(16).padStart(2, "0");

  const encryptedChars = Array.from(text, (char) =>
    applySaltToChar(textToChars(char))
  );

  const encryptedHex = encryptedChars.map(byteToHex).join("");

  return encryptedHex;
};

export const decrypt = (salt: string, encoded: string): string => {
  const hexToByte = (hex: string): number => parseInt(hex, 16);

  const applySaltToChar = (codes: number[]): number =>
    codes.reduce((a, b) => a ^ b, 0);

  const decryptedChars = [];

  for (let i = 0; i < encoded.length; i += 2) {
    const hexPair = encoded.substr(i, 2);
    const byte = hexToByte(hexPair);
    const decryptedChar = String.fromCharCode(applySaltToChar([byte]));

    decryptedChars.push(decryptedChar);
  }

  const decryptedText = decryptedChars.join("");

  return decryptedText;
};
