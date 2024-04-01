const cloudinary = require("cloudinary").v2;

// Go to https://cloudinary.com/ and create a new account. The config below will be on your cloudinary dashboard
cloudinary.config({
    cloud_name: "your cloud name",
    api_key: "your api key",
    api_secret: "your api secret",
    secure: true,
});

module.exports = cloudinary;
