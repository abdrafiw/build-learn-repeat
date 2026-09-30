import { lazy } from "react";

export function lazyLoad(path: string, namedExport: string | null) {
  if (namedExport === null) {
    return lazy(() => import(path));
  } else {
    return lazy(() =>
      import(path).then((module) => ({ default: module[namedExport] })),
    );
  }
}
