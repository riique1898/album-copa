<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>👤 Perfil</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h2>Perfil do Usuário</h2>

      <p>Nome: Henrique</p>
      <p>E-mail: henrique@email.com</p>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue'
</script>