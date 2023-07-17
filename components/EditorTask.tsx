import style from '@/styles/EditorTask.module.css'
import Time from './Time';
import time from '@/interfaces/time';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskActions } from '@/store';
import useSkipEffect from '@/hooks/use-skip-effect';
import { MouseEvent } from 'react';

const EditorTask: React.FC<{ text: string, start: time, end: time, below?: boolean, ghost?: boolean, id: Number }> = (props) => {
  const dispatch = useDispatch();
  const [textIsValid, setTextIsValid] = useState(!props.ghost);
  const [timeIsValid, setTimeIsValid] = useState(!props.ghost);
  const [text, setText] = useState(props.text);
  const [time, setTime] = useState([props.start, props.end])

  useSkipEffect(() => {
    if (!textIsValid || !timeIsValid) return;
    if (props.ghost) dispatch(taskActions.add())
    else dispatch(taskActions.replace({
      text: text,
      start: time[0],
      end: time[1],
      id: props.id,
      isGhost: false
    }))
  }, [time, text])

  const taskClass = !props.ghost ? style.task : `${style.task} ${style.ghost}`;

  const onFocusHandler = (event: React.FocusEvent<HTMLDivElement>) => {
    const div = event.currentTarget;
    const range = document.createRange();
    const selection = document.getSelection();
    range.selectNodeContents(div);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  const onUpdateTimeHandler = (start: time, end: time, isValid: boolean) => {
    setTime([start, end])
    setTimeIsValid(isValid)
  }

  const onBlurHandler = (event: React.FocusEvent<HTMLDivElement>) => {
    const div = event.currentTarget;
    const text = div.innerText
    setTextIsValid(text.trim().length > 0 && text !== 'type to add task')
    setText(text)
  }

  const contextMenuHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    console.log('context-menu for task')
    e.preventDefault()

    const { pageX, pageY } = e
  }

  return <>
    <div className={taskClass} spellCheck='false' onContextMenu={contextMenuHandler}>
      <div className={style.text} onFocus={onFocusHandler} contentEditable suppressContentEditableWarning onBlur={onBlurHandler}>{props.text || 'type to add task'}</div>
      <div className={style.timeContainer}>
        <Time start={props.start} end={props.end} update={onUpdateTimeHandler} />
      </div>
    </div>
    {props.below && <div className={style.line}></div>}
  </>
}

export default EditorTask;