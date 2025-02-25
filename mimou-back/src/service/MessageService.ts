import Message from "../model/Message";
import Person from "../model/Person";
import MessageRepository from "../repository/MessageRepository";

import MessagesQuantityIsNotAccept from "../errors/MessagesQuantityIsNotAccept";
import { measureMemory } from "vm";

export default class MessageService{

    private messageRepository: MessageRepository = new MessageRepository();

    public async save(message: string[], person: Person){
        if(message.length === 1 || message.length === 3){
            const messages: Message[] = message.map( msg => new Message(msg, person));

            this.messageRepository.save(messages)
        }else{
            throw new MessagesQuantityIsNotAccept("Not accept this number of messages");
        }
    }

    public async findMessagesByPersonId(id: number){
        const messages = await this.messageRepository.findMessagesByPersonId(id);

        return messages.map(message => message.phrase);
    }
}