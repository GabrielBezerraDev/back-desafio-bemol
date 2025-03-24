import { Module } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { ChatHistoryController } from './chat-history.controller';
import { HttpModule } from '@nestjs/axios';
import { chatHistoryProviders } from './chat-history.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [HttpModule,DatabaseModule],
  controllers: [ChatHistoryController],
  providers: [
    ...chatHistoryProviders,
    ChatHistoryService
  ],
})
export class ChatHistoryModule {}
