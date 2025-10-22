import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin"
        description="Sign in to your TailAdmin account"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
