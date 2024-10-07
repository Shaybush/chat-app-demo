import crypto from 'crypto';

export const create_email_code = (len: number) => {
  const randomBytes = crypto.randomBytes(Math.ceil(len / 2));
  let code = randomBytes.toString('hex');
  if (code.length > len) {
    code = code.substring(0, len);
  }
  return code;
}

export const generateTime = ({ value, time }: { value: number; time: 'sec' | 'min' | 'hour' }): number => {
  let milliseconds: number;

  switch (time) {
    case 'sec':
      milliseconds = value * 1000;
      break;
    case 'min':
      milliseconds = value * 60 * 1000;
      break;
    case 'hour':
      milliseconds = value * 60 * 60 * 1000;
      break;
    default:
      throw new Error('Invalid time unit');
  }

  return milliseconds;
};

export const generate_verification_email = (email: string, digits: string) => (
  {
    to: email,
    subject: 'Login Verification!',
    text: 'Thank you for joining our platform.',
    html: `<h1>Welcome!</h1><p>your verification code: ${digits}</p>`,
  }
)