<script>
  export let time = '00:00'
</script>

<input class="m-0 py-1 px-2 border focus:outline-none" type="time" bind:value={time}>

<style lang="postcss">
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
  }
</style>