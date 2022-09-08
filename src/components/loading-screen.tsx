import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import Loading from "@/components/loading";
import { useAppSelector } from "@/hooks";
import { selectAppStatus } from "@/store/reducers/app";

const LoadingScreen = () => {
  const isAppReady = useAppSelector(selectAppStatus);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let shouldUnmountHandler: NodeJS.Timeout;

    if (isAppReady && shouldRender) {
      shouldUnmountHandler = setTimeout(() => setShouldRender(false), 200);
    }

    return () => {
      clearTimeout(shouldUnmountHandler);
    };
  }, [isAppReady]);

  return (
    <Transition
      as={React.Fragment}
      show={shouldRender}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/50">
        <Loading />
      </div>
    </Transition>
  );
};

export default LoadingScreen;
