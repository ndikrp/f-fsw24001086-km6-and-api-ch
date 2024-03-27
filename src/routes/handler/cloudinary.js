const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dgyxhifrx",
    api_key: "823959542777898",
    api_secret: "8-Ad4dPyMeCcxp1hGVkNPfxmgFE",
    secure: true,
});

module.exports = cloudinary;
