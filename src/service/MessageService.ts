import Message from "../model/Message";
import Person from "../model/Person";
import MessageRepository from "../repository/MessageRepository";

export default class MessageService{

    private messageRepository: MessageRepository = new MessageRepository();

    public async save(message: string, person: Person){
        const currentMessage: Message = new Message(message, person);

        this.messageRepository.save(currentMessage);
    }

    public async findMessagesByPersonId(id: number){
        const messages = await this.messageRepository.findMessagesByPersonId(id);

        return messages.map(message => message.phrase);
    }
}