/**
 * Configuração de ambiente para desenvolvimento e produção
 */

export interface Config {
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
  port: number | string;
  host: string;
  trustProxy: number | string;
  logLevel: string;
  cacheAssets: {
    maxAge: string;
    etag: boolean;
  };
  compression: {
    level: number | string;
    threshold: number | string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  // Ambiente
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Servidor
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',

  // Segurança
  trustProxy: parseInt(process.env.TRUST_PROXY || '1'),

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // Cache
  cacheAssets: {
    maxAge: process.env.CACHE_MAX_AGE || '30d',
    etag: false
  },

  // Compressão
  compression: {
    level: parseInt(process.env.COMPRESSION_LEVEL || '6'),
    threshold: parseInt(process.env.COMPRESSION_THRESHOLD || '1024')
  },

  // Rate Limiting (futuro)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite por janela
  }
};

export default config;
