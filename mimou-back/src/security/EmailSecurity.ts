import bcrypt from 'bcrypt';

export default abstract class EmailSecurity{

    public static async hashEmail(email: string): Promise<string>{
        const saltRounds = 10;
        const hash = await bcrypt.hash(email, saltRounds);

        return hash.replace(/\//g, '_');
    }

    public static async compareEmail(email: string, hashedEmail: string): Promise<boolean> {
        return await bcrypt.compare(email, hashedEmail.replace(/_/g, '/'));
    }
}