import Alpaca from "@alpacahq/alpaca-trade-api";
import { env } from "../env/server.mjs";

export const alpaca = new Alpaca({
    keyId: env.API_KEY,
    secretKey: env.API_SECRET,
    paper: false,
});