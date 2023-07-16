import time from './time'

export default interface Task {
  text: string,
  start: time,
  end: time,
  id: Number,
  isGhost: boolean
}