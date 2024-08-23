"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Tiptap from '@/components/Tiptap';
import { Label } from "@/components/ui/label";
import { useRef } from 'react';

const WritePage = () => {

  const tiptapRef = useRef(null);

  const formSchema = z.object({
    title: z.string()
      .min(5, { message: "The title must contain at least 5 characters" })
      .max(250, { message: "The title must be under 250 characters" }),
    subtitle: z.string()
      .min(5, { message: "The subtitle must contain at least 5 characters" })
      .max(250, { message: "The subtitle must be under 250 characters" }),
    description: z.string()
      .min(1, { message: "The description must contain at least 1 character" })
      .trim(),  // No maximum limit
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
    },
  });

  const handleEditorContentChange = (description) => {
    setValue('description', description);
  };

  const onSubmit = (data) => {
    console.log("Title:", data.title);
    console.log("Subtitle:", data.subtitle);
    console.log("Description:", data.description);

    reset();
    tiptapRef.current.clearContent();
  };

  return (
    <main className='w-full max-w-[1170px] mx-auto mt-[100px] mb-[60px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name='title' id='title' type='text' placeholder='Title' {...register('title')}/>
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input name='subtitle' id='subtitle' type='text' placeholder='Subtitle' {...register('subtitle')}/>
            {errors.subtitle && (
              <p className="text-red-500">{errors.subtitle.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Tiptap description='' ref={tiptapRef} onEditorContentChange={handleEditorContentChange} />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <Button type='submit' disabled={isSubmitting} className={`text-base md:text-xl ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Posting...' : 'Post'}</Button>
        </form>
    </main>
  )
}

export default WritePage;