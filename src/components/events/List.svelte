<script lang="ts">
  import { onMount } from 'svelte'
  import { getCurrentDate, sortedEvents } from '../../store/events'
  import { openEditor } from '../Editor.svelte'  
  import TimingIndicator from './TimingIndicator.svelte'
  import Touchable from '../../plugins/touchable/Touchable.svelte'
  import TouchableOpacity from '../../plugins/touchable/TouchableOpacity.svelte'

  const getEventStyles = (idx: number) => {
    let classNames = ''

    if ($sortedEvents.at(idx - 1)?.type === 'DIVIDER') {
      classNames += 'rounded-tl-xl rounded-tr-xl border-t '
    }
    
    if (!$sortedEvents.at(idx + 1) || $sortedEvents.at(idx + 1)?.type === 'DIVIDER') {
      classNames += 'rounded-bl-xl rounded-br-xl border-b '
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
  {#if $sortedEvents.length > 0}  
    <div class="flex h-8">
      <div class="flex w-10 justify-center">
        <div class="h-full rounded-t-full w-1 {['BEFORE', 'NOW'].includes($sortedEvents.at(0)?.timing) ? 'bg-blue-500 dark:bg-lime-400' : 'bg-slate-200 dark:bg-stone-800'}"></div>
      </div>
    </div>
  {/if}

  {#each $sortedEvents as event, index (event.id)}
    {#if event.type === 'DIVIDER'}
      <div class="flex items-center bg-gray-100 dark:bg-black">
        <div class="flex-1 flex">
          <TimingIndicator timing={event.timing} />
          <span class="flex-1 ml-2 py-4 text-sm font-medium text-slate-400 dark:text-stone-400">{formatDate(event.date)}</span>
        </div>
        <TouchableOpacity 
          on:click={() => openEditor(null, event.date)}
          classNames="px-4 py-1 text-sm font-medium rounded-full bg-blue-500 bg-opacity-10 text-blue-600 dark:bg-lime-400 dark:bg-opacity-20 dark:text-lime-400">Add</TouchableOpacity>
      </div>
    {:else}
      <div id={event.timing === 'NOW' ? 'now' : ''} class="flex">
        <TimingIndicator timing={event.timing} />
        <Touchable
          classNames="flex-1 py-2 px-4 bg-white dark:bg-black dark:bg-opacity-5 border-l border-r dark:border-stone-900 cursor-pointer {getEventStyles(index)}"
          baseClassNames="text-slate-700 dark:text-stone-300"
          activeClassNames="text-blue-600 dark:text-lime-400"
          on:click={() => openEditor(event.id)}>
          <div class="text-left">
            <h1 class="font-medium text-lg flex items-center space-x-1 select-none">
              <span>{event.title}</span>
              <span class="opacity-50 select-none text-xs">•</span>
              <span class="{event.timing === 'NOW' ? 'text-blue-500 dark:text-lime-400 font-bold' : 'text-slate-700 dark:text-stone-300 opacity-50'} select-none text-xs">{event.time}</span>
            </h1>
            {#if event.text}
              <p class="text-sm select-none opacity-80 whitespace-pre-wrap">{event.text}</p>
            {/if}
          </div>
        </Touchable>
      </div>
    {/if}
  {/each}

  {#if $sortedEvents.length > 0}  
    <div class="flex h-16">
      <div class="flex w-10 justify-center">
        <div class="h-full rounded-b-full w-1 {$sortedEvents.at(-1)?.timing === 'BEFORE' ? 'bg-blue-500 dark:bg-lime-400' : 'bg-slate-200 dark:bg-stone-800'}"></div>
      </div>
    </div>
  {/if}
</div>
