import { createContext } from "react";
import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.PUSHER_KEY!, {
	cluster: "us3",
});

export const PusherContext = createContext(pusherClient);
