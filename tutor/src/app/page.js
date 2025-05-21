import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center w-full">
        <div className="flex justify-center w-full">
          <Image
            className="dark:invert"
            src="/skillsmith.svg"
            alt="Skillsmith logo"
            width={260}
            height={60}
            priority
          />
        </div>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            study with AI, your personal tutor.
            .
          </li>
          <li className="tracking-[-.01em]">
            create your own resume
          </li>
        </ol>

        {/* Feature Options Section */}
        <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {/* Video Summarizer */}
          <a href="/video-summarizer" className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white dark:bg-[#18181b] hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 focus:outline-none">
            <Image
              src="/file.svg"
              alt="Video Summarizer"
              width={40}
              height={40}
              className="mb-3"
            />
            <span className="font-semibold text-lg mb-1">Video Summarizer</span>
            <span className="text-gray-500 text-sm">
              Summarize any video content quickly and easily.
            </span>
          </a>
          {/* Resume Maker */}
          <a href="/resume-maker" className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white dark:bg-[#18181b] hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 focus:outline-none">
            <Image
              src="/file.svg"
              alt="Resume Maker"
              width={40}
              height={40}
              className="mb-3"
            />
            <span className="font-semibold text-lg mb-1">Resume Maker</span>
            <span className="text-gray-500 text-sm">
              Create a professional resume in minutes.
            </span>
          </a>
          {/* Debugger */}
          <a href="/debugger" className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white dark:bg-[#18181b] hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 focus:outline-none">
            <Image
              src="/window.svg"
              alt="Debugger"
              width={40}
              height={40}
              className="mb-3"
            />
            <span className="font-semibold text-lg mb-1">Debugger</span>
            <span className="text-gray-500 text-sm">
              Find and fix code issues with ease.
            </span>
          </a>
          {/* AI Help Bot */}
          <a href="/ai-help-bot" className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white dark:bg-[#18181b] hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 focus:outline-none">
            <Image
              src="/globe.svg"
              alt="AI Help Bot"
              width={40}
              height={40}
              className="mb-3"
            />
            <span className="font-semibold text-lg mb-1">AI Help Bot</span>
            <span className="text-gray-500 text-sm">
              Get instant help and answers from AI.
            </span>
          </a>
        </section>
        {/* End Feature Options Section */}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            feedback
          </a>
        </div>
      </main>
    </div>
  );
}
