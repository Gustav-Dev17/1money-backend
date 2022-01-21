/// <reference types="multer" />
declare const _default: {
    dest: string;
    storage: import("multer").StorageEngine;
    fileFilter: (req: any, file: any, cb: any) => void;
};
export = _default;
