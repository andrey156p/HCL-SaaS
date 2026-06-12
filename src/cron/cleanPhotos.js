const cron = require('node-cron');
const prisma = require('../prismaClient');

// Schedule a job to run every day at midnight
const startCronJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily cron job: Cleaning up old photos (30+ days)');

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Find tasks older than 30 days that still have photos
      const oldTasks = await prisma.task.findMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo
          },
          OR: [
            { photoUrl: { not: null } },
            { afterPhotoUrl: { not: null } }
          ]
        }
      });

      console.log(`Found ${oldTasks.length} old tasks to clean up.`);

      // Here you would also add AWS S3 DeleteObjectCommand to actually delete from storage
      // For now, we just remove the URL from the database
      
      const updatePromises = oldTasks.map(task => 
        prisma.task.update({
          where: { id: task.id },
          data: { photoUrl: null, afterPhotoUrl: null }
        })
      );

      await Promise.all(updatePromises);
      console.log('Cleanup complete.');

    } catch (error) {
      console.error('Error during photo cleanup cron job:', error);
    }
  });
};

module.exports = startCronJobs;
