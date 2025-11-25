import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function formatLoginDate(): { fecha: string; hora: string } {
  const now = new Date();

  return {
    fecha: format(now, "dd/MM/yyyy", { locale: es }),
    hora: format(now, "HH:mm", { locale: es }),
  };
}

export function encryptPasswordForSheet(password: string): string {
  return Buffer.from(password).toString("base64");
}
