import Link from 'next/link'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 上一篇，下一篇文章
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAdjacent ({ prev, next }) {
  if (!prev || !next || !siteConfig('HEXO_ARTICLE_ADJACENT', null, CONFIG)) {
    return <></>
  }
  return (
    <section className='pt-8 text-gray-800 items-center text-xs md:text-sm flex justify-between m-1 '>
      <Link
        href={`/${prev.slug}`}
        passHref
        className='py-1  cursor-pointer hover:underline justify-start items-center dark:text-white flex w-full h-full duration-200'>

        {prev.title} <i className='mr-1 fas fa-angle-left' /> <span className="mr-1">上一篇</span>

      </Link>
      <Link
        href={`/${next.slug}`}
        passHref
        className='py-1 cursor-pointer hover:underline justify-end items-center dark:text-white flex w-full h-full duration-200'>
        <span className="mr-1">下一篇</span> <i className='ml-1 my-1 fas fa-angle-right' /> {next.title}
        

      </Link>
    </section>
  )
}
