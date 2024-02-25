import { useGlobal } from '@/lib/global'
import { useState } from 'react'
import { Draggable } from './Draggable'
import { THEMES } from '@/themes/theme'
import { useRouter } from 'next/router'
import DarkModeButton from './DarkModeButton'
import { getQueryParam } from '@/lib/utils'
import LANGS from '@/lib/lang'

const ThemeSwitch = () => {
  const { theme, lang, changeLang, locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const currentTheme = getQueryParam(router.asPath, 'theme') || theme
  const [isLoading, setIsLoading] = useState(false)

  const onLangSelectChange = (e) => {
    const newLang = e.target.value
    changeLang(newLang)
  }

  return (
    <>
      <Draggable>
        <div id="draggableBox" style={{ left: '0px', top: '80vh' }} className="fixed group space-y-2 overflow-hidden z-50 p-3 flex flex-col items-start dark:text-white bg-gray-50 dark:bg-black rounded-xl shadow-lg border dark:border-gray-800">
          <div className="text-sm flex items-center w-0 group-hover:w-32 transition-all duration-200">
            <DarkModeButton />
            <div onClick={toggleDarkMode} className='cursor-pointer w-0 group-hover:w-24 transition-all duration-200 overflow-hidden whitespace-nowrap pl-1 h-auto'>{isDarkMode ? locale.MENU.DARK_MODE : locale.MENU.LIGHT_MODE}</div>
          </div>

          <div className="text-sm flex items-center group-hover:w-32 transition-all duration-200">
            <i className="fa-solid fa-language w-5" />
            <div className='w-0 group-hover:w-24 transition-all duration-200 overflow-hidden'>
              <label htmlFor="langSelect" className="sr-only">选择语言：</label>
              <select id="langSelect" value={lang} onChange={onLangSelectChange} name="themes" className='pl-1 bg-gray-50 dark:bg-black appearance-none outline-none dark:text-white uppercase cursor-pointer'>
                {Object.keys(LANGS)?.map(t => {
                  return <option key={t} value={t}>{LANGS[t].LOCALE}</option>
                })}
              </select>
            </div>
          </div>
        </div>
      </Draggable>

      <div className={`${isLoading ? 'opacity-90 ' : 'opacity-0'} 
            w-screen h-screen glassmorphism bg-black text-white shadow-text flex justify-center items-center
            transition-all fixed top-0 left-0 pointer-events-none duration-1000 z-50 shadow-inner`}>
        <i className='text-3xl mr-5 fas fa-spinner animate-spin' />
      </div>
    </>
  )
}

export default ThemeSwitch
