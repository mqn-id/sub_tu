let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIe9uxFYzZT7W1hf4dAZQlhOqctlmgTk9EDRHAFfrqAtI6xSXtJqPm8SAS0a7ZTP53xLX0aEYx4XFHBnpuZtbS0",
   "privateKey": "8jma__KksxYz7Zqk0MdKzI5ZnV2DY8tuWXJ7Oagc2fM"
};
 
 
webPush.setVapidDetails(
   'mailto:maqin@qmail.id',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cdw45IlkIco:APA91bF8p9a3-YsY0aPNlZZJx0BZErQlCuNWR43GjD83lHcwR0WqhHxVrMDAkmzyRigKIiSxX46FkWuL_TWiTp0A-AbAT9H6wR6fbRmEJAPfHPjuM2OUYRfKiWmm5aHxvc69YvRGLtyp",
   "keys": {
       "p256dh": "BFph5qoqcCbOYk8PIa13lArl92j05DXg7fxoPKuXCpcJLsdpRU0nkhNSbhwnXGH7gPsrqBuISfUPVSQj9jBIa1Q=",
       "auth": "C4jVU+3P9ZJIiO22t9GNkg=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '44760167108',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);