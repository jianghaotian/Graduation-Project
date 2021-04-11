<template>
  <section class="layout">
    <Header />
    <section class="content">
      <Aside />
      <main class="main">
        <router-view />
      </main>
    </section>
  </section>
</template>

<script>
import { Header, Aside } from './components'

export default {
  name: 'Layout',
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
