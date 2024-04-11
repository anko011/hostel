import { registerAs } from '@nestjs/config';
import { JoiConfig, JoiUtils } from '@app/joi-utils';

import * as process from 'process';
import * as Joi from 'joi';

interface IReadDbConfig {
  READ_DB_HOST: string;
  READ_DB_PORT: number;
  READ_DB_USERNAME: string;
  READ_DB_PASSWORD: string;
  READ_DB_NAME: string;
}

export default registerAs('read-db', (): IReadDbConfig => {
  const config: JoiConfig<IReadDbConfig> = {
    READ_DB_HOST: {
      value: process.env.READ_DB_HOST,
      joi: Joi.string().required(),
    },
    READ_DB_PORT: {
      value: parseInt(process.env.READ_DB_PORT),
      joi: Joi.number().positive().required(),
    },
    READ_DB_USERNAME: {
      value: process.env.READ_DB_USERNAME,
      joi: Joi.string().required(),
    },
    READ_DB_PASSWORD: {
      value: process.env.READ_DB_PASSWORD,
      joi: Joi.string().required(),
    },
    READ_DB_NAME: {
      value: process.env.READ_DB_NAME,
      joi: Joi.string().required(),
    },
  };

  return JoiUtils.validate(config);
});
