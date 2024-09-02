"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { FiEdit } from 'react-icons/fi';
import DeleteAlertDialog from './DeleteAlertDialog';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useState } from 'react';

const PostMenu = ({ onEdit, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await onDelete(); // Execute delete logic
    handleCloseDialog(); // Close dialog after confirmation
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-4 py-2 text-2xl rounded-md">
            <span>⋮</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={onEdit} className="flex gap-2 items-center">
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
