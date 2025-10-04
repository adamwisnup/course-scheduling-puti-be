import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../schemas/*.schema{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
  autoLoadEntities: true,
};

export default config;
