import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';

export const csvUpload = (req: Request, res: Response, next: NextFunction) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, file) => {
    if (!file.csv) {
      return res.status(400).json({ 
        status: 400, message: 'csv file is required' 
      });
    }

    res.locals.csvFile = file.csv;
    next();
  });
}
