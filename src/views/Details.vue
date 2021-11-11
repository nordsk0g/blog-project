<template>
<div v-if="error">
  {{ error }}
</div>
<div v-else-if="post" class="post">
  <h3>{{ post.title }}</h3>
  <p class="pre">{{ post.body }}</p>
  <button @click="deletePost" class="delete">Delete Post</button>
</div>
<div v-else><Spinner /></div>
</template>

<script>
import getPost from '../composables/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { projectFirestore } from '../firebase/config'

export default {
  props: [],
  components: { Spinner },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const { post, error, load } = getPost(route.params.id);

    load()

    const deletePost = async () => {
      await projectFirestore.collection('posts')
      .doc(route.params.id)
      .delete()

      router.push({ name: 'Home' })
    }


    return { post, error, deletePost }
  }
}
</script>

<style>
  .post {
    max-width: 1200px;
    margin: 0 auto;
  }
  .post p {
    color: #43493A;
    line-height: 1.5em;
    margin-top: 2.5em;
  }
  .pre {
    white-space: pre-wrap;
  }
  button.delete {
    margin: 0.8em auto;
  }
</style>