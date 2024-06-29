"use client";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { toolbaroptions } from "@/constants/htmlConstants";
import { debounce, isEqual } from "lodash";
import { useAuth } from "@/zstore";
import { useParams } from "next/navigation";

type HTMLEditor = {
  initialContent: string;
  placeholder?: string;
  onContentChange: (e: string, m: any) => void;
};

const HTMLEditor = ({
  initialContent = "",
  onContentChange,
  placeholder,
}: HTMLEditor) => {
  const dbRef = useRef<any>();

  const { user } = useAuth();
  const params = useParams();

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

  const parseMentions = useCallback(
    (rawContent: Draft.DraftModel.Encoding.RawDraftContentState) => {
      const mentions = [];
      const { entityMap } = rawContent;
      for (const key in entityMap) {
        if (entityMap[key].type === "MENTION") {
          mentions.push(entityMap[key].data);
        }
      }
      return mentions;
    },
    []
  );

  const onEditorStateChange = useCallback(
    (newEditorState: EditorState) => {
      setEditorState(newEditorState);

      const contentState = newEditorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContent);

      // Call the callback function with the HTML content
      clearTimeout(dbRef.current);
      dbRef.current = setTimeout(() => {
        if (onContentChange && !isEqual(initialContent, htmlContent)) {
          const mentions = parseMentions(rawContent);
          onContentChange(htmlContent, mentions);
        }
      }, 500);
    },
    [onContentChange, initialContent, parseMentions]
  );

  const mentions = useMemo(() => {
    const currBoard = user.boards.find((b) => b._id === params?.board);
    const allUsers = [
      ...(currBoard?.admins || []),
      ...(currBoard?.members || []),
    ];

    return {
      separator: " ",
      trigger: "@",
      suggestions: allUsers.map((u) => ({
        text: u.username,
        value: u.username,
        url: u._id,
      })),
    };
  }, [user.boards]);

  return (
    <Editor
      onFocus={() => {}}
      onBlur={() => {}}
      mention={mentions}
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
