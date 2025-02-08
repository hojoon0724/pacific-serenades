import { Card, CardFooter, Image, Button } from '@nextui-org/react';

export default function ComposerCard({ composer }) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none aspect-square">
      {composer.photo === '' ? (
        <Image src="/icons/person.svg" className="object-cover" alt="person icon" width={200} />
      ) : (
        <Image
          alt={`${composer.fullName} photo`}
          className="object-cover"
          height={200}
          src={composer.photo}
          width={200}
        />
      )}
      <CardFooter className="justify-center bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute backdrop-blur-lg backdrop-brightness-200 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="caption">{composer.fullName}</div>
      </CardFooter>
    </Card>
  );
}
