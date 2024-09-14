"use client";

import { useCallback, useEffect } from "react";
import { usePathname} from "next/navigation";
import {
  updateLastRoute,
} from "@/app/lib/cookie";

const exception = ["/login","/profiles/additional","/suggestion","/profiles/edit","/testReview"];

export default function LastPathSetter() {
  const pathName = usePathname();
  const containsException = useCallback((path:string)=> {
    return exception.some(exceptionStr => path.includes(exceptionStr));
},[])
  
  useEffect(() => {
    const isContain = containsException(pathName)
    if (!isContain) {
      updateLastRoute(pathName);
    }
  }, [pathName]); // 라우트가 변경될 때마다 실행

  return <></>;
}
