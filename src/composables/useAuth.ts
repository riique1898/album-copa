import { ref } from 'vue'
import { users } from '@/data/users'

const usuarioLogado = ref<any>(null)

export function useAuth() {

  const login = (email: string, senha: string) => {

    const usuario = users.find(
      u => u.email === email && u.senha === senha
    )

    if (usuario) {
      usuarioLogado.value = usuario
      return true
    }

    return false
  }

  const cadastrar = (nome: string, email: string, senha: string) => {

    const existe = users.find(
      u => u.email === email
    )

    if (existe) return false

    users.push({
      nome,
      email,
      senha
    })

    return true
  }

  const logout = () => {
    usuarioLogado.value = null
  }

  return {
    usuarioLogado,
    login,
    cadastrar,
    logout
  }
}