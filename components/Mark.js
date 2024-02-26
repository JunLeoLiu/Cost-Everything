import { loadExternalResource } from '@/lib/utils'

/**
 * 将搜索结果的关键词高亮，并显示文章摘要
 */
export default async function replaceSearchResult({ doms, search, target, summaries }) {
  if (!doms || !search || !target || !summaries) {
    return
  }

  try {
    await loadExternalResource('https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js', 'js')
    const Mark = window.Mark
    if (doms instanceof HTMLCollection) {
      for (let i = 0; i < doms.length; i++) {
        const container = doms[i]
        const re = new RegExp(search, 'gim')
        const instance = new Mark(container)
        instance.markRegExp(re, target)

        // Add summary to the result
        const summary = summaries[i]
        container.appendChild(document.createElement('p')).textContent = summary;
      }
    } else {
      const re = new RegExp(search, 'gim')
      const instance = new Mark(doms)
      instance.markRegExp(re, target)

      // Add summary to the result
      const summary = summaries[0]
      doms.appendChild(document.createElement('p')).textContent = summary;
    }
  } catch (error) {
    console.error('markjs 加载失败', error)
  }
}
