import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <main
      className={cn(
        'relative z-[1] flex h-full w-full grow flex-col items-center justify-center gap-12 px-4 py-8 sm:gap-32 sm:pt-36',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
