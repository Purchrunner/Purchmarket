import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className="flex bg-[#DFEDFF] mb-5 p-5 rounded-3xl">
      <div className="mr-5">
        {coverImage && (
          <div className="relative w-48 h-48"> 
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link
            href={`/posts/${slug}`}
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Link>
        </h3>
        <div
          className="text-lg leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="text-lg mb-4">
          <Date dateString={date} />
        </div>
        {/* <Avatar author={author} /> */}
      </div>
    </div>
  )
}
