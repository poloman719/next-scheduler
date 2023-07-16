const TimeInput: React.FC<{ limit: number, text?: string, setVal: (val: string) => void }> = (props) => {
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const text = event.currentTarget.innerText;
    const selectionLength = getSelection()?.getRangeAt(0).toString().length;
    if (['Tab', 'Backspace'].includes(event.key)) return;
    if (selectionLength === 0) {
      if (event.code !== 'Space' && text.length < 2 && Number(text + event.key) < props.limit) return;
    } else {
      if (event.code !== 'Space' && Number(event.key) >= 0) return;
    }
    event.preventDefault();
  }

  const onFocusHandler = (event: React.FocusEvent<HTMLSpanElement>) => {
    const span = event.currentTarget;
    const range = document.createRange();
    const selection = document.getSelection();
    range.selectNodeContents(span);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  const onBlurHandler = (event: React.FocusEvent<HTMLSpanElement>) => {
    const span = event.currentTarget;
    const text = span.innerText
    if (props.limit === 60 && text.length < 2) span.innerText = `0${text}`;
    if (props.limit === 13 && Number(text) < 10 && text.length === 2) span.innerText = text.charAt(1)
    document.getSelection()?.removeAllRanges();
    props.setVal(text);
  }

  return (<span
    tabIndex={0}
    className='no-focus-deco'
    contentEditable
    suppressContentEditableWarning
    onKeyDown={onKeyDownHandler}
    onFocus={onFocusHandler}
    onBlur={onBlurHandler}
  >
    {props.text ? props.text : '00'}
  </span>)
}

export default TimeInput;