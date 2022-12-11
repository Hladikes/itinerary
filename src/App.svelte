<script>
  import './app.css'
  
  import Toolbar from './components/Toolbar.svelte'
  import List from './components/events/List.svelte'
  import Editor from './components/Editor.svelte'

  import { sortedEvents } from './store/events'
</script>

<div class="min-h-screen flex flex-col items-center overflow-x-hidden">
  <div class="w-full lg:w-1/2 py-4">
    <Toolbar />
    <div class="mt-16">
      <div class="pr-4">
        <List />
      </div>
      {#if $sortedEvents?.length === 0}
        <div class="px-3 flex flex-col space-y-8">
          <h1 class="text-black dark:text-white text-center mt-5">No events</h1>
        </div>
      {/if}
    </div>
  </div>
</div>

<Editor />
