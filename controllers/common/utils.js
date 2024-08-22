const fs = require("fs");

module.exports.RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      // message: error.message
      message: "Some thing went wrong, Please Contact Support",
    });
  } else {
    res.status(400).send(error);
  }
};

module.exports.show_proper_words = (text) => {
  let replace_string = "";
  if (text) {
    // Replace hyphens and underscores with spaces
    replace_string = text.replace(/[-_]/g, " ");
    // Capitalize the first letter of every word
    replace_string = replace_string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return replace_string;
};

module.exports.UPLOAD_IMAGE_ON_SERVER = (file, image_dir, file_name) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("uploads/")) {
      fs.mkdirSync("uploads/");
    }
    if (!fs.existsSync(image_dir)) {
      fs.mkdirSync(image_dir);
    }
    // Use the mv() method to place the file somewhere on your server
    file.mv(file_name, function (err) {
      if (err) {
        console.log(err, "File Uploading Error");
        reject({ status: 400, message: err });
      } else {
        resolve(file_name);
      }
    });
  });
};

module.exports.DELETE_IMAGE = (image) => {
  fs.unlink(image);
};

module.exports.COPY_IMAGE = (image, directory) => {
  var inStr = fs.createReadStream(image);
  var outStr = fs.createWriteStream(directory);
  inStr.pipe(outStr);
};
