import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
    "20d4de87a6ebd5971eee",   // HAVE TO HARD-CODE FOR SOME REASON
    {
        cluster: "us3"
    }
);

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "us3",
    useTLS: true
});
