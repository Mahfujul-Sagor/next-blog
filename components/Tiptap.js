'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const Tiptap = forwardRef(({ description, onEditorContentChange }, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [1, 2] } }), Underline],
    content: description || '',
    onUpdate({ editor }) {
      const description = editor.getHTML();
      onEditorContentChange(description);
    },
    editable: isClient,
  });

  useImperativeHandle(ref, () => ({
    clearContent() {
      editor?.commands.clearContent();
    },
  }), [editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!isClient) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2 justify-stretch'>
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
});

// Display name for better debugging
Tiptap.displayName = 'Tiptap';

export default Tiptap;
