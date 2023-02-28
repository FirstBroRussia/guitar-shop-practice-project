import { ParsePostgresStringInObjectType } from "../type/parse-postgres-string.type";

const ZERO_VALUE = 0;

export const getParsePostgresDbConnectionString = (postgresDbUrl: string): ParsePostgresStringInObjectType => {
  let url = postgresDbUrl;

  url = url.replace('postgresql://', '');

  let targetIndex = url.indexOf(':');

  const username = url.substring(ZERO_VALUE, targetIndex);

  url = url.substring(targetIndex + 1);

  targetIndex = url.indexOf('@');

  const password = url.substring(ZERO_VALUE, targetIndex);

  url = url.substring(targetIndex + 1);

  targetIndex = url.indexOf(':');

  const host = url.substring(ZERO_VALUE, targetIndex);

  url = url.substring(targetIndex + 1);

  targetIndex = url.indexOf('/');

  const port = url.substring(ZERO_VALUE, targetIndex);

  url = url.substring(targetIndex + 1);

  const databaseName = url.substring(0);

  return {
    username,
    password,
    host,
    port: +port,
    databaseName,
  };
};
