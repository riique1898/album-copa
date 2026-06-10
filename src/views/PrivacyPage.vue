<template>
  <IonPage>

    <AppHeader
      titulo="🔒 Política de Privacidade"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <h2>Política de Privacidade</h2>

      <p>
        Este aplicativo coleta apenas informações fornecidas
        pelo usuário durante o cadastro.
      </p>

      <p>
        Os dados são utilizados exclusivamente para simulação
        das funcionalidades do sistema.
      </p>

      <p>
        Nenhuma informação é compartilhada com terceiros.
      </p>

      <p>
        Como não existe banco de dados externo, os dados
        permanecem apenas durante a execução da aplicação.
      </p>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
</script>