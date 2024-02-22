import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import NotionIcon from '@/components/NotionIcon'
import LazyImage from '@/components/LazyImage'
import { formatDateFmt } from '@/lib/formatDate'
import { siteConfig } from '@/lib/config'

export default function PostHeader({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()

  if (!post) {
    return <></>
  }

  // 文章全屏隐藏标头
  if (fullWidth) {
    return <div className='my-8'/>
  }

  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

  return (
    <div id="header" className="w-full h-48 relative md:flex-shrink-0 z-10 flex items-center justify-between" >
      {/* 封面图 */}
      <div className="w-24 h-24 mr-4">
        <LazyImage priority={true} src={headerImage} className='w-full h-full object-cover object-center'/>
      </div>

      <header id='article-header-cover'
            className="bg-black bg-opacity-70 w-full h-48 py-10 flex flex-col justify-center items-start ">

        {/* 文章标题 */}
        <div className='mt-2'>
          <div className="leading-snug font-bold xs:text-4xl sm:text-4xl md:text-5xl md:leading-snug text-4xl shadow-text-md flex justify-center text-center text-white">
            <NotionIcon icon={post.pageIcon} className='text-4xl mx-1' />{post.title}
          </div>
        </div>

        {/* 其他信息 */}
        <section className="flex-wrap shadow-text-md flex text-sm justify-center mt-2 text-white dark:text-gray-400 font-light leading-8">
          <div className='flex justify-center dark:text-gray-200 text-opacity-70'>
            {post?.type !== 'Page' && (
              <>
                <span className="pl-1 mr-2">
                  {locale.COMMON.POST_TIME}: {post?.publishDay}
                </span>
              </>
            )}
            <div className="pl-1 mr-2">
              {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedDay}
            </div>
          </div>

          {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && <div className="busuanzi_container_page_pv font-light mr-2">
            {locale.COMMON.VIEWS}
            <span className="mr-2 busuanzi_value_page_pv" />
          </div>}
        </section>
      </header>
    </div>
  )
}
