import Redis from 'ioredis';
import { ENVIRONMENT } from '../configs/environment';

export class CacheHelper {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(ENVIRONMENT.REDIS.URL);
  }

  setCache = async (key: string, value: string | object, expiry: number) => {
    const json = JSON.stringify(value);
    await this.redis.set(key, json, 'EX', expiry);
  };

  getCache = async (key: string) => {
    const json = await this.redis.get(key);
    if (json) return JSON.parse(json);
    return null;
  };

  removeFromCache = async (key: string) => {
    if (!key) {
      throw new Error('Invalid key provided');
    }

    const data = await this.redis.del(key);

    if (!data) {
      return null;
    }
    return data;
  };
}
