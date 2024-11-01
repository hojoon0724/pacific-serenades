import ComposerComponent from '@/components/ComposerComponent';
import albanBerg from '@/data/composers/adrienneAlbert.json';

export default function CompserTest() {
  return (
    <section>
      <ComposerComponent composer={albanBerg} />
    </section>
  );
}
