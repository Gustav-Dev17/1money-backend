declare namespace Express {
  interface Request {
    id: string;
    key: string;
    urlPhoto: string;
    video: {
      id: string;
      location: string;
      key: string;
      originalname: {
        key: string;
        location: string;
      };
    };
    file: {
      id: string;
      location: string;
      key: string;
      originalname: {
        key: string;
        location: string;
      };
    };

    files: {
      cover: [
        {
          fieldname: string;
          buffer: object;
          originalname: string;
          mimetype: string;
        }
      ];
      pre_video: [
        {
          fieldname: string;
          buffer: object;
          originalname: string;
          mimetype: string;
        }
      ];
    };
  }
}
