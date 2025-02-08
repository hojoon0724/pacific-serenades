import Link from 'next/link';

const subPages = [
  { name: 'All Concerts', href: '/all-concerts' },
  { name: 'Past Seasons', href: '/past-seasons' },
  { name: 'Commissions', href: '/commissions' },
  { name: 'Composers', href: '/composers' },
  { name: 'Musicians', href: '/musicians' },
];

export default function Archives({}) {
  return (
    <div className="top-container mx-4 flex flex-col items-center">
      <h1>Library</h1>

      <div className="sub-page-buttons-container flex flex-col gap-4 mt-8 lg:flex-row">
        {subPages.map(page => (
          <Link href={`/library${page.href}`} key={page.name}>
            <div className="library-button bg-blue-800 text-blue-50 px-8 py-4 rounded-lg text-center">{page.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
