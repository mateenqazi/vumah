import axios from 'axios';
import S3 from 'react-aws-s3';

// import AWS from 'aws-sdk';
// const s3Client = new AWS.S3({
//   endpoint: '',
//   region: '',
//   credentials: {
//     accessKeyId: '',
//     secretAccessKey: ''
//   }
// });
//
// export const config = {
//   api: {
//     bodyParser: false
//   }
// };
//
// export async function handler(file) {
//   if (!file) return;
//   try {
//     return s3Client.putObject(
//       {
//         Bucket: '',
//         key: file.originalFilename,
//         body: fs.createReadStream(file.filepath),
//         ACL: 'public-read'
//       },
//       async () => console.log('complete')
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }

export const UploadImage = async (file) => {
  const config = {
    bucketName: 'vumah',
    region: 'us-east-2',
    accessKeyId: 'AKIAZUNR3VMLWACJ3QM2',
    secretAccessKey: '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'
  };

  const ReactS3Client = new S3(config);

  let uploaded = '';

  console.log('here');

  // the name of the file uploaded is used to upload it to S3
  await ReactS3Client.uploadFile(file, `${new Date().getTime()}-${file.name}`)
    .then((data) => {
      uploaded = data.location;
    })
    .catch((err) => console.error(err));

  console.log('Uploaded: ', uploaded);
  return uploaded;
};

export const UploadImaged = async (file) => {
  const API_ENDPOINT = 'https://d4s7wwi487.execute-api.us-east-2.amazonaws.com/default/getPresignedImageUrl';

  // * GET request: pre-signed URL
  const response = await axios({
    method: 'GET',
    url: API_ENDPOINT
  }).catch((e) => {
    return undefined;
  });

  // * PUT request: upload file to S3
  const result = await fetch(response.data.uploadURL, {
    method: 'PUT',
    body: file
  }).catch((e) => {
    return undefined;
  });

  if (result.ok) {
    return `https://vumah-store.s3.us-east-2.amazonaws.com/${response.data.Key}`;
  } else {
    return undefined;
  }
};

export const UploadImages = async (files) => {
  const upLoadedFiles = [];
  await Promise.all(
    (
      await files
    ).map(async (file) => {
      const fileUp = await UploadImage(file);
      if (fileUp !== undefined) {
        upLoadedFiles.push({ url: fileUp });
      }
      return fileUp;
    })
  );

  return upLoadedFiles;
};
