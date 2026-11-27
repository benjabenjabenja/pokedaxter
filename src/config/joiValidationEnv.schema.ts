import Joi from 'joi';

// Utils
import { 
    DEFAULT_ENV, 
    DEFAULT_PORT,
    DEFAULT_LIMIT_SEED, 
    DEAFULT_PREFIX_API,
    DEFAULT_BASE_URL_POKEAPI
} from '../utils/const.js';

export const JoiValidationEnvSchema = Joi.object({
    PORT: Joi.number().default(DEFAULT_PORT),
    MONGO_DB: Joi.required(),
    NODE_ENV: Joi.string().default(DEFAULT_ENV),
    DEFAULT_LIMIT: Joi.number().optional().default(DEFAULT_LIMIT_SEED),
    PREFIX_API: Joi.string().required().default(DEAFULT_PREFIX_API),
    BASE_URL_POKEAPI: Joi.string().required().default(DEFAULT_BASE_URL_POKEAPI)
})