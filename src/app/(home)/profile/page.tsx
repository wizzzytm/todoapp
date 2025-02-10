import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="grid grid-rows-[1fr] justify-items-center min-h-screen md:pb-10 md:pt-8 pt-4 font-[family-name:var(--font-geist-sans)]">
        <section className="md:w-7/12 w-full p-2">
          <div className="fixed bottom-4 right-4">
            <Link href="/">
              <HomeIcon className="md:size-10  size-9" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
