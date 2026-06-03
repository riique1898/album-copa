<template>
  <IonPage>

    <IonHeader>
      <IonToolbar color="warning">
        <IonTitle>Recuperar Senha</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            Recuperação de Senha
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <IonItem>
            <IonInput
              v-model="email"
              label="Email"
              placeholder="Digite seu email"
            />
          </IonItem>

          <IonButton
            expand="block"
            @click="enviar"
          >
            Enviar Email
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            router-link="/login"
          >
            Voltar ao Login
          </IonButton>

          <IonText
            color="success"
            v-if="enviado"
          >
            <p>
              ✅ Email de recuperação enviado com sucesso!
            </p>
          </IonText>

        </IonCardContent>

      </IonCard>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonText
} from '@ionic/vue'

const email = ref('')
const enviado = ref(false)

function enviar() {

  if (!email.value) {
    alert('Digite um email')
    return
  }

  enviado.value = true
}
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 20px;
  margin-top: 80px;
}

ion-card-title {
  text-align: center;
}

ion-button {
  margin-top: 12px;
}
</style>