<script lang="ts">
  import { onMount } from 'svelte'
  import { sortedEvents } from '../../store/events'
  import { openEditor } from '../Editor.svelte'  
  import TimingIndicator from './TimingIndicator.svelte'

  const getEventStyles = (idx: number) => {
    let classNames = ''

    if ($sortedEvents.at(idx - 1)?.type === 'DIVIDER') {
      classNames += 'rounded-tl-lg rounded-tr-lg border-t '
    }
    
    if (!$sortedEvents.at(idx + 1) || $sortedEvents.at(idx + 1)?.type === 'DIVIDER') {
      classNames += 'rounded-bl-lg rounded-br-lg border-b '
    }

    if ($sortedEvents.at(idx)?.type !== 'DIVIDER') {
      classNames += 'border-b '
    }

    if ($sortedEvents.at(idx).timing === 'BEFORE') {
      classNames += 'opacity-60 bg-opacity-0 '
    }

    return classNames
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    return `${day}.${month}.${year}`
  }

  onMount(() => {
    setTimeout(() => {
      document.getElementById('now').scrollIntoView({ behavior: 'smooth' })
    })
  })
</script>

<div class="flex flex-col">
  {#each $sortedEvents as event, index (event.id)}
    {#if event.type === 'DIVIDER'}
      <div class="flex">
        <TimingIndicator timing={event.timing} />
        <span class="ml-2 py-4 text-slate-600">{formatDate(event.date)}</span>
      </div>
    {:else}
      <div id={event.timing === 'NOW' ? 'now' : ''} class="flex">
        <TimingIndicator timing={event.timing} />
        <div class="flex-1 py-2 px-3 bg-white border-l border-r {getEventStyles(index)}">
          <button class="w-full" on:click={() => openEditor(event.id)}>
            <div class="text-left">
              <h1 class="font-medium text-lg flex items-center space-x-1">
                <span>{event.title}</span>
                <span class="text-black text-opacity-40 text-xs">•</span>
                <span class="text-black text-opacity-40 text-xs">{event.time}</span>
              </h1>
              <p class="text-gray-700">{event.text}</p>
            </div>
          </button>
        </div>
      </div>
    {/if}
  {/each}

  {#if $sortedEvents.length > 0}  
    <div class="flex h-5">
      <div class="flex w-10 justify-center">
        <div class="h-full w-1 {$sortedEvents.at(-1)?.timing === 'BEFORE' ? 'bg-blue-500' : 'bg-slate-200'}"></div>
      </div>
    </div>
  {/if}
</div>
