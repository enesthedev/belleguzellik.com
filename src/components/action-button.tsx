import { cn } from '@/utils/cn'
import Link from 'next/link'

interface ActionButtonProps {
  href: string
  label: string
  icon?: React.ReactNode
  className?: string
}

export function ActionButton({ href, label, icon, className }: ActionButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex w-full items-center justify-between px-6 py-4 rounded-xl border border-stone-200 bg-white transition-all relative hover:border-neutral-800 active:scale-[0.98]',
        className,
      )}
    >
      {icon && (
        <div className="flex size-5 absolute left-5 items-center justify-center text-neutral-800 transition-colors">
          {icon}
        </div>
      )}
      <div className="flex justify-center items-center w-full">
        <span className="font-medium text-center text-stone-700 transition-colors group-hover:text-stone-900">
          {label}
        </span>
      </div>
    </Link>
  )
}
