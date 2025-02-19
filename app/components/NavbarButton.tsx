import Link from "next/link";

export default function NavbarButton({ nameTag , path }) {
    return(
        <div>
            <Link href={path} className="text-xl font-bold">
                {nameTag}
            </Link>
        </div>
    );
}