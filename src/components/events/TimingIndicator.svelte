<script lang="ts">
  import type { EventTiming } from "../../store/events"

  export let timing: EventTiming = 'AFTER'
</script>

<div class="flex w-10 relative">
  <div class="absolute inset-0 flex flex-col">
    <div class="flex-1 flex justify-center">
      <div class="h-full w-1 {(timing === 'BEFORE' || timing === 'NOW') ? 'bg-blue-500' : 'bg-slate-200'}"></div>
    </div>
    <div class="flex-1 flex justify-center">
      <div class="h-full w-1 {(timing === 'NOW' || timing === 'AFTER') ? 'bg-slate-200' : 'bg-blue-500'}"></div>
    </div>
  </div>
  <div class="absolute inset-0 flex items-center justify-center {timing === 'NOW' ? '' : 'opacity-0'}">
    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
  </div>
</div>