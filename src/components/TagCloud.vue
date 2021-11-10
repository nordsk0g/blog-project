<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <div v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag} }">
        #{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import useTags from '../composables/useTags'
export default {
  props: ['posts'],
  setup(props) {
    const { tags } = useTags(props.posts)

    return { tags }
  }
}
</script>

<style>
  .tag-cloud {
    padding: 0.8em;
  }
  .tag-cloud h3 {
    border-bottom: 1px solid #eee;
    padding: 1em 0.5em;
    color: #444;
  }
  .tag-cloud div {
    display: inline-block;
    padding: 0.8em;
  }
  .tag-cloud a {
    color: #ccc;
    text-decoration: none;
  }
  .tag-cloud a.router-link-active {
    color: #55B8CF;
    font-weight: bold;
  }
</style>