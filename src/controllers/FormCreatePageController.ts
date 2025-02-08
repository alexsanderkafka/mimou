import { JsonController, Post, Get, UploadedFiles, UploadedFile, UseAfter, Body, Res, Req} from "routing-controllers";
import fileUpload from "../middlewares/SaveImages";

import FormDTO from "../dto/FormDTO";
import PersonService from "../service/PersonService";
import ImageService from "../service/ImageService";
import EmptyField from "../errors/EmptyField";
import PaymentService from "../service/PaymentService";
import MessageService from "../service/MessageService";

@JsonController("/create")
class FormCreatePageController {

    private personService: PersonService = new PersonService();
    private imageService: ImageService = new ImageService();
    private paymentService: PaymentService = new PaymentService();
    private messageService: MessageService = new MessageService();
    

    @Post()
    public async create(@Body( {required: true} ) dto: any, @UploadedFiles("files", { options: fileUpload() }) files: Express.Multer.File[], @Res() res: any, @Req() req: Request): Promise<any | Error>{ 
        const data: FormDTO = JSON.parse(dto.form);

        if(!data.email || !data.name || !data.message || !data.plan){
            throw new EmptyField("Empty field");
        }

        const person = await this.personService.create(data);

        await this.imageService.save(files, person);
        await this.messageService.save(data.message, person);


        const response = await this.paymentService.createCheckoutPro(person.getEmail(), "http://localhost:3000", data.plan, person.getId());

        return res.status(200).send(response);
    }

}

export default FormCreatePageController;