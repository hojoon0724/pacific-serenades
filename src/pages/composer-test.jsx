import ComposerSection from '@/sections/ComposerSection';
import eugene from '../data/composers/eugeneFriesen.json';

export default function CompserTest() {
  console.log(eugene);
  return <ComposerSection composer={eugene} />;
}
