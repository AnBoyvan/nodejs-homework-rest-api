const Jimp = require("jimp");

const resizeImg = async (img) => {
  try {
    const image = await Jimp.read(img);
    image.resize(250, 250).write(img);
  } catch (error) {
    console.log(error);
  }
};

module.exports = resizeImg;
