import Image from "next/image";

export default function landing({}) {
  return (
    <div className="landing-container">
      <div className="landing-background absolute top-0 left-0 w-full h-[100svh] overflow-clip">
        <Image src="/backgrounds/home-bg.jpg" alt="landing page background image" width={2500} height={2000}></Image>
      </div>
    </div>
  );
}
