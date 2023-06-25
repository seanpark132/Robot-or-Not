import { createContext } from 'react';
import Pusher from "pusher-js";

const pusherClient = new Pusher(
    "20d4de87a6ebd5971eee",  
    {
        cluster: "us3"  
    }
);

export const PusherContext = createContext(pusherClient);

