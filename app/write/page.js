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
import Image from "next/image";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const WritePage = () => {

  const router = useRouter();

  // for text based inputs
  const [selectedCategory, setSelectedCategory] = useState('');
  const tiptapRef = useRef(null);
  const { toast } = useToast();

  // for image input
  const [previewImage, setPreviewImage] = useState(null);

  // zod schema
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
    image: z.any().optional(),
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

  // logic to preview the image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', event.target.files);
    } else {
      setPreviewImage(null);
    }
  };

  // slugify
  const slugifyOptions = {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
  };

  const createSlug = (str) => {
    return slugify(str, slugifyOptions);
  }

  const onSubmit = async (data) => {
    try {
      let imageUrl = '';
      // image upload logic
      if (data.image && data.image[0]) {
        const file = data.image?.[0];

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const result = await response.json();
        imageUrl = result.imageUrl;
      }

      const response = await fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          subtitle: data.subtitle,
          desc: data.description,
          img: imageUrl,
          catSlug: data.category || 'style',
          slug: createSlug(data.title),
        })
      });

      if (!response.ok) {
        throw new Error('Post upload failed');
      }

      const postData = await response.json();
      router.push(`/posts/${postData.slug}`);

      reset();
      setSelectedCategory('');
      setPreviewImage(null);
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
            <Label htmlFor='image'>Image</Label>
            <Input type='file' ref={register('image')} onChange={handleImageChange} id='image'/>
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          {previewImage && (
            <div className="">
              <Label htmlFor='imagePreview'>Image Preview:</Label>
              <Image src={previewImage} id="imagePreview" alt="Image Preview" width={500} height={500} className="object-cover max-w-full h-auto rounded-lg"/>
            </div>
          )}
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