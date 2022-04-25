const fs = require('fs');
const path = require('path');
const multer = require('multer');
import Picture from '../models/Picture';
import { checkParamRequired } from '../utils/validation';
import { error, success } from './BaseController';

const distinationUrl = process.env.PICTURES_STORAGE_URL || 'public';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(distinationUrl)) {
      fs.mkdirSync(distinationUrl, { recursive: true });
    }
    cb(null, distinationUrl);
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  },
});

const upload = multer({ storage: storage }).single('file');

/**
 * Upload a cat picture
 * @param req request
 * @param res response
 */
export async function uploadPicture(req, res): Promise<void | any> {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        error(res, err, 500);
      } else if (err) {
        error(res, err, 500);
      } else {
        checkParamRequired(res, req.file, 'file');
        const picture = await Picture.query().insertAndFetch({ url: req.file.filename });
        success(res, picture);
      }
    });
  } catch (e) {
    error(res, e, 500);
  }
}

/**
 * Delete a cat picture
 * @param req request
 * @param res response
 */
export async function deletePicture(req, res): Promise<void | any> {
  try {
    const { id } = req.params;
    checkParamRequired(res, id, 'id');
    const picture: any = await Picture.query().findById(id);

    if (picture) {
      fs.unlinkSync(path.resolve(distinationUrl, picture.url));
      await Picture.query().deleteById(id);
      success(res, { message: 'Picture deleted' });
    } else {
      error(res, { message: 'Not found' }, 404);
    }
  } catch (e) {
    error(res, e, 500);
  }
}

/**
 * Fetch a cat picture
 * @param req request
 * @param res response
 */
export async function getPicture(req, res): Promise<void | any> {
  try {
    const { id } = req.params;
    checkParamRequired(res, id, 'id');
    const picture: any = await Picture.query().findById(id);

    if (picture) {
      success(res, picture);
    } else {
      error(res, { message: 'Not found' }, 404);
    }
  } catch (e) {
    error(res, e, 500);
  }
}

/**
 * Fetch all pictures
 * @param req request
 * @param res response
 */
export async function getAllPictures(req, res): Promise<void | any> {
  try {
    const pictures: any = await Picture.query();
    success(res, pictures);
  } catch (e) {
    error(res, e, 500);
  }
}

/**
 * Update cat picture
 * @param req request
 * @param res response
 */
export async function updatePicture(req, res): Promise<void | any> {
  try {
    const { id } = req.params;
    checkParamRequired(res, id, 'id');
    const picture: any = await Picture.query().findById(id);
    if (picture) {
      const urlToDelete = picture.url;
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          error(res, err, 500);
        } else if (err) {
          error(res, err, 500);
        } else {
          checkParamRequired(res, req.file, 'file');
          fs.unlinkSync(path.resolve(distinationUrl, urlToDelete));
          const picture = await Picture.query().patchAndFetchById(id, { url: req.file.filename });
          success(res, picture);
        }
      });
    } else {
      error(res, { message: 'Not found' }, 404);
    }
  } catch (e) {
    error(res, e, 500);
  }
}
