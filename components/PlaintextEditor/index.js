import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentState, convertToRaw, convertFromRaw, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import path from 'path';

import css from './style.css';


function PlaintextEditor({ file, write }) {
  // console.log(file, write);
  const saveContent = (content) => {
    window.localStorage.setItem('content', content);
  }
  const onChange = () => {
    // console.log(content)
    // saveContent(value)
    const contentState = EditorState.getPlainText('\u0001')
    saveContent(contentState);
  }
  const content = window.localStorage.getItem('content');

  const [value, setValue] = useState('');
  useEffect(() => {
    (async () => {
      setValue(await file.text());
      // console.log(file.text())
    })();
  }, [file]);

  window.localStorage.setItem('content', file);
  const [editorState, setEditorState] = React.useState(
    () => 
    EditorState.createEmpty()
  );
  const clicking = () => {
    if(content) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(content)))
    } else {
      setEditorState(EditorState.createEmpty)
    }
  }
 
  return (
    <div className={css.preview}>
      {/* {setValue(file)} */}
      <div className={css.title}>{path.basename(file.name)}</div>
      {/* <div className={css.title}>{path.basename(file.name)}</div> */}
      <div className={css.content}>
      <button class="button" onClick={() => { saveContent(value); content}}>load</button>
      <Editor className={css.draft} editorState={EditorState.createWithContent(ContentState.createFromText(value))} onChange={() => {onChange}} />
      {/* <button class="button" onClick={() => onChange(editorState)}>Save</button> */}
    </div>
    </div>
  );
}
PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
