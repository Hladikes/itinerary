<script>
  import './app.css'
  
  import List from './components/events/List.svelte'
  import TouchableOpacity from './plugins/touchable/TouchableOpacity.svelte'
  import Editor from './components/Editor.svelte'
  import { openEditor } from './components/Editor.svelte'

  import { sortedEvents } from './store/events'
</script>

<div class="min-h-screen flex flex-col items-center">
  <div class="w-full lg:w-1/2 py-4">
    <div class="pr-4">
      <List />
    </div>
    {#if $sortedEvents?.length === 0}
      <div class="px-3 flex flex-col space-y-8">
        <h1 class="text-black dark:text-white text-center mt-5">No events</h1>
        <TouchableOpacity 
          on:click={() => openEditor()}
          classNames="py-4 px-3 rounded-lg font-semibold select-none text-sm uppercase bg-opacity-10 dark:bg-opacity-20 text-blue-500 bg-blue-500 dark:bg-lime-400 dark:text-lime-400">Create event</TouchableOpacity>
      </div>
    {/if}
  </div>
</div>

<Editor />
