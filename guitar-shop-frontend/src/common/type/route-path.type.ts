import { RoutePathEnum } from '../enum/route-path.enum';

export type RoutePathType = typeof RoutePathEnum[keyof typeof RoutePathEnum];
