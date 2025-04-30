import Image from "next/image";

export default function landing({}) {
  return (
    <div className="landing-container w-full h-full relative">
      {/* <div className="text-block absolute z-50 border-5 p-4 bg-white/90 rounded shadow-md top-1/4 left-1/2 transform -translate-x-1/2 text-center"></div> */}
      <div className="landing-background fixed top-0 left-0 w-full h-screen z-0">
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
