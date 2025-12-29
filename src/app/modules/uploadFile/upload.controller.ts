import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendRestResponse from '../../utils/sendRestResponse';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const uploadFile = catchAsync(async (req, res) => {
  const file = req.file;
  let imgUrl;

  if (file) {
    const imageName = `Demo file`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imgUrl = secure_url as string;
  }
  sendRestResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'File is uploaded succesfully',
    data: imgUrl,
  });
});

export const UploadControllers = {
  uploadFile,
};
