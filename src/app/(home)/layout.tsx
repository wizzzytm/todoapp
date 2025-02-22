import { BurgerMenu } from "@/components/burger-menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BurgerMenu />
      {children}
    </>
  );
}
