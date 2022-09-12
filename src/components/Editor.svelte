<script lang="ts" context="module">
  import { get, writable } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { addEvent, getCurrentTime, type Event } from '../store/events'
  import { deleteEvent, events, updateEvent } from '../store/events'
  import DatePicker from './DatePicker.svelte'
  import TimePicker from './TimePicker.svelte'
  import TouchableOpacity from '../plugins/touchable/TouchableOpacity.svelte'

  const visible = writable(false)
  const selectedEvent = writable<Event>()
  const primaryAction = writable<'update' | 'create'>('create')

  visible.subscribe((isVisible) => {
    document.body.style.overflow = isVisible ? 'hidden' : 'unset'
  })

  export function openEditor(id?: string, date?: string): void {
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
      date: date ?? '',
      time: getCurrentTime().split(':').map((part, idx) => idx === 1 ? '00' : part).join(':'),
      text: '',
      title: '',
      emoji: '',
      id: null,
    })
  }
</script>

<script lang="ts">
  $: title = $primaryAction === 'create' ? 'Create event' : 'Update event'
  $: primaryActionLabel = $primaryAction === 'create' ? 'Add' : 'Update'
  
  let titleInput: HTMLInputElement = null

  visible.subscribe((isVisible) => {
    if (isVisible) {
      setTimeout(() => titleInput?.focus(), 100)
    }
  })

  function doPrimaryAction() {
    if ($primaryAction === 'create') {
      addEvent({
        date: $selectedEvent.date,
        time: $selectedEvent.time,
        title: $selectedEvent.title,
        text: $selectedEvent.text,
        emoji: $selectedEvent.emoji,
      })
    } else {
      updateEvent($selectedEvent)
    }
    $visible = false
  }
</script>

{#if $visible}
  <div transition:fade={{ duration: 75 }} class="fixed inset-0 bg-gray-100 dark:bg-black z-50 flex justify-center touch-none">
    <div class="w-full lg:w-1/2 p-4 space-y-5">
      <h1 class="text-4xl mt-2 ml-2 select-none text-black dark:text-white">{title}</h1>
      <div class="flex flex-col space-y-2">
        <div class="flex justify-start space-x-2">
          <input  
            bind:value={$selectedEvent.emoji}
            style="min-width: 0!important;"
            class="px-3 py-2 w-16 text-center bg-white border rounded-lg dark:border-transparent dark:bg-opacity-10 dark:text-white  focus:outline-none" 
            type="text" 
            placeholder=":D">
          <input  
            bind:value={$selectedEvent.title}
            class="px-3 py-2 flex-1 bg-white border rounded-lg dark:border-transparent dark:bg-opacity-10 dark:text-white  focus:outline-none" 
            type="text" 
            placeholder="Title">
        </div>
        <textarea 
          bind:value={$selectedEvent.text}
          style="min-height: 150px;"
          class="px-3 py-2 bg-white border rounded-lg dark:border-transparent dark:bg-opacity-10 dark:text-white focus:outline-none" 
          type="text" 
          placeholder="Description"></textarea>
        <div class="flex space-x-2">
          <DatePicker bind:date={$selectedEvent.date} />
          <TimePicker bind:time={$selectedEvent.time} />
        </div>
      </div>
      
      <div class="flex flex-col gap-2 sm:flex-row">
        <TouchableOpacity 
          on:click={ doPrimaryAction }
          classNames="py-3 w-full rounded-lg font-semibold select-none text-sm uppercase bg-opacity-10 dark:bg-opacity-20 text-blue-500 bg-blue-500 dark:bg-lime-400 dark:text-lime-400">{primaryActionLabel}</TouchableOpacity>

        {#if $primaryAction === 'update'}
          <TouchableOpacity 
            on:click={() => {
              deleteEvent($selectedEvent.id)
              $visible = false
            }}
            classNames="py-3 w-full rounded-lg font-semibold select-none text-sm uppercase bg-opacity-10 dark:bg-opacity-20 text-red-500 bg-red-500">Delete</TouchableOpacity>
        {/if}
        
        <TouchableOpacity 
          on:click={() => visible.set(false)}
          classNames="py-3 w-full rounded-lg font-semibold select-none text-sm uppercase dark:text-white">Close</TouchableOpacity>
      </div>
    </div>
  </div>
{/if}