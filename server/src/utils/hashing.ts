import { hash, compare } from "bcryptjs";


export const doHash = async (value: string, saltValue: number): Promise<string> => {
    const result = await hash(value, saltValue);
    return result;
};

export const doHashValidator = async (value: string, hashedValue: string): Promise<boolean> => {
    const result = await compare(value, hashedValue);
    return result;
};