"use client";
import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type TextEditor = {
  initialContent: string;
  onContentChange: (e: string) => void;
};

const TextEditor = ({ initialContent = "", onContentChange }: TextEditor) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  });

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);

    const htmlContent = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );

    // Call the callback function with the HTML content
    if (onContentChange) {
      onContentChange(htmlContent);
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            // "blockType",
            // "fontSize",
            "list",
            // "textAlign",
            "history",
          ],
          inline: { options: ["bold", "italic", "underline", "strikethrough"] },
          list: { options: ["unordered", "ordered"] },
        }}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </div>
  );
};

export default TextEditor;
