"use strict";

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  NETWORK: process.env.NETWORK || 'development',
  ALLOW_DOMAIN: process.env.ALLOW_DOMAIN,
  HMAC_SECRET_KEY: process.env.HMAC_SECRET_KEY || 'test',
  RPC_URL: {
    ETH: process.env.ETH_RPC_URL
  },
  GAS_ADD_ON: {
    ETH: 10000000000
  },
  DID_STATUS: {
    INACTIVE: 0,
    ACTIVE: 1,
    SUSPENDED: 2,
    TERMINATED: 3
  },
  VC_STATUS: {
    INACTIVE: 0,
    ACTIVE: 1,
    EXPIRED: 2,
    SUSPENDED: 3,
    TERMINATED: 4
  },
  KMS: {
    ACCOUNT_CONFIG: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: process.env.REGION
    },
    ADMIN_KEY_ID: process.env.ADMIN_KEY_ID,
    PLATFORM_WALLET_KEY_ID: process.env.PLATFORM_WALLET_KEY_ID
  }
};
module.exports = config;