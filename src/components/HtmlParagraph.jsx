export default function HtmlParagraph({ html, className }) {
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }}></div>;
}
