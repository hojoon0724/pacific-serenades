import { Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";

export default function ComposerCard({ composer }) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none aspect-square">
      {composer.photo === "" ? (
        <Image src="/icons/person.svg" className="object-cover" alt="person icon" width={200} height={200} />
      ) : (
        <Image
          src={composer.photo}
          alt={`${composer.fullName} photo`}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="200px"
        />
      )}
      <CardFooter className="justify-center bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute backdrop-blur-lg backdrop-brightness-200 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="caption">{composer.fullName}</div>
      </CardFooter>
    </Card>
  );
}
