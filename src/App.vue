<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()

const handleBackButton = () => {
  const confirmMsg = confirm("Are you want to terminate the Process ?")
  if(confirmMsg){
    router.push('/bus') 

  }
}

onMounted(() => {
  window.addEventListener('popstate', handleBackButton)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleBackButton)
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>