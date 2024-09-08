"use client";

import React, { useCallback } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Bold, ExternalLink, Strikethrough, Italic, List, ListOrdered, Heading1, Heading2, Quote, Underline, Undo, Redo, Code} from 'lucide-react';
import { Toggle } from './ui/toggle';


const Toolbar = ({editor}) => {

  const setLink = useCallback(() => {
    // for production
    const previousUrl = editor.getAttributes('link').href;

    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='border rounded-lg p-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("bold")}
              onPressedChange={()=> editor.chain().focus().toggleBold().run()}
            >
              <Bold className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("italic")}
              onPressedChange={()=> editor.chain().focus().toggleItalic().run()}
            >
              <Italic className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
            size='sm'
            pressed={editor.isActive("heading")}
            onPressedChange={()=> editor.chain().focus().toggleHeading({level: 1}).run()}
            >
              <Heading1 className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 1</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("heading")}
              onPressedChange={()=> editor.chain().focus().toggleHeading({level: 2}).run()}
            >
              <Heading2 className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 2</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("blockquote")}
              onPressedChange={()=> editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quote</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("underline")}
              onPressedChange={()=> editor.chain().focus().toggleUnderline().run()}
            >
              <Underline className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("strikethrough")}
              onPressedChange={()=> editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Strikethrough</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("link")}
              onPressedChange={setLink}
            >
              <ExternalLink className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Link</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("code")}
              onPressedChange={()=> editor.chain().focus().setCode().run()}
            >
              <Code className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("bulletList")}
              onPressedChange={()=> editor.chain().focus().toggleBulletList().run()}
            >
              <List className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Unordered List</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("orderedList")}
              onPressedChange={()=> editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ordered List</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("undo")}
              onPressedChange={()=> editor.chain().focus().undo().run()}
            >
              <Undo className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive("redo")}
              onPressedChange={()=> editor.chain().focus().redo().run()}
            >
              <Redo className='h-4 w-4'/>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Toolbar;