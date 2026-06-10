<template>
  <IonPage>

    <AppHeader
      titulo="ℹ️ Sobre o Aplicativo"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            🏆 Álbum da Copa do Mundo
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <p><strong>Versão:</strong> 1.0.0</p>

          <p>
            Aplicativo desenvolvido para a disciplina utilizando
            Vue 3 e Ionic Framework.
          </p>

          <IonButton
            expand="block"
            fill="outline"
            href="https://www.termsfeed.com/live/terms-and-conditions"
            target="_blank"
          >
            📄 Termo de Uso
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            href="https://www.termsfeed.com/live/privacy-policy"
            target="_blank"
          >
            🔒 Política de Privacidade
          </IonButton>

        </IonCardContent>

      </IonCard>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 18px;
}

p {
  margin-bottom: 15px;
}
</style>