import ScratchComponent from '@/components/ScratchComponent';
import Composer from '@/components/ComposerComponent';
import albanBerg from '@/data/composers/adrienneAlbert.json';

export default function Composers() {
  return (
    <section>
      <Composer composer={albanBerg} />
    </section>
  );
}
