<script lang="ts">
  import { onMount } from 'svelte'
  import { getCurrentDate, sortedEvents } from '../../store/events'
  import { openEditor } from '../Editor.svelte'  
  import TimingIndicator from './TimingIndicator.svelte'
  import Touchable from '../../plugins/touchable/Touchable.svelte'
  import TouchableOpacity from '../../plugins/touchable/TouchableOpacity.svelte'
  import { move } from '../../plugins/fun'

  const getEventStyles = (idx: number) => {
    let classNames = ''

    if ($sortedEvents.at(idx - 1)?.type === 'DIVIDER') {
      classNames += 'rounded-tl-xl rounded-tr-xl '
    }
    
    if (!$sortedEvents.at(idx + 1) || $sortedEvents.at(idx + 1)?.type === 'DIVIDER') {
      classNames += 'rounded-bl-xl rounded-br-xl '
    }

    if ($sortedEvents.at(idx + 1)?.type === 'EVENT') {
      classNames += 'border-b '
    }

    // if ($sortedEvents.at(idx).timing === 'BEFORE') {
    //   classNames += '!bg-lime-400/10 !text-lime-400 '
    // }

    return classNames
  }

  const formatDate = (d: string) => {
    const [year, month, date] = d.split('-').map(Number)
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].at(new Date(d).getDay())

    return `${date}.${month}.${year} • ${day}`
  }

  onMount(() => {
    setTimeout(() => {
      document.getElementById('now')?.scrollIntoView({ behavior: 'smooth' })
    })
  })
</script>

<div style="height: 40vh;" class="flex items-center justify-center flex-col space-y-6">
  <span class="text-5xl">👋</span>
  <span class="text-white font-mono text-xl">Welcome</span>
</div>

<div class="grid grid-cols-[42px_auto] overflow-x-hidden">
  {#if $sortedEvents.length > 0}  
    <div class="flex justify-center h-3">
      <div class="h-full rounded-t-full w-1 {['BEFORE', 'NOW'].includes($sortedEvents.at(0)?.timing) ? 'bg-indigo-500 dark:bg-lime-400' : 'bg-slate-200 dark:bg-stone-800'}"></div>
    </div>
    <div></div>
  {/if}

  {#each $sortedEvents as event, index (event.id)}
    <TimingIndicator timing={event.timing} />
    {#if event.type === 'DIVIDER'}
      <div use:move id={event.timing === 'NOW' ? 'now' : ''} class="flex items-center">
        <div class="flex-1 flex">
          <span class="flex-1 ml-2 py-4 text-sm select-none font-medium text-slate-400 dark:text-stone-400">{formatDate(event.date)}</span>
        </div>
        {#if event.timing !== 'BEFORE' || event.date === getCurrentDate()}
          <TouchableOpacity 
            on:click={() => openEditor(null, event.date)}
            classNames="px-4 py-1 text-sm font-medium rounded-full bg-indigo-500 bg-opacity-10 text-indigo-600 dark:bg-lime-400 dark:bg-opacity-20 dark:text-lime-400">Add</TouchableOpacity>
        {/if}
      </div>
    {:else}
      <div use:move id={event.timing === 'NOW' ? 'now' : ''} class="flex">
        <Touchable
          on:click={() => openEditor(event.id)}
          classNames="flex-1 py-2 px-4 text-slate-700 dark:text-white cursor-pointer {getEventStyles(index)}"
          baseClassNames="bg-white dark:bg-white/10 border-gray-200/60 dark:border-white/10"
          activeClassNames="bg-gray-300/70 dark:bg-white/20 border-transparent">
          <div class="flex items-center">
            {#if event.emoji}
              <span class="text-3xl mr-3">{event.emoji}</span>
            {/if}
            <div class="text-left">
              <h1 class="font-medium text-lg flex items-center space-x-1 select-none">
                <span>{event.title}</span>
                <span class="opacity-50 select-none text-xs">•</span>
                <span class="{event.timing === 'NOW' ? 'text-indigo-500 dark:text-lime-400 font-bold' : 'text-slate-700 dark:text-stone-300 opacity-50'} select-none text-xs">{event.time}</span>
              </h1>
              {#if event.text}
                <p class="text-sm select-none opacity-80 whitespace-pre-wrap">{event.text}</p>
              {/if}
            </div>
          </div>
        </Touchable>
      </div>
    {/if}
  {/each}

  {#if $sortedEvents.length > 0}  
    <div class="flex justify-center h-5">
      <div class="h-full rounded-b-full w-1 {$sortedEvents.at(-1)?.timing === 'BEFORE' ? 'bg-indigo-500 dark:bg-lime-400' : 'bg-gray-300 dark:bg-stone-800'}"></div>
    </div>
    <div></div>
  {/if}
</div>

<div style="height: 40vh;" class="flex items-center justify-center flex-col space-y-6">
  <span class="text-5xl">🗓️</span>
  <span class="text-white font-mono text-xl">That's it.</span>
</div>