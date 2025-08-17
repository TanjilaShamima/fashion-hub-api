const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const emailQueue = require('../queue/emailQueue');

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue)
  ],
  serverAdapter
});
serverAdapter.setBasePath('/admin/queues');


module.exports = {
  serverAdapter
};