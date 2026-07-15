<template>
  <div>
    <StickerCard
      v-for="sticker in stickers"
      :key="sticker.id"
      :sticker="sticker"
      @toggle="$emit('toggle', sticker.id)"
      @favorite="$emit('favorite', sticker.id)"
    />
  </div>
</template>

<script setup lang="ts">

import StickerCard from './StickerCard.vue'

type Sticker = {
  id: number
  nome: string
  selecao: string
  foto: string
  raridade: string
  colecao: string
  coletada: number
  data_coleta?: string
  collected_at?: string
  favorite: number
}

defineProps<{
  stickers: Sticker[]
}>()

defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'favorite', id: number): void
}>()

</script>
