import React from "react";

import PageContent from "@/components/page-content";
import { appConfig } from "@/configs/app";

const HomePage = () => (
  <PageContent>
    <div className="hero flex-1">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-5xl font-bold">{appConfig.name}</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet similique,
            exercitationem nobis, iste nemo laudantium illum deserunt facere quasi omnis ullam a!
            Maiores, sequi ea? Error officiis repudiandae dolorum eos.
          </p>
        </div>
      </div>
    </div>
  </PageContent>
);

export default HomePage;
