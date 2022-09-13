<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { handlePressStateChanges } from './pressStateManager'

  export let classNames: string = ''

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
  class={classNames + ' ' + (pressed ? 'pressed' : '')}>
  <slot></slot>
</button>

<style>
  button {
    transition: opacity 0.15s;
    -webkit-tap-highlight-color: transparent !important;
  }

  button, button > * {
    user-select: none !important;
  }

  .pressed {
    opacity: 0.3 !important;
  }
</style>