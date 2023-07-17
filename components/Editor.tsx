import style from '@/styles/Editor.module.css'
import EditorTask from './EditorTask';
import Task from '@/interfaces/task';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { taskActions } from '@/store';
import { useDispatch } from 'react-redux';

const Editor: React.FC<{ tasks: Task[] }> = (props) => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: { task: Task[] }) => state.task);

  useEffect(() => {
    if (props.tasks.length) {
      dispatch(taskActions.set(props.tasks));
    } else {
      dispatch(taskActions.set([{
        text: "type to add task",
        start: { h: '0', m: '00', i: false },
        end: { h: '1', m: '00', i: false },
        id: Math.ceil(Math.random() * 10000),
        isGhost: true
      }]))
    }
  }, [])

  return <div className={style.editor}>
    <h2>EDITOR</h2>
    <div className={style.tasks}>
      {tasks.map((task, idx, arr) => <EditorTask
        text={task.text}
        start={task.start}
        end={task.end}
        below={idx + 2 < arr.length}
        key={String(task.id)}
        id={task.id}
        ghost={task.isGhost}
      />)}
    </div>
  </div>
}

export default Editor;