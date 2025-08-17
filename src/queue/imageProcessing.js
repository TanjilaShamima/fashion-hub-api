const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { sendWithNodemailer } = require("../services/emailServices");
const logger = require("../utils/logger");

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

const imageProcessing = new Queue('imageProcessing', {connection});


const emailWorker = new Worker(
  "imageProcessing",
  async (job) => {
    const { email, subject, body } = job.data;
    await sendWithNodemailer({ email, subject, body });
    logger.info(`Email sent to ${email} with subject: ${subject}`);
  },
  { connection }
);

module.exports = emailQueue;

