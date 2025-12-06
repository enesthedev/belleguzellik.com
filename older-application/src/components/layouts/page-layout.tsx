import Image from "next/image";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/media/logo.png"
      alt="Belle Güzellik Logo"
      width={280}
      height={112}
      className={`object-contain ${className}`}
      priority
    />
  );
}
