import GithubAccessTokenEmail from '@/components/email-template';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [`${process.env.MY_EMAIL_ADDRESS}`],
            subject: 'New Template',
            // react: EmailTemplate({ firstName: 'John' }),
            // html: `<h1>Hello World2</h1>`
            react: GithubAccessTokenEmail({ username: "johndoe" })
        });

        if (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}