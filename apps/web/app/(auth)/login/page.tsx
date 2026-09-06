import Link from "next/link";
import GoogleSignInButton from "~/app/components/auth/GoogleSigInButton";

const Page = () => {
  return (
    <main className="flex flex-col items-center px-4 pt-10 pb-16">
      <div className="flex w-full max-w-sm flex-col space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Log in to your account
          </p>
        </div>

        <GoogleSignInButton redirectTo="/" />

        <Link
          href="/register"
          className="text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Don't have an account? Register
        </Link>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link href="/terms" className="text-secondary-foreground hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-secondary-foreground hover:underline">
            Privacy Policy.
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;