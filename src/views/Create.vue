<template>
  <div class="create">
    <form @submit.prevent="createPost">
      <label for="title">Title</label>
      <input v-model="title" type="text" id="title" required>
      <label for="content">Content</label>
      <textarea v-model="body" name="content" id="content" required></textarea>
      <label for="tags">Tags (hit enter to add a tag)</label>
      <input
        v-model="tag"
        type="text"
        id="tags"
        @keydown.enter.prevent="handleKeydown"
      >
      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      <button >Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { projectFirestore, timeStamp } from '../firebase/config'

export default {
  setup() {
    const title = ref('')
    const body = ref('')
    const tag = ref('')
    const tags = ref([])

    const router = useRouter()

    const handleKeydown = () => {
      tag.value = tag.value.trim()
      if (!tags.value.includes(tag.value) && tag.value.length) {
        tags.value.push(tag.value)
      }
        tag.value = ''
    }

    const createPost = async () => {
      try {
        const post = {
          title: title.value,
          body: body.value,
          tags: tags.value,
          createdAt: timeStamp()
          }
        
        await projectFirestore.collection('posts').add(post)

        router.push({ name: 'Home' })
      } catch (err) {
        console.error(err.message)
      }
    }

    return { title, body, tag, tags, handleKeydown, createPost }
  }
}
</script>

<style>
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 1.5em;
    position: relative;
    font-size: 1.25em;
    color: white;
    margin-bottom: 0.75em;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #55B8CF;
    position: absolute;
    z-index: -1;
    padding-right: 2.5em;
    left: -1.5em;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 1.5em;
    background: #55B8CF;
    color: white;
    border: none;
    padding: 0.5em 1em;
    font-size: 1.125em;
    cursor: pointer;
  }
  button:active {
    position: relative;
    top: 0.125em;
    right: 0.125em;
  }

  button:hover {
    background: #00697E;
  }
  
  .pill {
    display: inline-block;
    margin: 0.75em 0.75em 0 0;
    color: #85976C;
    background: #F6FCEC;
    padding: 0.5em;
    border-radius: 1.25em;
    font-size: 0.85em;
  }
</style>