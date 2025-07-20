import { Dialog, DialogContent, DialogDescription } from '@/app/ui/shadcn/components/ui/dialog';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { useState } from 'react';
import { redirectToPrev } from '@/app/lib/utils/cookie';

export default function BasicAlert({
  children,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClick) onClick();
    redirectToPrev();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) redirectToPrev();
      }}
    >
      <DialogContent className="max-w-sm min-h-20 flex flex-col items-center py-8">
        <DialogDescription className="text-center text-sm mb-6">
          {children}
        </DialogDescription>
        <Button
          type={type}
          onClick={handleClose}
          className="bg-main-base hover:bg-main-base/90 text-white text-sm"
        >
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
