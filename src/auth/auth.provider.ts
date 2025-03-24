import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const chatHistoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];