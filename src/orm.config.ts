import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    database: 'sound-scout',
    host: 'localhost',
    port: 5432,
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true
});

export default typeOrmConfig;
