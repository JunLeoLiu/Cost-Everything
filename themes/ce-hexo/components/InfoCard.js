import { useRouter } from 'next/router'
import Card from './Card'
import SocialButton from './SocialButton'
import MenuGroupCard from './MenuGroupCard'
import { siteConfig } from '@/lib/config'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { className, siteInfo } = props
  const router = useRouter()

  return (
    <Card className={className}>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* 添加的 flex 容器 */}
        <a href="/" className="icon-wrapper" style={{ height: '3.3rem', width: '3.8rem', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ height: '2.8rem', width: '3.3rem', border: 'solid 3px #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Helvetica Neue', fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>CE</span>
          </div>
        </a>
      </div>
      <br></br>
      <div className='font-medium text-center text-xl pb-4'>{siteConfig('AUTHOR')}</div>
      <div className='text-sm text-center'>邮件: CE@costeverything.com</div>
      <div className='text-sm text-center'>{siteConfig('BIO')}</div>
      <MenuGroupCard {...props} />
      <SocialButton />
    </Card>
  )
}
