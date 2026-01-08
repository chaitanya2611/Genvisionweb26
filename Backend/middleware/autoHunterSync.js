import cron from "node-cron";
import syncHunters from "./treasureHunt.js"; // लक्षात ठेवा .js extension

function starthunterSync() {
  // every 10 minutes
  cron.schedule("*/15 * * * * *", async () => {
    await syncHunters();
    // await
    // console.log('✅ Auto Sync Finished');
  });
}

export default starthunterSync;
