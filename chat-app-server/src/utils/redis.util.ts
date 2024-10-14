import { RedisClientType } from 'redis';
import connectRedis from '../db/connect-redis';
import { AppError } from '../error/appError';
import CommonResponseDict from './common-response-dict.utils';

interface IRedisCacheProps {
    key: string;
    callbackFn: () => void;
    expirationTime: number
}

export const get_set_redis_cache = async ({ key, callbackFn, expirationTime }: IRedisCacheProps): Promise<void | RedisClientType> => {
    const redisClient = await connectRedis();
    return new Promise((resolve, reject) => {
        redisClient.GET(key)
            .then((redisData: string) => {
                if (redisData && redisData !== null) return resolve(JSON.parse(redisData));
                const value = callbackFn();
                redisClient.SETEX(key, expirationTime, JSON.stringify(value));
                resolve(value);
            })
            .catch((error: { message: string }) => reject(new AppError(
                CommonResponseDict.InternalServerError.title,
                CommonResponseDict.InternalServerError.code,
                `error getting redis data: ${error.message}`,
                false
            )))
    })
}

export const set_redis_cache = async ({ key, callbackFn, expirationTime }: IRedisCacheProps): Promise<void | RedisClientType> => {
    const redisClient = await connectRedis();
    return new Promise((resolve, reject) => {
        const value = callbackFn();
        redisClient.SETEX(key, expirationTime, JSON.stringify(value)).then(()=>resolve()).catch((error: { message: string }) => reject(new AppError(
            CommonResponseDict.InternalServerError.title,
            CommonResponseDict.InternalServerError.code,
            `error getting redis data: ${error.message}`,
            false
        )));
    })
}