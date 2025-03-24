import { Inject, Injectable } from '@nestjs/common';
import { CreateChatHistoryDto } from './dto/create-chat-history.dto';
import { UpdateChatHistoryDto } from './dto/update-chat-history.dto';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { ChatHistory } from './entities/chat-history.entity';

@Injectable()
export class ChatHistoryService {

  constructor(private httpService: HttpService, @Inject("CACHE_MANAGER") private cacheManager: Cache, @Inject('Chat_history_REPOSITORY') private chatHistoryRepository: Repository<ChatHistory>) { }

  async create(createChatHistoryDto: CreateChatHistoryDto) {
    let cache = await this.cacheManager.get("chat") as unknown as CreateChatHistoryDto[];
    let message: string = `
    Context: you are an AI attendant for a virtual store called Bemol Digital. You ALWAYS have to talk to the user like an attendant and treat them like a customer, regardless of their prompt. If the user's prompt goes beyond this scope, always return to the context that you are a virtual attendant for Bemol Digital. Therefore, the issues you have to deal with the user must be related to this scope, in this case, customer complaints, questions about the store's services, questions about electronics sold by the store, and so on. And another thing, this store is Brazilian and always responds to the customer IN PORTUGUESE. What I have written so far was just context. Now I will give you the history of what the customer has already talked to you about at other times to give you context for past conversations. If there is nothing, it is because it is an empty JSON list and it means that the customer is having a NEW conversation with you, to ask a new question about products, services, complaints, etc. from Bemol Digital:
      ${JSON.stringify(cache)}

      Now this is the customer's current question:
      ${createChatHistoryDto.message}

      Always take into account what I instruct you to respond to the customer's prompt.
    `;
    if (!cache) cache = [];
    // let teste = await new Promise((resolve, reject) => {
    //   this.httpService.post("http://localhost:80/api/generate", {
    //     "model": "deepseek-r1:14b",
    //     "prompt": message,
    //     "stream": false,
    //     "options": {
    //       "temperature": 0.7,
    //       "max_tokens": 100000
    //     }
    //   }).subscribe({
    //     next: (response) => {
    //       console.log(cache);
    //       cache.push(response.data.response);
    //       this.cacheManager.set("chat", cache);
    //       resolve(response.data);
    //     },
    //     error: (error) => reject(error)
    //   });
    // });
    let chatHistory = new ChatHistory();
    chatHistory.content = createChatHistoryDto.message;
    chatHistory.userId = createChatHistoryDto.userId;
    let testedb = await this.chatHistoryRepository.save(chatHistory)

    return testedb;
  }

  findAll() {
    return `This action returns all chatHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatHistory`;
  }

  update(id: number, updateChatHistoryDto: UpdateChatHistoryDto) {
    return `This action updates a #${id} chatHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatHistory`;
  }
}
