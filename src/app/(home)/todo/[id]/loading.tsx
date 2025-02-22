import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="grid grid-rows-[1fr] justify-items-center min-h-screen md:pb-10 md:pt-8 pt-4 font-[family-name:var(--font-geist-sans)]">
      <section className="md:w-7/12 w-full p-2">
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-2/3 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>

        <div className="fixed bottom-4 right-4">
          <Link href="/">
            <Skeleton className="rounded-full h-10 w-10" />
          </Link>
        </div>
      </section>
    </div>
  );
}
