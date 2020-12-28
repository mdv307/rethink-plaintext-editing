import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import 'draft-js/dist/Draft.css';
import path from 'path';
import MDEditor from '@uiw/react-md-editor';
import css from './style.css';
function MarkdownEditor({ file, write }) {
  const saveContent = (content) => {   //To save content to localStorage
    window.localStorage.setItem('content'+path.basename(file.name), content);
  }
  const onChange = () => {   // To call savecontent when there are any changes
    const contentState = editorState.getCurrentContent().getPlainText('\u0001')
    saveContent(contentState);
  }
  const content = window.localStorage.getItem('content' + path.basename(file.name));   // To get values from localStorage to display in Markdown

  useEffect(() => {
    (async () => {
      window.localStorage.setItem('content' + path.basename(file.name), await file.text());
    })();
  }, [file]);

  const initialState = content ? EditorState.createWithContent(ContentState.createFromText(content)) : EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(initialState);   // Adding Editor state
    
  return (
    <div className={css.editor}>
    <div className={css.title}>{path.basename(file.name)}</div>
    <div className={css.content}>
    <Editor className={css.draft} //Editor For User Input
        editorState={editorState} 
        onChange={setEditorState}
        spellCheck={true} 
          />
      {/* To Save the changes made by the user to storage */}
      <button class="button" onClick={() => onChange(editorState)}>Save</button> 
      </div>
      <div className={css.title}>Preview</div>
      <MDEditor.Markdown className={css.content} //Markdown Editor to convert editor content to Markdown 
      source={content} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
