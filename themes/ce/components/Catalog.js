import { useCallback, useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import Progress from './Progress'
import { useGlobal } from '@/lib/global'

const Catalog = ({ toc }) => {
  const { locale } = useGlobal()

  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  const tRef = useRef(null)
  const tocIds = []
  const [activeSection, setActiveSection] = useState(null)

  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(throttle(() => {
    const sections = document.getElementsByClassName('notion-h')
    let prevBBox = null
    let currentSectionId = activeSection
    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i]
      if (!section || !(section instanceof Element)) continue
      if (!currentSectionId) {
        currentSectionId = section.getAttribute('data-id')
      }
      const bbox = section.getBoundingClientRect()
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
      const offset = Math.max(150, prevHeight / 4)
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('data-id')
        prevBBox = bbox
        continue
      }
      break
    }
    setActiveSection(currentSectionId)
    const index = tocIds.indexOf(currentSectionId) || 0
    tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
  }, throttleMs))

  if (!toc || toc.length < 1) {
    return <></>
  }

  return (
    <div className='fixed top-40 right-20 px-3 py-1'style={{ width: '250px' }}>
      <div className='w-full'><i className='mr-1 fas fa-stream' />{locale.COMMON.TABLE_OF_CONTENTS}</div>
      <div className='w-full py-3'>
        <Progress />
      </div>
      <div className='overflow-y-auto max-h-36 lg:max-h-96 overscroll-none scroll-hidden' ref={tRef}>
        <nav className='h-full text-black'>
          {toc.map((tocItem) => {
            const id = uuidToId(tocItem.id)
            tocIds.push(id)
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`notion-table-of-contents-item duration-300 transform font-light dark:text-gray-200 notion-table-of-contents-item-indent-level-${tocItem.indentLevel}`}
              >
                <span style={{ display: 'inline-block', marginLeft: tocItem.indentLevel * 16 }}
                  className={`${activeSection === id && ' font-bold text-indigo-600'}`}
                >
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
