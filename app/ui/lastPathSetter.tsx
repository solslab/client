"use client";

import { useEffect } from "react";
import { usePathname} from "next/navigation";
import {
  updateLastRoute,
} from "@/app/lib/cookie";

const exception = ["/login","/profiles/additional"];

export default function LastPathSetter() {
  const pathName = usePathname();
  useEffect(() => {
    if (!exception.includes(pathName)) {
      updateLastRoute(pathName);
    }
  }, [pathName]); // 라우트가 변경될 때마다 실행

  return <></>;
}
