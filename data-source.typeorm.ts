import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import * as entities from './src/entities'

dotenv.config()

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: Object.values(entities),
  migrations: ['dist/src/migrations/*.js'],
})
