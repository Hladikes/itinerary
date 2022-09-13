<script lang="ts">
  import type { EventTiming } from "../../store/events"

  export let timing: EventTiming = 'AFTER'
</script>

<div class="flex w-10 relative">
  <div class="absolute inset-0 flex flex-col">
    <div class="flex-1 flex justify-center">
      <div class="h-full w-1 {(timing === 'BEFORE' || timing === 'NOW') ? 'bg-indigo-500 dark:bg-lime-400' : 'bg-gray-200 dark:bg-stone-800'}"></div>
    </div>
    <div class="flex-1 flex justify-center">
      <div class="h-full w-1 {(timing === 'NOW' || timing === 'AFTER') ? 'bg-gray-200 dark:bg-stone-800' : 'bg-indigo-500 dark:bg-lime-400'}"></div>
    </div>
  </div>
  <div class="absolute inset-0 flex items-center justify-center {timing === 'NOW' ? '' : 'opacity-0'}">
    <div class="w-4 h-4 rounded-full bg-indigo-500 dark:bg-lime-400"></div>
  </div>
</div>

<style>
  div {
    user-select: none!important;
  }
</style>