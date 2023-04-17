import PusherServer from 'pusher/';
import PusherClient from 'pusher-js';
export const pusherServer = new PusherServer({
    appId: "1585379",
    key: "37024b2b361921f235e0",
    secret: "cf7711b09659824f48a6",
    cluster: "eu",
    useTLS: true
});
export const pusherClient = new PusherClient(
    "37024b2b361921f235e0",{
    cluster:"eu",
    });