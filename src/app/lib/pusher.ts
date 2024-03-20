import Pusher from "pusher";

const globalForPusher = globalThis as unknown as {
	pusherServer: any | undefined;
};

export const pusherServer =
	globalForPusher.pusherServer ??
	new Pusher({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.PUSHER_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: "us3",
		useTLS: true,
	});

if (process.env.NODE_ENV !== "production")
	globalForPusher.pusherServer = pusherServer;
