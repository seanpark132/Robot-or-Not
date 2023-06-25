import Pusher from "pusher";

// export const pusherServer = new Pusher({
//     appId: process.env.PUSHER_APP_ID!,
//     key: process.env.PUSHER_KEY!,
//     secret: process.env.PUSHER_SECRET!,
//     cluster: "us3",
//     useTLS: true
// });


const globalForPusher = globalThis as unknown as {
    pusher: any | undefined
  }
  
  export const pusherServer =
    globalForPusher.pusher ??
    new Pusher({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.PUSHER_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: "us3",
        useTLS: true
    });
  
  if (process.env.NODE_ENV !== 'production') globalForPusher.pusher = pusherServer