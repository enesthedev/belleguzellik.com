import { cn } from '@/utils/cn'

interface AnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Animated({ as: Component = 'div', className, children, ...props }: AnimatedProps) {
  return (
    <Component
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
