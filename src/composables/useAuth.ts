import { ref } from 'vue'

import {
  cadastrarUsuario,
  realizarLogin,
  buscarUsuarioEmail
} from '@/services/database'

const usuarioLogado = ref<any>(null)

export function useAuth() {

  async function login(email: string, senha: string) {

    const usuarios = await realizarLogin(email, senha)

    if (usuarios.length > 0) {

      usuarioLogado.value = usuarios[0]

      // 🔥 persistência
      localStorage.setItem(
        'user',
        JSON.stringify(usuarioLogado.value)
      )

      return true
    }

    return false
  }

  async function cadastrar(nome: string, email: string, senha: string) {

    const existe = await buscarUsuarioEmail(email)

    if (existe.length > 0) {
      return false
    }

    await cadastrarUsuario(nome, email, senha)

    return true
  }

  function getUser() {

    if (!usuarioLogado.value) {
      const saved = localStorage.getItem('user')
      usuarioLogado.value = saved
        ? JSON.parse(saved)
        : null
    }

    return usuarioLogado.value
  }

  function logout() {
    usuarioLogado.value = null
    localStorage.removeItem('user')
  }

  return {
    usuarioLogado,
    login,
    cadastrar,
    logout,
    getUser
  }
}