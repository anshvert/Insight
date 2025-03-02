import LoginWithGoogle from "@/components/ui/LoginWithGoogle";
import LoginWithGithub from "@/components/ui/LoginWithGitHub";
import { doSocialLogin } from "@/app/actions";

const Login = () => {
    return (
        <form action={doSocialLogin}>
            <LoginWithGoogle></LoginWithGoogle>
            <LoginWithGithub></LoginWithGithub>
        </form>
    )
}

export default Login