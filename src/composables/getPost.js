import { ref } from '@vue/reactivity'
import { projectFirestore } from '../firebase/config'
import { useRouter } from 'vue-router'

const getPost = (id) => {
  const post = ref(null)
  const error = ref(null)
  const router = useRouter()

  const load = async () => {
    try {      
      const res = await projectFirestore.collection('posts').doc(id).get()
      if (!res.exists) {
        throw Error("Post does not exist")
      }
      post.value = {...res.data(), id: res.id}
    } catch (err) {
      error.value = err.message
      console.error(err.message)
      setTimeout(() => router.push('/'), 2000)
    }
  }

  return { post, error, load }
}

export default getPost