import axios from "axios";

async function uploadImage(file: File) {
  const pic = encodeImageFileAsURL(file);
  let imageData = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNERY_CLOUDNAME}/upload`,
    pic
  );
  return imageData.data.secure_url;
}

function encodeImageFileAsURL(element: File) {
  var data = new FormData();
  data.append("file", element);
  data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDNERY_PRESET || "");
  return data;
}

// function encodeImageFileAsURLForMultiupload(element) {
//   var data = new FormData();
//   data.append("file", element);
//   data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDNERY_PRESET);
//   return data;
// }

// async function multiupload(files) {
//   const alreadyUrls = [];
//   const uploadPromises = files.map(async (image) => {
//     if (typeof image === "string") {
//       alreadyUrls.push(image);
//       return null;
//     }
//     const imageData = encodeImageFileAsURLForMultiupload(image);
//     if (imageData) {
//       return uploadImageforMultiselect(imageData);
//     }
//     return null;
//   });

//   const uploadedImages = await Promise.all(uploadPromises);

//   const res = uploadedImages.filter((url) => url !== null);
//   return [...res, ...alreadyUrls];
// }

// async function uploadImageforMultiselect(Imgdata) {
//   let imageData = await axios.post(
//     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNERY_CLOUDNAME}/upload`,
//     Imgdata
//   );
//   return imageData.data.url;
// }
export {
  //  multiupload,
  encodeImageFileAsURL,
  uploadImage,
};
