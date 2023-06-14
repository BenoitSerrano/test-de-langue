import { DataSource } from 'typeorm';
import { config } from './config';
import { Exam } from './modules/exam';
import { QuestionChoixMultiple } from './modules/questionChoixMultiple';

console.log('HERE');
console.log(config);
const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    logging: true,
    entities: [Exam, QuestionChoixMultiple],
    subscribers: [],
    migrations: ['**/migrations/*.js'],
});
console.log('THERE');

export { dataSource };
