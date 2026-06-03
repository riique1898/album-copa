import { ref } from 'vue'
import { stickers } from '@/data/stickers'

const lista = ref(stickers)

export function useAlbum() {

  const toggleColetada = (id: number) => {
    const figurinha = lista.value.find(
      f => f.id === id
    )

    if (figurinha) {
      figurinha.coletada = !figurinha.coletada
    }
  }

  return {
    lista,
    toggleColetada
  }
}