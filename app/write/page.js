"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Tiptap from '@/components/Tiptap';
import { Label } from "@/components/ui/label";
import { useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WritePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const tiptapRef = useRef(null);
  const { toast } = useToast()

  const formSchema = z.object({
    title: z.string()
      .min(5, { message: "The title must contain at least 5 characters" })
      .max(250, { message: "The title must be under 250 characters" }),
    subtitle: z.string()
      .min(5, { message: "The subtitle must contain at least 5 characters" })
      .max(250, { message: "The subtitle must be under 250 characters" }),
    description: z.string()
      .min(5, { message: "The description must contain at least 5 character" })
      .trim(),  // No maximum limit
    category: z.string().min(1, {message: 'Please select a category'}),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
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

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue('category', value);
  };

  const onSubmit = (data) => {
    try {
      console.log("Title:", data.title);
      console.log("Subtitle:", data.subtitle);
      console.log("Description:", data.description);
      console.log("Category:", data.category);

      reset();
      setSelectedCategory('');
      tiptapRef.current.clearContent();

      toast({
        title: "Success",
        description: "Your post was submitted successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className='w-full max-w-[1080px] mx-auto mt-[100px] mb-[60px]'>
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
            <Label htmlFor='category'>Category</Label>
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div>
            
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Tiptap description='' ref={tiptapRef} onEditorContentChange={handleEditorContentChange} />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <Button type='submit' disabled={isSubmitting} className={`text-base ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Posting...' : 'Post'}</Button>
        </form>
    </main>
  )
}

export default WritePage;