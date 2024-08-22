const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const upload_image = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ code: 400, message: "Please choose an image to be uploaded" });
    }

    const image = req.files.image;
    const image_dir = "uploads/general/";
    const image_path = image_dir + new Date().getTime() + "_" + image.name;

    await UPLOAD_IMAGE_ON_SERVER(image, image_dir, image_path);

    res.status(200).json({
      code: 200,
      message: "Image Uploaded successfully",
      image_path: image_path,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = upload_image;
