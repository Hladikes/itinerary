<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { handlePressStateChanges } from './pressStateManager'

  export let classNames: string = ''
  export let baseClassNames: string = ''
  export let activeClassNames: string = ''

  let element: HTMLElement = null
  let pressed: boolean = false
  let unregister = null

  const dispatch = createEventDispatcher()
  const handleClick = () => dispatch('click')

  onMount(() => {
    unregister = handlePressStateChanges(element, (state: boolean) => {
      pressed = state
    })
  })

  onDestroy(() => {
    unregister()
  })
</script>

<button 
  bind:this={element}
  on:click={handleClick}
  class={classNames + ' ' + (pressed ? activeClassNames : baseClassNames)}>
  <slot></slot>
</button>

<style>
  button {
    -webkit-tap-highlight-color: transparent !important;
  }

  button, button > * {
    user-select: none !important;
  }
</style>