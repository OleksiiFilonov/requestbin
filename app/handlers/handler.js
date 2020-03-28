'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const params = {
  Bucket: process.env.BUCKET, /* required */
  // ContinuationToken: 'STRING_VALUE',
  // Delimiter: 'STRING_VALUE',
  // EncodingType: url,
  //FetchOwner: true,
  MaxKeys: 100
  //Prefix: 'STRING_VALUE',
  //RequestPayer: requester,
  //StartAfter: 'STRING_VALUE'
};

module.exports.listBins = (event, context, callback) => {
  let dynamicHtml = '<p>Hey Unknown!</p>';
  // check for GET params and use if available
  if (event.queryStringParameters && event.queryStringParameters.name) {
    dynamicHtml = `<p>Hey ${event.queryStringParameters.name}!</p>`;
  }
  s3.listObjectsV2(params, function(err, data) {
    if (err)  {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
      console.log("Bins", data.Contents.map(content => content.Key));
    }
  });
  

  const html = `
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <body>
      <h1>Bins</h1>
      ${dynamicHtml}
    </body>
  </html>`;

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};


module.exports.createBin = (event, context, callback) => {
  //console.log(event);
  console.log(event.body);
  var response;
  if(event.body && JSON.parse(event.body).name) {
    const binName = JSON.parse(event.body).name;
    s3.putObject({Bucket: params.Bucket, Key: `${binName}/`}).promise();
    response = {
      statusCode: 201, 
      headers: {
        'Content-Type': 'text/html',
      },
      body: `the bin "${binName}" has been created`,
    };
    s3.upload
  } else {
    response = {
      statusCode: 400, 
      headers: {
        'Content-Type': 'text/html',
      },
      body: `the bin name is missed in the "name" parameter`,
    };
  }
  callback(null, response);
}