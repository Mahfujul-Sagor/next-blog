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
import { DeleteUser } from '@/queries/User';

const AuthorMenu = ({ id }) => {
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
    router.push(`/edit-author/${id}`);
  };

  const handleDelete = async (id)=> {
    try {
      const response = await DeleteUser(id);

      if (response.ok) {
        router.push('/');
      }else {
        console.error('Failed to delete author');
      }
    } catch (error) {
      console.error('Failed to delete author', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDelete();
      handleCloseDialog(); // Close dialog after confirmation
      toast({
        title: "Success",
        description: "Author was deleted successfully!",
        className: 'bg-background text-foreground',
      });
    } catch (error) {
      console.error('Error deleting author:', error);
      toast({
        title: "Error",
        description: "Failed to delete author. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="py-2 px-2 text-2xl rounded-full">
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

export default AuthorMenu;
