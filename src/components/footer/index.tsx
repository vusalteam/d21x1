import Link from "next/link";
import Navigation from "@/components/header/nav/navigation";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-300 shadow-zinc-700 drop-shadow-lg shadow-ls">
            <Navigation />
        </header>
    )
}
