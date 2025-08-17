const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { sendWithNodemailer } = require("../services/emailServices");
const logger = require("../utils/logger");

const connection = new IORedis({
  maxRetriesPerRequest: null,
});
const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, body } = job.data;
    await sendWithNodemailer({ email, subject, body });
    logger.info(`Email sent to ${email} with subject: ${subject}`);
  },
  { connection }
);
