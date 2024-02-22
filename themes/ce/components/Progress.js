import { useEffect, useState } from 'react'
import { isBrowser } from '@/lib/utils'

/**
 * 页面右侧阅读进度条
 * @returns {JSX.Element}
 * @constructor
 */
const Progress = ({ targetRef, showPercent = false }) => {
  const currentRef = targetRef?.current || targetRef
  const [percent, changePercent] = useState(0)

  const scrollListener = () => {
    const target = currentRef || (isBrowser && document.getElementById('article-wrapper'))
    if (target) {
      const clientHeight = target.clientHeight
      const scrollY = window.pageYOffset
      const fullHeight = clientHeight - window.outerHeight
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
      if (per > 100) per = 100
      if (per < 0) per = 0
      changePercent(per)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div className="fixed top-0 right-0 h-full flex flex-col items-center justify-center mr-4">
      <div className="w-4 h-full bg-transparent"></div>
      <div className="w-4 h-64 bg-gray-700 rounded-sm flex flex-col-reverse">
        <div
          className="h-full bg-indigo-600 duration-200 rounded-sm"
          style={{ height: `${percent}%` }}
        >
          {showPercent && (
            <div className="text-center text-white text-xs">{percent}%</div>
          )}
        </div>
      </div>
      <div className="w-4 h-full bg-transparent"></div>
    </div>
  )
}

export default Progress
