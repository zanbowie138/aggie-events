import { ReactNode } from "react";

export default function ParallaxBanner({
  imgSrc,
  imgAlt,
  children,
}: {
  imgSrc: string;
  imgAlt: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative w-full h-[450px] overflow-hidden -z-[-50] bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      {children}
    </div>
  );
}
