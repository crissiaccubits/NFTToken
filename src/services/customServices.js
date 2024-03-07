
import { NODE_ENV } from '../config/env';

const connectServices = async () => {
  if (NODE_ENV === 'production') {
  } else {
  }
  return;
};

module.exports = connectServices;
