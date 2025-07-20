"use client";
import { Button } from '@/app/ui/shadcn/components/ui/button';

export default function BaseSubmitButton({
  text,
  active,
}: {
  text?: string;
  active?: boolean;
}) {
  const btnText = text || "확인";
  const isActive = active ?? true;

  return (
    <Button type="submit" disabled={!isActive} className="w-full bg-main-base hover:bg-main-base/90 text-sm md:text-base">
      {btnText}
    </Button>
  );
}
