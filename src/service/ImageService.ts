import Images from "../model/Images";
import Person from "../model/Person";
import imageRepository from "../repository/ImageRepository";

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import EmailSecurity from "../security/EmailSecurity";

export default class ImageService{

    private imageRepository: imageRepository = new imageRepository();

    public async save(files: Express.Multer.File[], person: Person){
        const imagesInFirebase = await this.saveImagesInFirebase(files, person.getEmail());
        const currentImages: Images[] = imagesInFirebase.map( file => new Images(file, person));

        this.imageRepository.save(currentImages);
    }

    public async findImagesUrlByPersonId(id: number){
        const images = await this.imageRepository.findImagesUrlByPersonId(id);

        return images.map(image => image.url);
    }

    private async saveImagesInFirebase(files: Express.Multer.File[], email: string): Promise<string[]>{
        const storage = getStorage();

        const cryptEmail = await EmailSecurity.hashEmail(email);
        
        return await Promise.all(files.map(async (file) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const storageRef = ref(storage, `upload/${cryptEmail}/file-${uniqueSuffix}`);
            const metadata = {
                contentType: file.mimetype
            }

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

            return await getDownloadURL(snapshot.ref);
        }));
    }

}