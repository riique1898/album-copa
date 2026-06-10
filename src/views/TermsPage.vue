<template>
  <IonPage>

    <AppHeader
      titulo="📄 Termo de Uso"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            Termo de Uso
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <div class="texto-termo">

            <p>
              Este aplicativo foi desenvolvido exclusivamente para fins acadêmicos.
            </p>

            <p>
              O usuário concorda em utilizar o sistema apenas para demonstração e estudo.
            </p>

            <p>
              Os dados cadastrados são armazenados somente durante a execução da aplicação.
            </p>

            <p>
              O desenvolvedor não se responsabiliza pela perda de dados após o encerramento do aplicativo.
            </p>

          </div>

          <IonItem lines="none">
            <IonCheckbox v-model="aceito" />
            <IonLabel class="ion-margin-start">
              Li e concordo com os Termos de Uso.
            </IonLabel>
          </IonItem>

          <IonButton
            expand="block"
            color="success"
            :disabled="!aceito"
            @click="voltar"
          >
            Concordar e Voltar
          </IonButton>

        </IonCardContent>

      </IonCard>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'

const aceito = ref(false)
const router = useRouter()

function voltar() {
  router.back()
}
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 18px;
}

.texto-termo {
  max-height: 180px;
  overflow-y: auto;
  text-align: justify;
  margin-bottom: 10px;
  padding-right: 8px;
}

.texto-termo p {
  margin-bottom: 12px;
  line-height: 1.5;
}

ion-item {
  margin-top: 10px;
}

ion-button {
  margin-top: 10px;
}
</style>