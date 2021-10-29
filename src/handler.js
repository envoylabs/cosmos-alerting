"use strict";
const AWS = require('aws-sdk');
const R = require('ramda');

const REGION = process.env.REGION || 'eu-west-1';
const PHONE_NUMBER = process.env.PHONE_NUMBER; // should be in E.164 fmt
const API_TOKEN = process.env.API_TOKEN// generate a UUID for this

AWS.config.update({region: REGION});

// Create publish parameters
const getParams = (message) => {
  const errorMsg = "An error has occurred: " + message;

  return {
    Message: errorMsg,
    PhoneNumber: PHONE_NUMBER,
  }
};

// Create promise and SNS service object
const publishTextPromise = (params) =>
  new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

const apiTokenOk = (apiToken) => {
  return R.equals(apiToken, API_TOKEN);
};

module.exports.sendMsg = async (event) => {
  const { apiToken, message } = JSON.parse(event.body);

  const params = getParams(message);

  if (apiTokenOk(apiToken)) {
    await publishTextPromise(params).then(
        (data) => console.log("MessageID is " + data.MessageId))
      .catch(
        (err) => console.log(err));

    return {
      statusCode: 200,
      body: JSON.stringify({
          message: "Alert sent",
      }),
    };
  } else {
    console.log('API token invalid.');

    return {
      statusCode: 401,
      body: JSON.stringify({
          message: "Unauthorized",
      }),
    }
  }

};
