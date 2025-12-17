import LogoImage from '@/assets/belle-guzellik.png'
import Image from 'next/image'

import { cn } from '@/utils/cn'

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={LogoImage}
      alt="Belle Güzellik"
      className={cn('payload-logo-max-width', className)}
    />
  )
}
