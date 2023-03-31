import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const config: TypeOrmModuleOptions = {
    type: "mariadb",
    database: "DevOpsdb",

    synchronize: true, //only for Debug or it will completly wrap the Database on each change
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    logging: true,
    autoLoadEntities: true
}

