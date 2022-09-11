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

<input class="py-1 px-2 border focus:outline-none" type="date" bind:value={date} bind:this={input}>