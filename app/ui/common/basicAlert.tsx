import { Dialog, DialogContent, DialogDescription } from '@/app/ui/shadcn/components/ui/dialog';
import { Button } from '@/app/ui/shadcn/components/ui/button';

export default function BasicAlert({
  children,
  onClick,
  type = 'button',
  open = true,
  onOpenChange,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md flex flex-col items-center py-12">
        <DialogDescription className="text-center min-h-44">
          {children}
        </DialogDescription>
        <Button
          type={type}
          onClick={onClick}
          className="w-24 h-10 bg-main-base text-white rounded-2xl font-bold"
        >
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
