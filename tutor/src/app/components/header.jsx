import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-[#18181b] shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src="/skillsmith.svg"
          alt="Skillsmith logo"
          width={48}
          height={48}
          className="h-12 w-auto"
        />
        <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Skillsmith</span>
      </div>
      <nav className="flex gap-4">
        <a
          href="#about"
          className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          About Us
        </a>
      </nav>
    </header>
  );
}
