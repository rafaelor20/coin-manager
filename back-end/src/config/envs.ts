import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import fs from 'fs';
import path from 'path';

export function loadEnv() {
  const env = process.env.NODE_ENV;

  let specificFile = '.env.local';
  if (env === 'test') {
    specificFile = '.env.test';
  } else if (env === 'compose' || env === 'docker' || env === 'production') {
    specificFile = '.env.compose';
  } else if (env === 'local' || env === 'development') {
    specificFile = '.env.local';
  }

  // 1. Carrega o arquivo de ambiente específico como base (.env.local, .env.compose, .env.test)
  const specificPath = path.resolve(process.cwd(), specificFile);
  if (fs.existsSync(specificPath)) {
    const specificEnvs = dotenv.config({ path: specificPath });
    dotenvExpand.expand(specificEnvs);
  } else {
    const fallbackEnvs = dotenv.config({ path: specificFile });
    dotenvExpand.expand(fallbackEnvs);
  }

  // 2. Prioridade máxima: Arquivo .env comum (sobrescreve variáveis do específico se estiverem presentes)
  const commonPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(commonPath)) {
    const commonEnvs = dotenv.config({ path: commonPath, override: true });
    dotenvExpand.expand(commonEnvs);
  }

  // Expande variáveis interpoladas no process.env (ex: DATABASE_URL com ${POSTGRES_USER})
  dotenvExpand.expand({ parsed: process.env } as any);
}
