import PacSerWideLockup from '@/components/PacSerWideLockup';
import Landing from '@/sections/Landing';
import WaveBg from '@/components/WaveBg';
import Image from 'next/image';
import ComposerSection from '@/sections/ComposerSection';
import albanBerg from '../data/composers/albanBerg.json';

export default function Home() {
  return (
    <div className="top-container flex flex-col justify-center items-center">
      <Landing />
      <ComposerSection composer={albanBerg} />
    </div>
  );
}
