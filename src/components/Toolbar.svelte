<script>
  import TouchableOpacity from '../plugins/touchable/TouchableOpacity.svelte'
  import { openEditor } from '../components/Editor.svelte'
  import { getCurrentDate } from '../store/events'
</script>

<div class="fixed top-0 left-0 right-0 h-16 flex px-4 items-center justify-between bg-gray-200 dark:bg-black z-50 border-b border-gray-300/60 dark:border-white/10">
  <h1 class="text-slate-700 dark:text-white text-lg font-mono">Itinerary</h1>
  <TouchableOpacity 
    on:click={() => openEditor(null, getCurrentDate())}
    classNames="px-4 py-1 text-sm font-medium rounded-full bg-indigo-500 bg-opacity-10 text-indigo-600 dark:bg-lime-400 dark:bg-opacity-20 dark:text-lime-400">New event +</TouchableOpacity>
</div>