import { ref } from 'vue'
import { users } from '@/data/users'

const usuarioLogado = ref<any>(null)

export function useAuth() {

  const login = (
    email: string,
    senha: string
  ) => {

    const usuario = users.find(
      u =>
        u.email === email &&
        u.senha === senha
    )

    if (usuario) {
      usuarioLogado.value = usuario
      return true
    }

    return false
  }

  return {
    usuarioLogado,
    login
  }
}