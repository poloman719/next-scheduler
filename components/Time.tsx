import { useReducer } from 'react';
import TimeInput from './TimeInput';
import time from '@/interfaces/time';
import Period from './Period';
import interval from '@/interfaces/interval';
import useSkipEffect from '@/hooks/use-skip-effect';

type updateType = (start: time, end: time, isValid: boolean) => void

const reducer = (prev_state: interval, action: { key: string, val: string | boolean }) => {
  const state = {
    start: {...prev_state.start},
    end: {...prev_state.end},
    isValid: prev_state.isValid
  }
  switch (action.key) {
    case 'START_H':
      state.start.h = action.val as string
      break;
    case 'START_M':
      state.start.m = action.val as string
      break;
    case 'START_I':
      state.start.i = action.val as boolean
      break;
    case 'END_H':
      state.end.h = action.val as string
      break;
    case 'END_M':
      state.end.m = action.val as string
      break;
    case 'END_I':
      state.end.i = action.val as boolean
      break;
  }
  const a = Number(state.start.h) + (state.start.i ? 0 : 12)
  const b = Number(state.start.m)
  const c = Number(state.end.h) + (state.end.i ? 0 : 12)
  const d = Number(state.end.m)

  if (a < c ||
    (a === c &&
      b < d)) {
    state.isValid = true;
  } else state.isValid = false;
  return state;
}

const Time: React.FC<{ start: time, end: time, update: updateType }> = (props) => {
  const initialTime = {
    start: props.start,
    end: props.end,
    isValid: true,
  }
  const [time, dispatch] = useReducer(reducer, initialTime);
  const setStartHour = (val: string) => dispatch({ key: 'START_H', val: val });
  const setStartMinute = (val: string) => dispatch({ key: 'START_M', val: val });
  const setStartPeriod = (val: boolean) => dispatch({ key: 'START_I', val: val });
  const setEndHour = (val: string) => dispatch({ key: 'END_H', val: val });
  const setEndMinute = (val: string) => dispatch({ key: 'END_M', val: val });
  const setEndPeriod = (val: boolean) => dispatch({ key: 'END_I', val: val });

  useSkipEffect(() => {
    props.update(time.start, time.end, time.isValid)
  }, [time])
  
  return <div className={time.isValid ? '' : 'invalid'}>
    <TimeInput limit={13} text={props.start.h} setVal={setStartHour} />
    :
    <TimeInput limit={60} text={props.start.m} setVal={setStartMinute} />
    {' '}
    <Period setVal={setStartPeriod} />
    {' - '}
    <TimeInput limit={13} text={props.end.h} setVal={setEndHour} />
    :
    <TimeInput limit={60} text={props.end.m} setVal={setEndMinute} />
    {' '}
    <Period setVal={setEndPeriod} />
  </div>
}

export default Time;