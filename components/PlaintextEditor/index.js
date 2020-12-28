import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentState , EditorState } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import 'draft-js/dist/Draft.css';
import path from 'path';
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
import css from './style.css';
function PlaintextEditor({ file, write }) {
  const saveContent = (content) => {   //To save content to localStorage
    localStorage.setItem('content'+path.basename(file.name), content);
  }
  const onChange = () => { // To call savecontent when there are any changes
    const contentState = editorState.getCurrentContent().getPlainText('\u0001')
    console.log(contentState)
    saveContent(contentState);
  }
  const content = window.localStorage.getItem('content' + path.basename(file.name)); // To get values from localStorage to display in Markdown

  useEffect(() => {
    (async () => {
      window.localStorage.setItem('content' + path.basename(file.name), await file.text());
    })();
  }, [file]);

  const initialState = content ? EditorState.createWithContent(ContentState.createFromText(content)) : EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(initialState); // Adding Editor state
    
  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
      <Editor className={css.draft}  //Editor For User Input
        editorState={editorState} 
        onChange={setEditorState}
        plugins={[staticToolbarPlugin]}
        spellCheck={true} 
          />
      {/* ToolBar to change selection to Bold, Italic,  Underlined */}
      <Toolbar className={css.tools} />
      {/* To Save the changes made by the user to storage */}
      <button class="button" onClick={() => onChange(editorState)}>Save</button>
    </div>
    </div>
  );
}
PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
