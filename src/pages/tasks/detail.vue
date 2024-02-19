<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { onMounted } from 'vue';
import { ref } from 'vue';

const id = ref(-1)

onLoad((option:any) => {
  id.value = option.id
  uni.setNavigationBarTitle({
      title: 'Task: ' + option.id
  });
})

</script>

<template>
  <div>
    <h1>Task: {{ id }}</h1>
  </div>
</template>