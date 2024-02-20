import Link from 'next/link'
import { siteConfig } from '@/lib/config'

/**
 * 网站顶部
 * @returns
 */
export const Header = (props) => {
  return (
<header className="w-full px-6 bg-white dark:bg-black relative z-50 top-0 left-0 sticky">
    <div className="container mx-auto max-w-4xl md:flex justify-start items-center">
        <img src="/images/header-image.png" alt="Header Image" style={{ width: '100px', height: '100px' }} className="mr-4 md:mr-0 md:w-auto md:h-auto" />
        <div className="w-full md:w-auto text-center md:text-right">
            {/* 右侧文字 */}
        </div>
    </div>
</header>

  )
}
