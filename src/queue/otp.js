const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { sendWithNodemailer } = require("../services/emailServices");
const logger = require("../utils/logger");

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

const emailQueue = new Queue('emailQueue', {connection}, {
    delay: 5000, // Delay of 5 seconds before processing the job
});

const addEmailToQueue = async (emailData) => {
    await emailQueue.add("sendEmail", emailData, {
        attempts: 3, // Retry up to 3 times if the job fails
        backoff: { delay: 1000 } // Wait 1 second before retrying
    });
}
    
const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, body } = job.data;
    await sendWithNodemailer({ email, subject, body });
    logger.info(`Email sent to ${email} with subject: ${subject}`);
  },
  { connection }
);



module.exports = {emailQueue, addEmailToQueue};

