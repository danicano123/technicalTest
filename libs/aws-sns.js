const config = require("../config");
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: config.ACCESS_KEY_ID_AWS,
  secretAccessKey: config.SECRET_ACCESS_KEY_ID_AWS,
  region: config.REGION_AWS,
});

const sns = new AWS.SNS();

const sendMessage = (message) => {
  const params = {
    Message: message,
    Subject: "Test Message from AWS SNS",
    TopicArn: config.TOPIC_ARN_AWS,
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Message sent to ${params.TopicArn}`);
    }
  });
};

module.exports = sendMessage;
