export class CreateChatHistoryDto {
    model: string;
    userId:number;
    prompt: string;
    stream: boolean;
    options: {
      temperature: number;
      max_tokens: number;
    }
}
