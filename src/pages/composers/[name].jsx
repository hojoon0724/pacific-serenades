import ComposerComponent from '@/components/ComposerComponent';
import { useRouter } from 'next/router';
import albanBerg from '@/data/composers/adrienneAlbert.json';

export default function ComposerPage({ composer }) {
  const router = useRouter();
  const { name } = router.query;

  const composerData = composer[name];
  return (
    <>
      <ComposerComponent composer={albanBerg} />
    </>
  );
}
