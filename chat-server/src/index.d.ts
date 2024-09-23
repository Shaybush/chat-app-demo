export { };

declare global {
  namespace Express {
    interface Request {
      originUrl: string;
    }
  }
}
