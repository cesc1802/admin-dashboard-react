import React from "react";

const Carousel = () => (
  <div className="relative flex-1 bg-white before:absolute before:inset-0 before:bg-32-bit-color-black-box before:content-['']">
    <div className="absolute inset-0 animate-[fade_10s_linear_infinite] bg-login-carousel-1 bg-cover bg-center opacity-0" />
    <div className="absolute inset-0 animate-[fade_10s_linear_infinite_5s] bg-login-carousel-2 bg-cover bg-center opacity-0" />
  </div>
);

export default React.memo(Carousel);
