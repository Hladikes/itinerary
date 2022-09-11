import { get, writable } from 'svelte/store'

export type EventTiming = 'BEFORE' | 'NOW' | 'AFTER'

export type ItemType = 'EVENT' | 'DIVIDER'

export type Event = {
  id: string
  time: string
  date: string
  title: string
  text: string
}

type SortedEvents = Array<
  (Event & {
    type: 'EVENT',
    timing: EventTiming,
  }) | {
    type: 'DIVIDER',
    date: string,
    timing: EventTiming,
    id: string,
  }
>

const randomId = () => Math.random().toString(36).substring(2)

function getCurrentDate() {
  const d = new Date()

  const year = String(d.getFullYear())
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

function getCurrentTime() {
  const d = new Date()

  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

function getTiming(date: string, time?: string): EventTiming {
  if (time) {
    if (date < getCurrentDate()) {
      return 'BEFORE'
    } else {
      if (date === getCurrentDate()) {
        if (time < getCurrentTime()) {
          return 'BEFORE'
        } else {
          return 'AFTER'
        }
      } else {
        return 'AFTER'
      }
    }
  }

  return (date < getCurrentDate() || date === getCurrentDate()) ? 'BEFORE' : 'AFTER'
}

export const events = writable<Event[]>([])

export const sortedEvents = writable<SortedEvents>([])

events.subscribe((currentEvents) => {
  const out: SortedEvents = []
  const newEvents = currentEvents.sort((a, b) => {
    return ((a.date + a.time) > (b.date + b.time)) ? 1 : -1
  })

  let previousDate: string = null

  for (const event of newEvents) {
    if (previousDate === null || previousDate !== event.date) {
      previousDate = event.date
      out.push({
        type: 'DIVIDER',
        date: event.date,
        timing: getTiming(event.date),
        id: randomId(),
      })
    }

    out.push({
      type: 'EVENT',
      timing: getTiming(event.date, event.time),
      ...event,
    })
  }

  let wasTimingNowSet = false

  for (const idx in out) {
    const previousEvent = out[Number(idx) - 1] ?? null
    const event = out[idx]

    if (event?.timing === 'AFTER' && previousEvent?.timing === 'BEFORE') {
      wasTimingNowSet = true
      event.timing = 'NOW'
    }
  }

  if (!wasTimingNowSet && out.length > 0) {
    out.at(0).timing = 'NOW'
  }

  sortedEvents.set(out)
  console.log(get(sortedEvents))
})

export function addEvent(event: Omit<Event, 'id'>) {
  const newEvent: Event = {
    date: event.date,
    time: event.time,
    title: event.title,
    text: event.text,
    id: randomId(),
  }

  console.log(newEvent)
  
  events.update((currentEvents) => {
    currentEvents.push(newEvent)
    return currentEvents
  })
}


const randomLoremIpsum = (maxSize = 5) => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'.split(' ').slice(0, 1 + Math.floor(Math.random() * maxSize)).sort(() => Math.random() > 0.5 ? 1 : -1).join(' ')

for (let i = 19; i < 22; i++) {
  const date = getCurrentDate().split('-').map((part, idx) => idx === 1 ? String(Number(part) - 1).padStart(2, '0') : part).join('-')
  addEvent({ date, time: `${String(i).padStart(2, '0')}:00`, title: randomLoremIpsum(5), text: randomLoremIpsum(30) })
}
for (let i = 10; i < 22; i++) {
  addEvent({ date: getCurrentDate(), time: `${String(i).padStart(2, '0')}:00`, title: randomLoremIpsum(5), text: randomLoremIpsum(30) })
}
for (let i = 10; i < 17; i++) {
  const date = getCurrentDate().split('-').map((part, idx) => idx === 1 ? String(Number(part) + 1).padStart(2, '0') : part).join('-')
  addEvent({ date, time: `${String(i).padStart(2, '0')}:00`, title: randomLoremIpsum(5), text: randomLoremIpsum(30) })
}
