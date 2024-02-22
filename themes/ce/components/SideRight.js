import Card from './Card'
import CategoryGroup from './CategoryGroup'
import LatestPostsGroup from './LatestPostsGroup'
import TagGroups from './TagGroups'
import Catalog from './Catalog'
import { InfoCard } from './InfoCard'
import { AnalyticsCard } from './AnalyticsCard'
import CONFIG from '../config'
import dynamic from 'next/dynamic'
import Announcement from './Announcement'
import { useGlobal } from '@/lib/global'
import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'))
const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const {
    post, currentCategory, categories, latestPosts, tags,
    currentTag, showCategory, showTag, rightAreaSlot, notice, className
  } = props

  const { locale } = useGlobal()

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null
  }

  return (
    <div id='sideRight' className={className}>
      <InfoCard {...props} />

      {/* 分类  */}
      {siteConfig('NEXT_RIGHT_CATEGORY_LIST', null, CONFIG) && router.asPath !== '/category' && categoryOptions && (
          <Card>
              <div className='text-sm px-2 flex flex-nowrap justify-between font-light'>
                  <div className='pb-2 text-gray-600 dark:text-gray-300'><i className='mr-2 fas fa-th-list' />{locale.COMMON.CATEGORY}</div>
                  <Link
                      href={'/category'}
                      passHref
                      className='text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>

                      {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />

                  </Link>
              </div>
              <CategoryGroup currentCategory={currentCategory} categories={categoryOptions} />
          </Card>
      )}


      {siteConfig('COMMENT_WALINE_SERVER_URL') && siteConfig('COMMENT_WALINE_RECENT') && <HexoRecentComments/>}

      <div className='sticky top-20'>
        {post && post.toc && post.toc.length > 1 && <Card>
          <Catalog toc={post.toc} />
        </Card>}

        {rightAreaSlot}
        <FaceBookPage/>
        <Live2D />
      </div>

    </div>
  )
}
