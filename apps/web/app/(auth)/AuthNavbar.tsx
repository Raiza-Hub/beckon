import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
    return (
        <nav className="z-50">
            <div className="flex h-16 items-center justify-between px-6">
                <Link href="/">
                    <Image
                        src="/beckon-logo.png"
                        width={100}
                        height={20}
                        alt="Beckon"
                        priority
                    />
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
