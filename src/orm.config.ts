import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    database: 'sound-scout',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
}

// May have to hard code username and password. Getting an error using .env