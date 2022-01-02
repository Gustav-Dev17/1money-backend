declare namespace Express {
  interface Request {
    id: string,
    key: string,
    urlPhoto: string
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
