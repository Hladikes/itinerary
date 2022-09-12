<script lang="ts">
  import { onMount } from 'svelte'

  export let date = ''

  let input: HTMLInputElement = null

  onMount(() => {
    if (!date) {
      input.valueAsDate = new Date()
      date = input.value
    }
  })
</script>

<input class="py-2 px-3 border rounded-lg   dark:border-white dark:border-opacity-10 dark:bg-black dark:text-lime-400  focus:outline-none" type="date" bind:value={date} bind:this={input}>

<style>
  input[type="date"] {
    appearance: none;
    -webkit-appearance: none;
  }
</style>