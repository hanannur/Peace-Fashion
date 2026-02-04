// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/Button";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// }

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration error (only render after component is mounted)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Toggle Theme"
    >
      <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}