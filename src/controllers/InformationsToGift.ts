import { JsonController, Get, Param, Res} from "routing-controllers";
import PersonService from "../service/PersonService";
import ImageService from "../service/ImageService";
import MessageService from "../service/MessageService";
import GiftDTO from "../dto/GiftDTO";

@JsonController('/informations')
class InformantiosToGift{

    private personService: PersonService = new PersonService();
    private imageService: ImageService = new ImageService();
    private messageService: MessageService = new MessageService();

    @Get("/:id/:name")
    public async getInformations(@Param("id") id: number, @Param("name") name: string, @Res() res: Response){
        const url = `/${id}/${name}`;

        const person = await this.personService.findPersonByCustomUrl(url);

        const urlImages = await this.imageService.findImagesUrlByPersonId(person.getId());
        const phrases = await this.messageService.findMessagesByPersonId(person.getId());

        const dto: GiftDTO = JSON.parse(JSON.stringify({
            url: urlImages,
            phrases: phrases,
            name: person.getName()
        }));

        return dto;
    }
}

export default InformantiosToGift;