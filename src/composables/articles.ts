/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ARTICLES_DOMAIN } from './constant'

export const getArticles = () => {
  const articles: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const load = async () => {
    try {
      loading.value = true

      const fetchPromise = await fetch(ARTICLES_DOMAIN)
      if (!fetchPromise.ok) {
        const errorInfo = await fetchPromise.json()

        error.value = errorInfo
        throw new Error('Something went wrong')
      }
      const data = await fetchPromise.json()

      articles.value = data
      loading.value = false
    }
    catch (e) {
      console.log(e)
    }
  }

  return { articles, loading, error, load }
}

export const getSingleArticle = (search: string) => {
  const article: Ref<any> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const load = async () => {
    try {
      loading.value = true

      const fetchPromise = await fetch(`${ARTICLES_DOMAIN}/${search}`)
      if (!fetchPromise.ok) {
        const errorInfo = await fetchPromise.json()

        error.value = errorInfo
        throw new Error('Something went wrong')
      }
      const data = await fetchPromise.json()

      article.value = data
      loading.value = false
    }
    catch (e) {
      console.log(e)
    }
  }

  return { article, loading, error, load }
}
