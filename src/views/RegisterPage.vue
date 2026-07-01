<template>
  <IonPage>

    <IonHeader>
      <IonToolbar color="success">
        <IonTitle>Cadastro</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            Criar Conta
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <IonItem>
            <IonInput
              v-model="nome"
              label="Nome Completo"
            />
          </IonItem>

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

          <IonItem>
            <IonInput
              v-model="confirmarSenha"
              type="password"
              label="Confirmar Senha"
            />
          </IonItem>

          <IonButton
            expand="block"
            @click="cadastrar"
          >
            Cadastrar
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            router-link="/login"
          >
            Voltar ao Login
          </IonButton>

        </IonCardContent>

      </IonCard>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

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

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

const router = useRouter()

const { cadastrar: cadastrarUsuario } = useAuth()

async function cadastrar() {

  if (
    !nome.value ||
    !email.value ||
    !senha.value
  ) {
    alert('Preencha todos os campos')
    return
  }

  if (senha.value.length < 6) {
    alert('Senha deve ter pelo menos 6 caracteres')
    return
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem')
    return
  }

  const sucesso = await cadastrarUsuario(
    nome.value,
    email.value,
    senha.value
  )

  if (!sucesso) {
    alert('Email já cadastrado')
    return
  }

  alert('Cadastro realizado com sucesso!')

  router.push('/login')
}
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 20px;
  margin-top: 40px;
}

ion-card-title {
  text-align: center;
}

ion-button {
  margin-top: 12px;
}
</style>