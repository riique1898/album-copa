<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="success">
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Álbum da Copa</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonItem>
            <IonInput
              v-model="email"
              label="Email"
              type="email"
              label-placement="floating"
            />
          </IonItem>

          <IonItem>
            <IonInput
              v-model="senha"
              type="password"
              label="Senha"
              label-placement="floating"
            />
          </IonItem>

          <IonButton
            expand="block"
            type="button"
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

async function entrar() {
  if (!email.value.trim() || !senha.value) {
    alert('Informe email e senha')
    return
  }

  try {
    const sucesso = await login(email.value, senha.value)

    if (sucesso) {
      router.replace('/tabs/tab1')
      return
    }

    alert('Login inválido')
  } catch (erro) {
    console.error('Erro no login:', erro)
    alert('Não foi possível entrar. Verifique o SQLite no Logcat.')
  }
}
</script>

<style scoped>
ion-content {
  --background: linear-gradient(180deg, #1b5e20, #43a047);
}

ion-card {
  margin-top: 100px;
  border-radius: 8px;
}

ion-card-title {
  text-align: center;
  font-size: 1.5rem;
}

ion-button {
  margin-top: 12px;
}
</style>
