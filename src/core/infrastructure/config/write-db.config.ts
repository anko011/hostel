import { registerAs } from '@nestjs/config';
import { JoiConfig, JoiUtils } from '@app/joi-utils';

import * as process from 'process';
import * as Joi from 'joi';

interface IWriteDbConfig {
  WRITE_DB_HOST: string;
  WRITE_DB_PORT: number;
  WRITE_DB_USERNAME: string;
  WRITE_DB_PASSWORD: string;
  WRITE_DB_NAME: string;
}

export default registerAs('write-db', (): IWriteDbConfig => {
  const config: JoiConfig<IWriteDbConfig> = {
    WRITE_DB_HOST: {
      value: process.env.WRITE_DB_HOST,
      joi: Joi.string().required(),
    },
    WRITE_DB_PORT: {
      value: parseInt(process.env.WRITE_DB_PORT),
      joi: Joi.number().positive().required(),
    },
    WRITE_DB_USERNAME: {
      value: process.env.WRITE_DB_USERNAME,
      joi: Joi.string().required(),
    },
    WRITE_DB_PASSWORD: {
      value: process.env.WRITE_DB_PASSWORD,
      joi: Joi.string().required(),
    },
    WRITE_DB_NAME: {
      value: process.env.WRITE_DB_NAME,
      joi: Joi.string().required(),
    },
  };

  return JoiUtils.validate(config);
});
