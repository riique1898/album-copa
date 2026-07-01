<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
 
<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { initDatabase } from '@/services/database';
import { onMounted } from 'vue';
 
onMounted(async () => {
  await initDatabase();
})
</script>