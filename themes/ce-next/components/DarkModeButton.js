import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/themes/theme'

const DarkModeButton = () => {
  const { isDarkMode, updateDarkMode } = useGlobal()
  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToCookies(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  // 定义图标的颜色
  const iconColorClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <div className='z-10 duration-200 text-xs cursor-pointer py-1.5 px-1'>
      <i id='darkModeButton' 
         className={`hover:scale-125 transform duration-200 fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} ${iconColorClass}`}
         onClick={handleChangeDarkMode} />
    </div>
  )
}
export default DarkModeButton
