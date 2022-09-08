import { Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface PageContentProps {
  innerScroll?: boolean;
}

const PageContent = ({ children, innerScroll = false }: PropsWithChildren<PageContentProps>) => (
  <Transition
    as={React.Fragment}
    appear
    show
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <main
      className={classNames("flex flex-1 flex-col bg-base-100", {
        "max-h-full overflow-auto": innerScroll,
      })}
    >
      <div className="flex flex-1 flex-col py-6 px-2 sm:px-6 lg:px-8">{children}</div>
    </main>
  </Transition>
);

export default PageContent;
