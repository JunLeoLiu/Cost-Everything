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
    <div id="header" className="w-60 h-10 relative md:flex-shrink-0 z-50" >
      <header id='article-header-cover'
            className="bg-black bg-opacity-70 absolute top-0 w-60 h-25 py-2 flex justify-center items-center ">

        <div className='mt-0.5'>
          {/* 文章Title */}
          <div className="leading-snug font-bold xs:text-3xl sm:text-3xl md:text-4xl md:leading-snug text-3xl shadow-text-md flex justify-center text-center text-white">
            <NotionIcon icon={post.pageIcon} className='text-3xl mx-0.5' />{post.title}
          </div>

          <section className="flex-wrap shadow-text-md flex text-sm justify-center mt-2 text-white dark:text-gray-400 font-light leading-6">

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
        </div>
      </header>
    </div>
  )
}
