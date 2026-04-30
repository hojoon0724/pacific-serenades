import Markdown from "react-markdown";
import ComposerProfileBlock from "./ComposerProfileBlock";
import ComposerWorksPerformedSection from "./ComposerWorksPerformed";

export default function ComposerComponent({ composer, works }) {
  return (
    <section className="top-container flex flex-col py-6">
      <div className="composer-top-container">
        <ComposerProfileBlock composer={composer} />
        <hr />
        {composer.bio && (
          <div className="composer-bio max-w-prose text-justify">
            <Markdown>{composer.bio}</Markdown>
            <hr />
          </div>
        )}
        <ComposerWorksPerformedSection works={works} />
      </div>
    </section>
  );
}
