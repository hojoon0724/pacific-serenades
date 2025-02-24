import Image from "next/image";

export default function landing({}) {
  return (
    <div className="landing-container">
      <div className="landing-background absolute top-0 left-0 w-full h-[100svh] object-cover overflow-clip">
        <Image
          className="object-cover h-full w-full"
          src="/backgrounds/home-bg.jpg"
          alt="landing page background image"
          width={2500}
          height={2000}
        ></Image>
      </div>
    </div>
  );
}
