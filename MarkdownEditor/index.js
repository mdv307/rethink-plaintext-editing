import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ReactMarkdown from 'react-markdown';
import path from 'path';

import MDEditor ,{ commands } from '@uiw/react-md-editor';

import css from './style.css';
const input = '# This is a header\n\nAnd this is a paragraph'

function MarkdownEditor({ file, write }) {
  const saveContent = (content) => {
    window.localStorage.setItem('content', content);
  }
  const content = window.localStorage.getItem('content');

  // const [m, setM] = React.useState("**Hello world!!!**");
  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent().getPlainText('\u0001')
    console.log('content state', editorState.getCurrentContent())
    saveContent(contentState);
  }
  const [value, setValue] = useState('');
  useEffect(() => {
    (async () => {
      setValue(await file.text());
      // console.log(file.text())
    })();
  }, [file]);

  const [editorState, setEditorState] = React.useState(
    () => 
    EditorState.createWithContent(ContentState.createFromText(value)),
  );
  const [v, setV] = useState(false);
  const _onbutclick = () => {
    setV(true)
  }
  // console.log(file, write);
  // console.log(v)
  return (
    <div className={css.editor}>
    <div className={css.title}>{path.basename(file.name)}</div>
    {/* <div className={css.title}>{path.basename(file.name)}</div> */}
    <div className={css.content}>
      <Editor className="draft" editorState={editorState} onChange={setEditorState} />
      <button class="Button" onClick={onChange(editorState)} >Save</button>
      <button class="Button" onClick={_onbutclick} >Preview</button>
      </div>
      <div className={css.title}>Preview</div>
      {v ? 
      <MDEditor.Markdown className={css.content}
      source={content} /> :
      <MDEditor.Markdown className={css.content}
      source={value} />  }
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
