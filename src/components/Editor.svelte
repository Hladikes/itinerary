<script lang="ts" context="module">
  import { writable, get } from 'svelte/store'
  import { events } from '../store/events'
  import type { Event } from '../store/events'

  const visible = writable(false)
  const selectedEvent = writable<Event>()
  const primaryAction = writable<'update' | 'create'>('create')

  export function openEditor(id?: string): void {
    visible.set(true)
    if (id) {
      primaryAction.set('update')
      const event = get(events).find((e) => e.id === id)
      if (event) {
        selectedEvent.set({ ...event })
      }
      return
    }
    primaryAction.set('create')
    selectedEvent.set({
      date: '',
      time: '',
      text: '',
      title: '',
      id: null,
    })
  }
</script>

{#if $visible}
  <div class="fixed inset-0 bg-white z-50 flex justify-center">
    <div class="w-full lg:w-1/2 p-4 space-y-4">
      <h1 class="text-4xl">Sup lmao</h1>
      <pre class="text-black whitespace-pre-wrap">{JSON.stringify($selectedEvent, null, 2)}</pre>
      <button on:click={ () => visible.set(false) }>Close</button>
    </div>
  </div>
{/if}