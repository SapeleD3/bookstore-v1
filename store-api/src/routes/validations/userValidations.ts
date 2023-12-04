import JOI from 'joi';
import { RequestProperty } from '../../middleware/types';

const UserValidation = {
  register: {
    schema: JOI.object().keys({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },

  login: {
    schema: JOI.object().keys({
      email: JOI.string().required().trim(),
      password: JOI.string().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },
};

export default UserValidation;
