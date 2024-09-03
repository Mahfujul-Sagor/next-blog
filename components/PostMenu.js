"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { FiEdit } from 'react-icons/fi';
import DeleteAlertDialog from './DeleteAlertDialog';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { DeletePost } from "@/queries/Posts";

const PostMenu = ({ id }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {toast} = useToast();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = () => {
    // Logic for handling edit action
    console.log("Edit post:", id);
  };

  const handleDelete = async (id)=> {
    try {
      const response = await DeletePost(id);

      if (response.ok) {
        router.push('/');
      }else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDelete();
      handleCloseDialog(); // Close dialog after confirmation
      toast({
        title: "Success",
        description: "Your post was deleted successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="px-2 py-2 text-2xl rounded-md">
            <span className=''><CiMenuKebab /></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handleEdit} className="flex gap-2 items-center">
            <FiEdit /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenDialog} className="flex gap-2 items-center">
            <AiTwotoneDelete /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default PostMenu;
