declare namespace Express {
  interface Request {
    id: string
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
