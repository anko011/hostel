import { registerAs } from '@nestjs/config';
import { JoiConfig, JoiUtils } from '@app/joi-utils';

import * as process from 'process';
import * as Joi from 'joi';

interface ITokenConfig {
  tokenSecret: string;
  accessTokenTTL_SEC: number;
  refreshTokenTTL_SEC: number;
}

export default registerAs('token', (): ITokenConfig => {
  const config: JoiConfig<ITokenConfig> = {
    tokenSecret: {
      value: process.env.TOKEN_SECRET,
      joi: Joi.string().required(),
    },
    accessTokenTTL_SEC: {
      value: parseInt(process.env.ACCESS_TOKEN_TTL_SEC),
      joi: Joi.number().positive().required(),
    },
    refreshTokenTTL_SEC: {
      value: parseInt(process.env.REFRESH_TOKEN_TTL_SEC),
      joi: Joi.number().positive().required(),
    },
  };

  return JoiUtils.validate(config);
});
