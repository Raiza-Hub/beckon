import AuthNavbar from "./AuthNavbar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <AuthNavbar />

            <div className="flex flex-1 flex-col">{children}</div>
        </div>
    );
}
