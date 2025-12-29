import express from 'express';
import { UploadControllers } from './upload.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post('/', upload.single('file'), UploadControllers.uploadFile);

export const UploadRoutes = router;
