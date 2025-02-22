import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="grid grid-rows-[20px_1fr] justify-items-center min-h-screen pb-10 gap-8 pt-8  font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex items-center flex-col gap-1  ">
        <Skeleton className="h-6 w-5/12" />
        <Skeleton className="h-4 w-3/12" />
      </div>
      <section className="md:w-7/12 w-full p-2">
        <Skeleton className="h-[100px] w-full rounded-xl mb-2" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
        <div className="fixed bottom-4 right-4">
          <Skeleton className="rounded-full md:size-10  size-9" />
        </div>
      </section>
    </div>
  );
}
