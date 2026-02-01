import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
// import tailwindConfig from '../tailwind.config';

interface ForgotPasswordEmailProps {
    username?: string;
}

const baseUrl = "https://demo.react.email";

export const ForgotPasswordEmail = ({
    username,
}: ForgotPasswordEmailProps) => (
    <Html>
        <Head />
        {/* <Tailwind config={tailwindConfig}> */}
        <Tailwind>
            <Body className="bg-white text-[#24292e] font-github">
                <Preview>
                    TrueDamage.gg password recovery
                </Preview>
                <Container className="max-w-120 mx-auto my-0 pt-5 pb-12 px-0">
                    {/* <Img
                        src={`${baseUrl}/static/github.png`}
                        width="32"
                        height="32"
                        alt="Github"
                    /> */}

                    <Text className="text-[24px] leading-tight">
                        {/* <strong>@{username}</strong>, a personal access was created on your
                        account. */}
                        TrueDamage.gg
                    </Text>

                    <Section className="p-6 border border-solid border-[#dedede] rounded-[5px] text-center">
                        <Text className="mb-2.5 mt-0 text-left">
                            Hey <strong>{username}</strong>!
                        </Text>
                        <Text className="mb-2.5 mt-0 text-left">
                            We received a reqest to change your password. If you did not request the password change, please ignore this message.
                        </Text>

                        <Button className="text-sm bg-[#28a745] text-white leading-normal rounded-lg py-3 px-6">
                            Reset password
                        </Button>
                    </Section>
                    <Text className="text-center">
                        <Link className="text-[#0366d6] text-[12px]">Contact support</Link>
                    </Text>

                    <Text className="text-[#6a737d] text-xs leading-6 text-center mt-15 mb-4">
                        TrueDamage.gg
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

ForgotPasswordEmail.PreviewProps = {
    username: 'alanturing',
} as ForgotPasswordEmailProps;

export default ForgotPasswordEmail;
