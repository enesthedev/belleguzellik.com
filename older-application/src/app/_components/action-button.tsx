import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ href, icon, label }: ActionButtonProps) {
  return (
    <Button variant="action" className="relative h-auto w-full rounded-xl px-5 py-4" asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <span className="absolute left-5 shrink-0">{icon}</span>
        <span className="w-full text-center font-medium">{label}</span>
        <span className="sr-only">(yeni sekmede açılır)</span>
      </Link>
    </Button>
  );
}

export function ActionButtons() {
  return (
    <nav aria-label="Hızlı İşlemler" className="flex w-full flex-col gap-4">
      <ActionButton
        href="https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8"
        icon={<MapPin className="size-6 text-gray-700" aria-hidden="true" />}
        label="Yol Tarifi Alın"
      />
      <ActionButton
        href="https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum"
        icon={<Phone className="size-6 text-gray-700" aria-hidden="true" />}
        label="Randevu Alın"
      />
    </nav>
  );
}
