<template>
  <div class="suggestion-box">
    <div class="suggestion" v-for="suggestion of suggestions" :key="suggestion.label" @click="$emit('duration-suggestion', suggestion.value)">{{ suggestion.label }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseSuggestionBox",
  emits: ["duration-suggestion"],
  props: {
    suggestions: {
      type: Array,
      default: []
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";

.suggestion-box {
  width: 100%;
  height: auto;

  @include row;
  padding: .5rem;
  gap: .5rem;
  align-items: center;

  justify-content: flex-end;

  margin: .5rem 0;

  .suggestion {
    padding: .5rem;
    position: relative;

    width: max-content;
    height: auto;

    border-radius: .25rem;
    border: 1px solid #80808020;

    //@include center;

    font-weight: bold;
    color: color(dark);
    background: #80808015;

    cursor: pointer;

    &:hover {
      border: color(primary-light);
      transition: all 250ms ease-in;
      background: color(primary-lighter);

    }

    &:not(:hover) {
      border: 1px solid #80808020;
      transition: all 250ms ease-in;
      background: #80808015;
    }
  }
}
</style>