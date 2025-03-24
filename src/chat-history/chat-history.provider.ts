import { ChatHistory } from 'src/chat-history/entities/chat-history.entity';
import { DataSource } from 'typeorm';

export const chatHistoryProviders = [
  {
    provide: 'Chat_history_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ChatHistory),
    inject: ['DATA_SOURCE'],
  },
];