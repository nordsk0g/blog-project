<template>
  <div class="post">
    <router-link :to="{ name: 'Details', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <p>{{ snippet }}</p>
    <span v-for="tag in post.tags" :key="tag" class="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag} }">
        #{{ tag }}
      </router-link>
    </span>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
  props: ['post'],
  setup(props) {
    const snippet = computed(() => {
      return `${props.post.body.slice(0, 100).trim()}...`
    })

    return { snippet }
  }
}
</script>

<style>
  .post {
    margin: 0 2.5em 1.85em;
    padding-bottom: 1.85em;
    border-bottom: 1px dashed #e7e7e7;
  }
  .post h3 {
    display: inline-block;
    position: relative;
    font-size: 1.75em;
    color: white;
    margin-bottom: 0.75em;
    max-width: 400px;
  }
  .post h3::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #55B8CF;
    position: absolute;
    z-index: -1;
    padding-right: 2.5em;
    left: -1.75em;
    transform: rotateZ(-1.5deg);
  }
  .tag a {
    color: #ccc;
    text-decoration: none;
  }
  .tag a.router-link-active {
    color: #55B8CF;
    font-weight: bold;
  }
  
</style>