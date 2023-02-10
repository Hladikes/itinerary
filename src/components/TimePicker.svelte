<script>
  export let time = '00:00'
</script>

<input class="m-0 py-2 px-3 border rounded-lg   dark:border-white dark:border-opacity-10 dark:bg-zinc-900 dark:text-lime-400  focus:outline-none" type="time" bind:value={time}>

<style lang="postcss">
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
  }
</style>