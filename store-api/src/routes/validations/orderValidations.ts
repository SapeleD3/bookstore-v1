import JOI from 'joi';
import { RequestProperty } from '../../middleware/types';

const orderValidation = {
  orderBook: {
    schema: JOI.object().keys({
      cartItems: JOI.array().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },
};

export default orderValidation;
