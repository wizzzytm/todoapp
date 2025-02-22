import { ChangeNamePreview } from "@/components/ui/auth-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { getName } from "@/app/libs/user";

export default async function Page() {
  const name = await getName();
  return (
    <>
      <div className="grid grid-rows-[1fr] justify-items-center min-h-screen md:pb-10 md:pt-8 pt-4 font-[family-name:var(--font-geist-sans)]">
        <section className="md:w-7/12 w-full p-2">
          <Card className="mx-4">
            <CardHeader className="flex">
              <CardTitle>Profile settings</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-2">
              <div className="p-1">
                <ChangeNamePreview defaultName={name} />
              </div>
            </CardContent>
          </Card>
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
