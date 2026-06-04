type ClassDictionary = Record<string, boolean | undefined | null>;
type ClassArray = ClassValue[];
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassDictionary
  | ClassArray;

function toClassName(input: ClassValue): string {
  if (!input) return "";

  if (typeof input === "string" || typeof input === "number") {
    return String(input);
  }

  if (Array.isArray(input)) {
    return input.map(toClassName).filter(Boolean).join(" ");
  }

  if (typeof input === "object") {
    return Object.entries(input)
      .filter(([, isEnabled]) => Boolean(isEnabled))
      .map(([className]) => className)
      .join(" ");
  }

  return "";
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.map(toClassName).filter(Boolean).join(" ");
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Format currency
export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

// Check if menu is active based on current pathname
export function isActiveMenu(menuUrl: string, currentPath: string): boolean {
  if (!menuUrl || !currentPath) return false;

  // 1. Jika ini menu hash/scroll (#), abaikan dari pengecekan path
  if (menuUrl.startsWith("#")) return false;

  // 2. Hilangkan trailing slash (/) di akhir untuk komparasi yang aman
  // Contoh: '/dashboard/' menjadi '/dashboard'
  const safeMenuUrl =
    menuUrl.endsWith("/") && menuUrl.length > 1
      ? menuUrl.slice(0, -1)
      : menuUrl;
  const safeCurrentPath =
    currentPath.endsWith("/") && currentPath.length > 1
      ? currentPath.slice(0, -1)
      : currentPath;

  // 3. Cek Exact Match (Cocok 100%)
  if (safeMenuUrl === safeCurrentPath) return true;

  // 4. Jangan biarkan root '/' match dengan halaman lain
  if (safeMenuUrl === "/") return false;

  // 5. Cek Sub-path: Tambahkan '/' agar '/user' tidak ikut aktif di '/users'
  // Akan match untuk: '/reports' dan '/reports/annual'
  return safeCurrentPath.startsWith(`${safeMenuUrl}/`);
}

export const smoothScrolltoSection = (elementId: string) => {
  if (elementId.startsWith("#")) {
    elementId = elementId.substring(1);
  }
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 110;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
