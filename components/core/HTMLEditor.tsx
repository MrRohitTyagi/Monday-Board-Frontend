"use client";
import React, { memo, useCallback, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { toolbaroptions } from "@/constants/htmlConstants";
import { isEqual } from "lodash";

type HTMLEditor = {
  initialContent: string;
  placeholder?: string;
  onContentChange: (e: string) => void;
};

const HTMLEditor = ({
  initialContent = "",
  onContentChange,
  placeholder,
}: HTMLEditor) => {
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

  console.log(
    `%c initialContent `,
    "color: orange;border:2px solid cyan",
    initialContent
  );

  const onEditorStateChange = useCallback(
    (newEditorState: EditorState) => {
      setEditorState(newEditorState);

      const htmlContent = draftToHtml(
        convertToRaw(newEditorState.getCurrentContent())
      );

      // Call the callback function with the HTML content
      if (onContentChange && !isEqual(initialContent, htmlContent)) {
        onContentChange(htmlContent);
      }
    },
    [onContentChange, initialContent]
  );

  return (
    <Editor
      onFocus={() => {}}
      onBlur={() => {}}
      mention={{}}
      
      placeholder={placeholder}
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
      toolbar={toolbaroptions}
    />
  );
};

export default memo(HTMLEditor);
