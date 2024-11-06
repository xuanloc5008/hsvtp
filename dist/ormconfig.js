"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
    type: process.env.TYPE ?? 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) ?? 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    bigNumberStrings: true,
    multipleStatements: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/*.js'],
    migrationsRun: true,
    ssl: {
        rejectUnauthorized: false,
    },
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=ormconfig.js.map