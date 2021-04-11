<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <h1>哎呀！页面找不到了！</h1>
  </div>
</template>

<script>
// import { Header, Aside } from './components'

export default {
  name: 'notFound',
  components: {}
}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
}
</style>
