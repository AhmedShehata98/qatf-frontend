<template>
  <span class="flex flex-wrap items-center justify-center gap-2">
    <component v-for="(elem, idx) of titleHighlighter" :key="idx" :is="elem" />
  </span>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  words: {
    type: Array,
    required: true,
  },
  markedTextColorClassName: {
    type: String,
    required: true,
    default: "red",
  },
  mainTextColorClassName: {
    type: String,
    required: true,
    default: "black",
  },
});

const titleHighlighter = computed(() => {
  const splittedTitle = props.title.split(/\s/);

  return splittedTitle.map((word) =>
    props.words.includes(word)
      ? h("mark", { class: props.markedTextColorClassName }, word)
      : h("p", { class: props.mainTextColorClassName }, word)
  );
});
</script>
<style scoped>
mark {
  background-color: initial;
}
</style>
