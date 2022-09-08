import { useMemo, useRef } from "react";

import { isFunction } from "@/utils/mixin";

type Noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends Noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

const useMemoizedFunction = <T extends Noop>(fn: T) => {
  if (process.env.NODE_ENV === "development") {
    if (!isFunction(fn)) {
      // eslint-disable-next-line no-console
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();

  if (!memoizedFn.current) {
    // eslint-disable-next-line func-names
    memoizedFn.current = function (this, ...args) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
};

export default useMemoizedFunction;
