import { Router } from 'express';
import { UploadRoutes } from '../modules/uploadFile/upload.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/upload',
    route: UploadRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
