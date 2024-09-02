"use client";

import Image from 'next/image';
import noavatar from '@/public/no-avatar.png';
import Link from 'next/link';
import PostMenu from './PostMenu';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

const PostCard = ({ item }) => {
  const router = useRouter();
  const { toast } = useToast();

  if (!item) {
    return null;
  }

  const handleEdit = () => {
    // Logic for handling edit action
    console.log('Edit post:', item.id);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/delete-post/${item.id}` || `http://localhost:3000/api/delete-post/${item.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh(); // Refresh page after successfully deletion
        toast({
          title: "Success",
          description: "Your post was deleted successfully!",
          className: 'bg-background text-foreground',
        });
      }else {
        console.error('Failed to delete post');
      }
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
    <div className='flex flex-col gap-6 h-[556px] justify-center rounded-lg relative'>
      {item.img && (
        <div className='aspect-[370/280] overflow-hidden rounded-lg relative'>
          <Link href={`/posts/${item.slug}`}>
            <Image
              src={item.img}
              alt={item.title || 'Post Image'}
              width={400}
              height={400}
              priority={true}
              className='min-h-full w-full rounded-lg object-cover'
            />
          </Link>
          <div className="absolute top-2 right-2">
            <PostMenu onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      )}
      <div className='flex flex-col gap-6 flex-grow'>
        <h2 className='text-xl font-bold line-clamp-3'>
          <Link href={`/posts/${item.slug}`}>{item.title || 'Untitled Post'}</Link>
        </h2>
        <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
          {item.subtitle || 'No subtitle available.'}
        </p>
        <div className='mt-auto'>
          {item.user && (
            <div className="flex justify-between flex-wrap gap-3 items-center">
              <div className='flex gap-2 items-center text-gray-500'>
                <div>
                  <Link href={`/authors/${item.user.id}`}>
                    <Image
                      src={item.user.image || noavatar}
                      alt={item.user.name || 'User Avatar'}
                      width={25}
                      height={25}
                      priority={true}
                      className="rounded-full object-cover"
                    />
                  </Link>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className="text-sm">
                    <Link href={`/authors/${item.user.id}`}>{item.user.name || 'Unknown Author'}</Link>
                  </span>
                  <span className="text-sm">|</span>
                  <span className="text-sm">{item.createdAt}</span>
                </div>
              </div>
              <div>
                <span className="rounded-full px-3 capitalize py-1 border bg-indigo-400/50">
                  {item.catSlug || 'Style'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
