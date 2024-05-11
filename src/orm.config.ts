import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    database: 'sound-scout',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'EZ#@51u!Rm&bEJVvTrq9',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
}