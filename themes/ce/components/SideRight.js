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
import Link from 'next/link'

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
    currentTag, showCategory=1, showTag, rightAreaSlot, notice, className
  } = props

  const { locale } = useGlobal()

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null
  }

  return (
    <div id='sideRight' className={className}>
      <InfoCard {...props} />
      {siteConfig('HEXO_WIDGET_ANALYTICS', null, CONFIG) && <AnalyticsCard {...props} />}

      {showCategory && (
        <Card>
          <div className='ml-2 mb-1 '>
            <i className='fas fa-th' /> {locale.COMMON.CATEGORY}
          </div>
          <div id="category-list" className="duration-200 flex flex-wrap mx-8">
            {categoryOptions?.map(category => (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div
                  className={
                    'duration-300 dark:hover:text-white rounded-lg px-5 cursor-pointer py-2 hover:bg-indigo-400 hover:text-white'
                  }
                >
                  <i className="mr-4 fas fa-folder" />
                  {category.name}({category.count})
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {showTag && (
        <Card>
          <TagGroups tags={tags} currentTag={currentTag} />
        </Card>
      )}

      {siteConfig('HEXO_WIDGET_LATEST_POSTS', null, CONFIG) && latestPosts && latestPosts.length > 0 && <Card>
        <LatestPostsGroup {...props} />
      </Card>}

      <Announcement post={notice}/>

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
