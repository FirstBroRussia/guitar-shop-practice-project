import { CliEnvInterface } from "./cli-env.interface";

export interface ConfigInterface {
  get<T extends keyof CliEnvInterface>(key: T): CliEnvInterface[T];
}
