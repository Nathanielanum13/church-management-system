<template>
<div class="search">
  <div class="search-area">
    <input type="search" placeholder="Search for congregants or transactions">
    <span class="icon ri-search-2-line"></span>
  </div>
</div>
</template>

<script>
export default {
name: "BaseSearchInput"
}
</script>

<style scoped lang="scss">
.search {
  width: 70%;
  padding: 10px 20px;

  .search-area {
    width: 100%;
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: calc(2% + 5px);

      font-weight: bold;
      color: #808080;

      transform: translateY(-50%);
    }

    input {
      width: 100%;
      max-width: 300px;
      border: none;
      outline: none;
      background-color: #80808015;
      padding: .75rem .75rem .75rem 3rem;
      border-radius: .5rem;
      font-weight: bold;
      color: #808080;

      &::placeholder {
        font-weight: bold;
        color: #80808090;
      }

      &:focus, &:focus-within {
        outline: none;
        border: none;
      }
    }
  }
}
</style>