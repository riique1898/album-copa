<template>
  <IonPage>
    <AppHeader
      titulo="Política de Privacidade"
      cor="primary"
    />

    <IonContent class="ion-padding">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            Política de Privacidade
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div class="texto-privacidade">
            <p>
              Esta Política de Privacidade descreve como as informações dos usuários são tratadas dentro do aplicativo Álbum da Copa do Mundo.
            </p>

            <p>
              O aplicativo coleta apenas os dados fornecidos voluntariamente durante o cadastro, como nome, e-mail e senha.
            </p>

            <p>
              As informações são utilizadas exclusivamente para autenticação e demonstração das funcionalidades do aplicativo.
            </p>

            <p>
              Nenhum dado é compartilhado com terceiros ou utilizado para fins comerciais.
            </p>

            <p>
              Como este projeto possui finalidade acadêmica, os dados permanecem armazenados localmente no dispositivo do usuário.
            </p>

            <p>
              Ao utilizar o aplicativo, o usuário declara estar ciente e de acordo com esta Política de Privacidade.
            </p>
          </div>

          <IonItem lines="none">
            <IonCheckbox v-model="aceito" />
            <IonLabel class="ion-margin-start">
              Li e concordo com a Política de Privacidade.
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
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonPage
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
  border-radius: 8px;
}

.texto-privacidade {
  max-height: 220px;
  overflow-y: auto;
  text-align: justify;
  margin-bottom: 10px;
  padding-right: 8px;
}

.texto-privacidade p {
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
