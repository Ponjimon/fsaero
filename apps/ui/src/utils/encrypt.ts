import { createCipheriv } from 'crypto';

export const encrypt = (message: string) => {
  if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
    throw new Error('ENCRYPTION_KEY or ENCRYPTION_IV is not defined');
  }
  const cipher = createCipheriv(
    'aes-128-cbc',
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );
  const encrypted = cipher.update(message, 'utf8', 'base64');
  return encrypted + cipher.final('base64');
};
