import ThemeSwitcher from "@/features/theme/ui/themeSwitcher";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ThemeSwitcher />
    </div>
  );
}
