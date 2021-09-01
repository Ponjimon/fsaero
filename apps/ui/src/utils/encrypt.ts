import { createCipheriv } from 'crypto';

export const encrypt = (message: string) => {
  const cipher = createCipheriv(
    'aes-128-cbc',
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );
  const encrypted = cipher.update(message, 'utf8', 'base64');
  return encrypted + cipher.final('base64');
};
