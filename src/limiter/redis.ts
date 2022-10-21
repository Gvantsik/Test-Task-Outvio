import { HttpStatus } from '@nestjs/common';
import redis from 'ioredis';

export async function isOverLimit(ip, limit) {
  let count;
  const client = redis.createClient();

  try {
    count = await client.incr(ip);
    if (count === 1) {
      const timeLimit = Date.now() + Number(process.env.EXPIRATION_TIME);
      await client.set('ExDate', timeLimit);
    }
  } catch (err) {
    console.error('isOverLimit: could not increment key');
    throw err;
  }
  console.log(`${ip} has value: ${count}`);

  if (count > limit) {
    const getExDate = await client.get('ExDate');
    const expirationDate = new Date(Number(getExDate));

    return {
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: `You have reached your limit: ${limit} requests per hour. Please, make the next request after ${expirationDate} time`,
    };
  }

  client.expire(ip, Number(process.env.EXPIRATION_TIME) / 1000);
}
