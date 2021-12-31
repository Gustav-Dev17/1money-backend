declare namespace Express {
  interface Request {
    file: {
      id: string;
      location: string;
      key: string;
      originalname: {
        key: string;
        location: string;
      };
    };
  }
}
