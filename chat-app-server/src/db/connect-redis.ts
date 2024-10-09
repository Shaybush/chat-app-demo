import { createClient, RedisClientType } from 'redis';
import { config } from 'dotenv'
import { AppError } from '../error/appError';
import CommonResponseDict from '../utils/common-response-dict.utils';

let redisClient: RedisClientType;

const connectRedis = async (): Promise<RedisClientType> => {
    if (!redisClient) {
        config();
        try {
        redisClient = createClient({
            url: process.env.REDIS_URL || '', // default server run on local
        });
            await redisClient.connect();
            console.log("Redis connected successfully");
        } catch (error) {
            console.error('Error connecting to Redis:', error);
            throw new AppError(
                CommonResponseDict.InternalServerError.title,
                CommonResponseDict.InternalServerError.code,
                `cannot connect to redis: ${error.message}`,
                false
            )
        }
    }

    return redisClient;
};

export default connectRedis;