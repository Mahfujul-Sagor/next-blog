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
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import { GetPostById, UpdatePost } from "@/queries/Posts";
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
  image: z.any().optional(),
});

const EditPost = ({ params }) => {
  const { id } = params;
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const tiptapRef = useRef(null);
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewDescription, setPreviewDescription] = useState('');

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

  // Fetch post data by ID and set form values
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const getResponse = await GetPostById(id);
        if (!getResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = getResponse.data;

        if (session && data.user && data.user.id !== session.user.id) {
          router.push('/'); // Redirect unauthorized users
          toast({
            title: "Unauthorized",
            description: "You are not authorized to edit this post.",
            variant: "destructive",
          });
          return;
        }
        
        // Set form values with fetched post data
        reset({
          title: data.title,
          subtitle: data.subtitle,
          description: data.desc,
          category: data.catSlug,
        });
        setSelectedCategory(data.catSlug);
        setPreviewImage(data.img || null);
        setPreviewDescription(data.desc || '');
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load post data.",
          variant: "destructive",
        });
        return;
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchPost();
    } else if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [id, status, session, router, reset, toast]);

  if (isLoading) {
    return <Loader />;  // Show loader while fetching data
  }

  const handleEditorContentChange = (description) => {
    setValue('description', description);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue('category', value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', event.target.files);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = previewImage;

      if (data.image && data.image[0]) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("file", file);

        const response = await UploadPostImage(formData);

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const result = await response.json();
        imageUrl = result.imageUrl;
      }
      // Update the post
      const updateResponse = await UpdatePost(id, data, imageUrl);

      if (!updateResponse.ok) {
        throw new Error('Post update failed');
      }

      const slug = updateResponse.slug;

      if (slug) {
        router.push(`/posts/${slug}`);
      } else {
        throw new Error('Post slug is undefined');
      }

      reset();
      setSelectedCategory('');
      setPreviewImage(null);
      setPreviewDescription('');
      tiptapRef.current.clearContent();

      toast({
        title: "Success",
        description: "Your post was updated successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "Failed to update the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className='w-full min-h-screen max-w-[1170px] mx-auto my-[60px]'>
      <MotionH1 
      initial={{y: -20, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Edit Post</MotionH1>
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
          className=""
          >
            <Label htmlFor='imagePreview'>Image Preview:</Label>
            <Image src={previewImage} id="imagePreview" alt="Image Preview" width={500} height={500} className="object-cover max-w-full h-auto rounded-lg" />
          </MotionDiv>
        )}
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        >
          <Label htmlFor="description">Description</Label>
          <Tiptap description={previewDescription} ref={tiptapRef} onEditorContentChange={handleEditorContentChange} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </MotionDiv>
        <Button type='submit' disabled={isSubmitting} className={`text-base ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Updating...' : 'Update'}</Button>
      </form>
    </main>
  );
}

export default EditPost;
