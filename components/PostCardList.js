import React from 'react';
import PostCard from './PostCard';
import PaginationComponent from './PaginationComponent';

// Function to fetch posts data with pagination, category, and author filters
const getData = async (page, cat, authorId) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/posts?page=${page}&cat=${cat || ""}&authorId=${authorId}` ||
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}&authorId=${authorId}`
    );

    if (!response.ok) {
      console.error('Error fetching posts: ', response);
      throw new Error('Could not get posts'); // Handle API errors
    }

    const data = await response.json();
    return data; // Return fetched data
  } catch (error) {
    console.error('Error fetching data: ', error);
    return { posts: [], count: 0 }; // Return empty posts and count on error
  }
};

const PostCardList = async ({ page, cat, authorId }) => {
  const { posts = [], count = 0 } = await getData(page, cat, authorId); // Fetch posts and total count

  const POST_PER_PAGE = 9; // Define posts per page

  const hasPrev = POST_PER_PAGE * (page - 1) > 0; // Determine if previous page exists
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count; // Determine if next page exists

  return (
    <div className='flex flex-col gap-6 items-center mt-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
        {posts.length > 0 ? (
          posts.map((item) => (
            <div key={item.id}>
              <PostCard item={item} /> {/* Render each post with PostCard component */}
            </div>
          ))
        ) : (
          <p>No posts available</p> // Message if no posts are found
        )}
      </div>
      <PaginationComponent page={page} hasPrev={hasPrev} hasNext={hasNext} /> {/* Pagination controls */}
    </div>
  );
};

export default PostCardList;
