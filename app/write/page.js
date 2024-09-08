// WritePage component for creating a blog post with form validation, image upload, and content preview
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Tiptap from '@/components/Tiptap';
import { Label } from "@/components/ui/label";
import { useRef, useState, useEffect } from 'react';
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
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import { UploadPostImage } from "@/queries/Image";
import { MotionDiv, MotionH1 } from "@/components/animation/Animate";

// Zod schema for form validation
const formSchema = z.object({
  title: z.string()
    .min(5, { message: "The title must contain at least 5 characters" })
    .max(350, { message: "The title must be under 350 characters" }),
  subtitle: z.string()
    .min(5, { message: "The subtitle must contain at least 5 characters" }),
  description: z.string()
    .min(5, { message: "The description must contain at least 5 characters" })
    .trim(),  // No maximum limit
  category: z.string().min(1, { message: 'Please select a category' }),
  image: z.any(),
});

const WritePage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const tiptapRef = useRef(null);
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

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

  // Check session status to redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);

    if (status === 'authenticated' && session && session.user) {
      // User is authenticated
    } else {
      router.push('/auth/sign-in');
    }
  }, [session, status, router]);

  if (isLoading) {
    return <Loader />;  // Show loader while checking session
  }

  // Handle content change in Tiptap editor
  const handleEditorContentChange = (description) => {
    setValue('description', description);
  };

  // Handle category selection
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue('category', value);
  };

  // Logic to preview the image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);  // Revoke previous image URL
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', event.target.files);
    } else {
      setPreviewImage(null);
    }
  };

  // Slugify options
  const slugifyOptions = {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
  };

  // Function to create slug from title
  const createSlug = (str) => {
    return slugify(str, slugifyOptions);
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      let imageUrl = '';

      // Image upload logic
      if (data.image && data.image[0]) {
        const file = data.image?.[0];

        const formData = new FormData();
        formData.append("file", file);

        const response = await UploadPostImage(formData);

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const result = await response.json();
        imageUrl = result.imageUrl;
      }

      // Create new post
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

      // Reset form and clear state
      reset();
      setSelectedCategory('');
      setPreviewImage(null);
      tiptapRef.current.clearContent();

      // Success toast notification
      toast({
        title: "Success",
        description: "Your post was submitted successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      // Error toast notification
      toast({
        title: "Submission Failed",
        description: "Failed to submit the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className='w-full max-w-[1170px] mx-auto my-[60px]'>
      <MotionH1 
      initial={{y: -20, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Write Post</MotionH1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
          <Label htmlFor="title">Title</Label>
          <Input name='title' id='title' type='text' placeholder='Title' {...register('title')} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </MotionDiv>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input name='subtitle' id='subtitle' type='text' placeholder='Subtitle' {...register('subtitle')} />
          {errors.subtitle && (
            <p className="text-red-500">{errors.subtitle.message}</p>
          )}
        </MotionDiv>
        <MotionDiv
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
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
        </MotionDiv>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
          <Label htmlFor='image'>Image</Label>
          <Input type='file' onChange={handleImageChange} id='image' />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </MotionDiv>
        {previewImage && (
          <MotionDiv 
          initial={{scale: 0.8, opacity: 0}}
          whileInView={{scale: 1, opacity: 1}}
          transition={{duration: 0.5}}
          className="">
            <Label htmlFor='imagePreview'>Image Preview:</Label>
            <Image src={previewImage} id="imagePreview" alt="Image Preview" width={500} height={500} className="object-cover max-w-full h-auto rounded-lg" />
          </MotionDiv>
        )}
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
          <Label htmlFor="description">Description</Label>
          <Tiptap description='' ref={tiptapRef} onEditorContentChange={handleEditorContentChange} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </MotionDiv>
        <Button type='submit' disabled={isSubmitting} className={`text-base ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Posting...' : 'Post'}</Button>
      </form>
    </main>
  );
}

export default WritePage;
