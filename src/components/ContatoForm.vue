<template>
<ion-list>
<ion-item>
<ion-label>Cadastro de Contato</ion-label>
</ion-item>
 
<ion-item>
<ion-label position="stacked">Nome</ion-label>
<ion-input v-model="form.nome" required />
</ion-item>
<ion-note color="danger" v-if="errors. nome">{{ errors.nome }}</ion-note>
 
<ion-item>
<ion-label position="stacked">Email</ion-label>
<ion-input type="email" v-model="form.email" required />
</ion-item>
<ion-note color="danger" v-if="errors.email">{{ errors.email }}</ion-note>
 
<ion-item>
<ion-label position="stacked">Telefone</ion-label>
<ion-input type="tel" v-model="form.telefone" />
</ion-item>
 
<ion-button expand="block" type="button" @click="salvarContato">Salvar</ion-button>
 
<ion-toast :is-open="toast. show" :message="toast.message" duration="2000" @ionDismiss="toast. show = false" />
</ion-list>
</template>
 
<script setup lang="ts">
import {IonList, IonItem, IonLabel, IonInput, IonButton, IonToast} from '@ionic/vue'
import { reactive } from 'vue'
import { addContato } from '@/services/database'
 
const form = reactive ({ nome: '', email: '', telefone: '' })
const toast = reactive({ show: false, message: '' })
const errors = reactive({ nome: '', email: '' })
 
function clearErrors() {
  errors.nome = ''
  errors.email = ''
}
 
async function salvarContato () {
  clearErrors()
 
   if (!form.nome || !form.email) {
    if (!form.nome) {
      errors.nome = 'O nome é obrigatório.'
    }
    if (!form.email) {
      errors.email = 'O email é obrigatório.'
    }
    toast.show = true
    toast.message = 'Por favor, preencha os campos obrigatórios.'
    return
  }
 
await addContato(form.nome, form.email, form.telefone)
 
form.nome = ''
form.email = ''
form.telefone = ''
toast.show = true
toast.message = 'Contato salvo com sucesso!'
window.dispatchEvent(new CustomEvent('contato-adicionado'))
}
</script>
 
 