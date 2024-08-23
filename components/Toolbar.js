"use client";

import React from 'react';
import {Bold, Strikethrough, Italic, List, ListOrdered, Heading1, Heading2, Quote, Underline, Undo, Redo, Code} from 'lucide-react';
import { Toggle } from './ui/toggle';

const Toolbar = ({editor}) => {

  if (!editor) {
    return null;
  }

  return (
    <div className='border rounded-lg p-1'>
      <Toggle
        size='sm'
        pressed={editor.isActive("bold")}
        onPressedChange={()=> editor.chain().focus().toggleBold().run()}
      >
        <Bold className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("italic")}
        onPressedChange={()=> editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("heading")}
        onPressedChange={()=> editor.chain().focus().toggleHeading({level: 1}).run()}
      >
        <Heading1 className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("heading")}
        onPressedChange={()=> editor.chain().focus().toggleHeading({level: 2}).run()}
      >
        <Heading2 className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("blockquote")}
        onPressedChange={()=> editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("underline")}
        onPressedChange={()=> editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("strikethrough")}
        onPressedChange={()=> editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("bulletList")}
        onPressedChange={()=> editor.chain().focus().toggleBulletList().run()}
      >
        <List className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("orderedList")}
        onPressedChange={()=> editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("code")}
        onPressedChange={()=> editor.chain().focus().setCode().run()}
      >
        <Code className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("undo")}
        onPressedChange={()=> editor.chain().focus().undo().run()}
      >
        <Undo className='h-4 w-4'/>
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("redo")}
        onPressedChange={()=> editor.chain().focus().redo().run()}
      >
        <Redo className='h-4 w-4'/>
      </Toggle>
    </div>
  )
}

export default Toolbar;