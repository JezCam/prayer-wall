import { Loader2Icon } from 'lucide-react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LoaderButton({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & { isLoading: boolean }) {
  return (
    <Button
      disabled={isLoading}
      type='submit'
      {...props}
      className={cn('flex justify-center px-3 gap-0', className)}
    >
      <div
        className='transition-all overflow-hidden'
        style={{ width: isLoading ? 'auto' : 0 }}
      >
        {isLoading && <Loader2Icon className='animate-spin w-4 h-4 mr-2' />}
      </div>
      {children}
    </Button>
  )
}
