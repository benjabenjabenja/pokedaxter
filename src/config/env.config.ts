import { DEAFULT_PREFIX_API, DEFAULT_ENV, DEFAULT_LIMIT_SEED, DEFAULT_PORT } from "../utils/const.js";

export const EnvConfig = () => ({
    envirnment: process.env.NODE_ENV || DEFAULT_ENV,
    mongoDb: process.env.MONGO_DB,
    port: process.env.PORT || DEFAULT_PORT,
    defaultLimit: process.env.DEFAULT_LIMIT || DEFAULT_LIMIT_SEED,
    defaultPrefix: process.env.PREFIX_API || DEAFULT_PREFIX_API,
    baseUrlPokeApi: process.env.BASE_URL_POKEAPI
})