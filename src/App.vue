<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import initiateDB from './database/database'

const router = useRouter()
const routes = router.options.routes || []
initiateDB()
</script>

<template>
  <v-app>
    <v-navigation-drawer app color="tertiary">
      <v-list>
        <v-list-item v-for="route in routes" :key="route.path" :to="route.path" color="secondary">
          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main">
      <Suspense> <router-view /> </Suspense>
    </v-main>
  </v-app>
</template>

<style scoped>
.main {
  background-color: #515a47;
}
</style>
