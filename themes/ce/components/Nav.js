import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const Nav = (props) => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()
  const router = useRouter()

  const [categoryOptions, setCategoryOptions] = useState([])

  useEffect(() => {
    // Fetch category options or perform any other necessary actions
    // This is a placeholder for the actual logic
    // Replace it with your code to fetch category options
    const fetchedCategoryOptions = [
      { name: 'Category 1', count: 10 },
      { name: 'Category 2', count: 15 },
      // Add more category options as needed
    ]
    setCategoryOptions(fetchedCategoryOptions)
  }, [])

  let links = [
    { id: 1, icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: siteConfig('CE_MENU_SEARCH', null, CONFIG) },
    { id: 3, icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: siteConfig('CE_MENU_CATEGORY', null, CONFIG) },
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav className="w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-gray-light dark:border-hexo-black-gray dark:bg-black">
      <div className="container mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start">
        <ul className="w-full text-center md:text-left flex flex-wrap justify-center items-stretch md:justify-start md:items-start">
          {links.map((link, index) => (
            <MenuItemDrop key={index} link={link} />
          ))}
        </ul>
        {/* <div className="w-full md:w-1/3 text-center md:text-right"> */}
        {/* <!-- extra links --> */}
        {/* </div> */}
      </div>
    </nav>
  )
}
