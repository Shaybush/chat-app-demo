import crypto from 'crypto';

export const create_email_code = (len : number) => {
  const randomBytes = crypto.randomBytes(Math.ceil(len / 2));
  let code = randomBytes.toString('hex'); 
  if (code.length > len) {
    code = code.substring(0, len);
  }
  return code;
}


