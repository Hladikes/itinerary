<script>
  import './app.css'
  
  import List from './components/events/List.svelte'
  // import TimePicker from './components/TimePicker.svelte'
  // import DatePicker from './components/DatePicker.svelte'
  import Editor from './components/Editor.svelte'

  let date = ''
  let time = ''
</script>

<div class="min-h-screen flex flex-col items-center">
  <!-- <div class="border p-2">
    <TimePicker bind:time={time} />
    <span>{time}</span>
    <DatePicker bind:date={date} />
    <span>{date}</span>
    <button on:click={add}>Add</button>
  </div> -->
  <div class="w-full lg:w-1/2 pr-4">
    <List />
  </div>
</div>

<Editor />