import { useState } from "react";
import style from '@/styles/Period.module.css'

const Period: React.FC<{ setVal: (val: boolean) => void }> = (props) => {
  const [state, setState] = useState(true);
  const toggle = () => {
    setState((state) => {
      props.setVal(!state)
      return !state
    });
  }

  return (<span
    className={`no-focus-deco ${style.period}`}
    onClick={toggle}
    onKeyDown={(e) => { if (e.code === 'Space') toggle() }}
    tabIndex={0}
  >
    {state ? 'AM' : 'PM'}
  </span>)
}

export default Period