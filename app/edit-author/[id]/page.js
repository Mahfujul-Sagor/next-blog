"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import {useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import { UploadAuthorImage } from "@/queries/Image";
import { GetAuthorById, UpdateAuthor } from "@/queries/User";
import { compare } from "bcryptjs";
import { MotionDiv } from "@/components/animation/Animate";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string()
    .min(5, { message: "The name must contain at least 5 characters" })
    .max(20, { message: "The name must be under 20 characters" }),
  bio: z.string()
    .min(5, { message: "The bio must contain at least 5 characters" })
    .max(240, { message: "The bio must be under 240 characters" }),
  oldpassword: z.string().optional().refine(value => !value || value.length >= 6, {
    message: "The old password must contain at least 6 characters",
  }),
  newpassword: z.string().optional().refine(value => !value || value.length >= 6, {
    message: "The new password must contain at least 6 characters",
  }),
  image: z.any().optional(),
});

const EditAuthor = ({ params }) => {
  const { id } = params;
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
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
      name: '',
      bio: '',
      oldpassword: '',
      newpassword: '',
    },
  });

  // Fetch post data by ID and set form values
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const getResponse = await GetAuthorById(id);
        if (!getResponse.ok) {
          throw new Error('Failed to fetch author');
        }
        const author = getResponse.data;

        if (session && author && author.id !== session.user.id) {
          router.push('/');
          toast({
            title: "Unauthorized",
            description: "You are not authorized to edit this author.",
            variant: "destructive",
          });
          return;
        }
        
        // Set form values with fetched author data
        reset({
          name: author.name,
          bio: author.bio,
        });
        setPreviewImage(author.image || null);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load author data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchAuthor();
    } else if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [id, status, session, router, reset, toast]);

  if (isLoading) {
    return <Loader />;  // Show loader while fetching data
  }

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
      // Fetch the author data (including the hashed password) from the DB
      const authorResponse = await GetAuthorById(id);

      if (!authorResponse.ok) {
        throw new Error('Failed to fetch author data');
      }

      const { password: storedHashedPassword } = authorResponse.data;

      if (data.oldpassword) {
        // Only compare if old password is provided
        const isPasswordValid = await compare(data.oldpassword, storedHashedPassword);
  
        if (!isPasswordValid) {
          toast({
            title: "Invalid Password",
            description: "Old password is incorrect.",
            variant: "destructive",
          });
          return; // Stop the submission process if the passwords don't match
        }
      }
      // If passwords match, proceed with image upload and update process
      let imageUrl = previewImage;

      if (data.image && data.image[0]) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("file", file);

        const response = await UploadAuthorImage(formData);

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const result = await response.json();
        imageUrl = result.imageUrl;
      }

      // Prepare the data to be updated
      const updateData = {
        ...data,
        oldpassword: data.oldpassword || undefined,
        newpassword: data.newpassword || undefined,
      };

      // Update the author details in the database
      const updateResponse = await UpdateAuthor(id, updateData, imageUrl);

      if (!updateResponse.ok) {
        throw new Error('Author update failed');
      }

      const updatedId = updateResponse.id;

      if (updatedId) {
        router.push(`/authors/${updatedId}`);
      } else {
        throw new Error('Author id is undefined');
      }

      reset();
      setPreviewImage(null);

      toast({
        title: "Success",
        description: "Author was updated successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "Failed to update the author. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className='w-full min-h-screen max-w-[1170px] mx-auto my-[60px]'>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Edit Author</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
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
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
          <Label htmlFor="name">Name</Label>
          <Input name='name' id='name' type='text' placeholder='Name' {...register('name')} />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </MotionDiv>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
          <Label htmlFor="bio">Bio</Label>
          <Input name='bio' id='bio' type='text' placeholder='Bio' {...register('bio')} />
          {errors.bio && (
            <p className="text-red-500">{errors.bio.message}</p>
          )}
        </MotionDiv>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
          <Label htmlFor="oldpassword">Old Password</Label>
          <Input name='oldpassword' id='oldpassword' type='password' placeholder='Old password' {...register('oldpassword')} />
          {errors.oldpassword && (
            <p className="text-red-500">{errors.oldpassword.message}</p>
          )}
        </MotionDiv>
        <MotionDiv 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
          <Label htmlFor="newpassword">New Password</Label>
          <Input name='newpassword' id='newpassword' type='password' placeholder='New password' {...register('newpassword')} />
          {errors.newpassword && (
            <p className="text-red-500">{errors.newpassword.message}</p>
          )}
        </MotionDiv>
        <Button type='submit' disabled={isSubmitting} className={`text-base ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Updating...' : 'Update'}</Button>
      </form>
    </main>
  );
}

export default EditAuthor;
