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

          <p>
            <strong>Versão:</strong> 1.0.0
          </p>

          <p>
            Aplicativo desenvolvido para a disciplina utilizando
            Vue 3 e Ionic Framework.
          </p>

          <IonButton
            expand="block"
            color="primary"
            router-link="/terms"
          >
            📄 Termo de Uso
          </IonButton>

          <IonButton
            expand="block"
            color="secondary"
            router-link="/privacy"
          >
            🔒 Política de Privacidade
          </IonButton>

          <IonButton
            expand="block"
            color="medium"
            @click="router.back()"
          >
            ← Voltar
          </IonButton>

        </IonCardContent>

      </IonCard>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

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

const router = useRouter()
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

ion-card-title {
  font-size: 1.4rem;
}

p {
  margin: 15px 0;
}

ion-button {
  margin-top: 12px;
}
</style>