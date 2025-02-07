import HtmlParagraph from '../HtmlParagraph';
import ComposerProfileBlock from './ComposerProfileBlock';
import ComposerWorksPerformedSection from './ComposerWorksPerformed';

export default function ComposerComponent({ composer, works }) {
  return (
    <section className="top-container flex flex-col py-6">
      <div className="composer-top-container">
        <ComposerProfileBlock composer={composer} />
        {composer.bio !== '' ? (
          <>
            <hr />
            <HtmlParagraph html={composer.bio} className={'composer-bio-container'} />
          </>
        ) : (
          ''
        )}
        <hr />
        <ComposerWorksPerformedSection works={works} />
      </div>
    </section>
  );
}
