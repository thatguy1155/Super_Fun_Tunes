<template>
  <div>
    <player />
    <manager />
  </div>
</template>
<script>
import player from '@/components/player/player'
import manager from '@/pages/manager'
export default {
  components: {
    player,
    manager
  }
}
</script>