<template>
  <IonHeader>
    <IonToolbar :color="cor">
      <IonTitle>{{ titulo }}</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/vue'

defineProps({
  titulo: String,
  cor: {
    type: String,
    default: 'primary'
  }
})
</script>