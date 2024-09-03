import React from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogCancel, 
  AlertDialogAction 
} from './ui/alert-dialog';
import { Button } from './ui/button';

const DeleteAlertDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='secondary'>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant='default' onClick={onConfirm}>Confirm</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
