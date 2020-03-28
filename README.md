<!--
title: 'AWS Serving Dynamic HTML via API Gateway example in NodeJS'
description: 'This example illustrates how to hookup an API Gateway endpoint to a Lambda function to render 
framework: v1
platform: AWS
language: nodeJS
-->
# Request Bin

This example illustrates how to hookup an API Gateway endpoint to a Lambda function to render HTML on a `GET` request.

## Use-cases

- Creating Webhook
- Reviewing HTTP calls

## How it works

Instead of returning the default `json` from a request, you can display custom dynamic HTML by setting the `Content-Type` header to `text/html`.

```js
const response = {
  statusCode: 200,
  headers: {
    'Content-Type': 'text/html',
  },
  body: html,
};
// callback will send HTML back
callback(null, response);
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (1.01 KB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...........................
Serverless: Stack update finished...

Service Information
service: requestbin
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  GET - https://nzkl1kas89.execute-api.us-east-1.amazonaws.com/dev/bins
functions:
  requestbin-dev-bins: arn:aws:lambda:us-east-1:377024778620:function:requestbin-dev-bins
```

## Usage

You can now send an HTTP request directly to the endpoint using a tool like curl

```bash
curl https://nzkl1kas89.execute-api.us-east-1.amazonaws.com/dev/landing-page?name=Nik%20Graf
```

The expected result should be similar to:

```bash
<html>
  <style>
    h1 { color: #73757d; }
  </style>
  <body>
    <h1>Landing Page</h1>
    <p>Hey Nik Graf!</p>
  </body>
</html>%
```

Of course you can visit the URL in your browser and this is how it should look like:

![Screenshot without a name](https://cloud.githubusercontent.com/assets/223045/20668061/12c6db9a-b56d-11e6-911c-8396d545471a.png)

To greet a specific person, provide the query parameter with the name of that person e.g. `?name=Nik%20Graf`. The response should now contain the provided name:

![Screenshot with a name](https://cloud.githubusercontent.com/assets/223045/20668055/0758b4cc-b56d-11e6-80ce-3e137151311f.png)
