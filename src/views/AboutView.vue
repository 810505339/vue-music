<script lang="ts" setup>
import { $computed, $ref, RefTypes } from 'vue/macros'

let a = $ref(1)
let b = $computed(() => 2)
a = b as RefTypes.Ref
</script>
<template>
  <div class="about"></div>
</template>

<style></style>
