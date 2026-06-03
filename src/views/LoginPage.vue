<template>
  <IonPage>

    <IonHeader>
      <IonToolbar color="success">
        <IonTitle>🏆 Login</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            Álbum da Copa
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <IonItem>
            <IonInput
              v-model="email"
              label="Email"
            />
          </IonItem>

          <IonItem>
            <IonInput
              v-model="senha"
              type="password"
              label="Senha"
            />
          </IonItem>

          <IonButton
            expand="block"
            @click="entrar"
          >
            Entrar
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            router-link="/register"
          >
            Criar Conta
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            router-link="/reset-password"
          >
            Esqueci minha senha
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
  IonButton
} from '@ionic/vue'

import { useAuth } from '@/composables/useAuth'

const email = ref('')
const senha = ref('')

const router = useRouter()

const { login } = useAuth()

function entrar() {

  const sucesso = login(
    email.value,
    senha.value
  )

  if (sucesso) {
    router.push('/tabs/tab1')
  } else {
    alert('Login inválido')
  }
}
</script>