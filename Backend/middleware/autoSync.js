import cron from 'node-cron';
// import syncParticipants from './sheetSync.js';  // लक्षात ठेवा .js extension

function startAutoSync() {
  // every 10 minutes
  cron.schedule('*/2 * * * *', async () => {
    console.log('⏳ Pinged');
    // await syncParticipants();
    // console.log('✅ Auto Sync Finished');
  });
}

export default startAutoSync;