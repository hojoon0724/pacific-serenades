import Image from "next/image";
import Link from "next/link";

export default function StaffBioBlock({ staff }) {
  return (
    <div className="staff-photo-container flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-5xl mx-auto bg-blue-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Photo - Full width on mobile, balanced on medium screens, wider on large screens */}
      <div className="staff-photo w-full md:w-2/5 lg:w-2/5 flex-shrink-0 h-auto">
        <div className="relative rounded-lg overflow-hidden shadow-sm h-full">
          <Image
            src={staff.photo}
            alt={staff.name}
            height={750}
            width={750}
            className="object-cover w-full h-full"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
      </div>

      {/* Bio text area - Adjusted to balance with photo */}
      <div className="bio-text-area flex-1 px-0 sm:px-4 h-full flex flex-col">
        <div className="staff-photo-name-title-container border-b border-blue-200 pb-4 mb-4">
          <h3 className="staff-name text-2xl font-bold text-blue-900">{staff.name}</h3>
          <div className="staff-title text-lg font-medium text-blue-700 mt-1">{staff.title}</div>
        </div>
        <div className="staff-bio-container prose prose-sm sm:prose md:prose-md lg:prose-lg max-w-prose text-left flex-grow">
          <p className="text-gray-800 leading-relaxed">{staff.bio}</p>
        </div>
        {staff.website && (
          <div className="staff-website-link-container mt-5 pt-2">
            <Link
              href={staff.website}
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
