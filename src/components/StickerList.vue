<template>
  <div>
    <StickerCard
      v-for="sticker in stickers"
      :key="sticker.id"
      :sticker="sticker"
      @toggle="$emit('toggle', sticker.id)"
    />
  </div>
</template>

<script setup lang="ts">
import StickerCard from './StickerCard.vue'

defineProps({
  stickers: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle'])
</script>