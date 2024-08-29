import { Skeleton } from "../ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-6 h-[556px] justify-center rounded-lg p-4 border'>
      <Skeleton className='aspect-[370/280] rounded-lg' />
      <div className='flex flex-col gap-6 flex-grow'>
        <Skeleton className='h-8 w-full rounded' />
        <Skeleton className='h-6 w-full rounded' />
        <div className='mt-auto'>
          <div className='flex justify-between flex-wrap gap-3 items-center'>
            <div className='flex gap-2 items-center text-gray-500'>
              <Skeleton className='w-6 h-6 rounded-full' />
              <div className='flex gap-2 items-center'>
                <Skeleton className='h-4 w-24 rounded' />
                <div className='text-sm'>|</div>
                <Skeleton className='h-4 w-16 rounded' />
              </div>
            </div>
            <Skeleton className='rounded-full px-3 py-1 border w-24' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
