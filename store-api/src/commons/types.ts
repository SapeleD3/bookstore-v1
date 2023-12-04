import { Prisma } from '@prisma/client';
import {
  DynamicClientExtensionThis,
  InternalArgs,
} from '@prisma/client/runtime/library';
import { Router } from 'express';

type Routings = {
  api?: Router;
  webhook?: Router;
};

export type ServerProperties = {
  port?: number;
  routes: Routings;
};

export type ExtendedPrisma = DynamicClientExtensionThis<
  Prisma.TypeMap<
    InternalArgs & {
      result: {};
      model: {};
      query: {};
      client: {};
    }
  >,
  Prisma.TypeMapCb,
  {
    result: {};
    model: {};
    query: {};
    client: {};
  }
>;
