import React from 'react'
import PostCard from './PostCard';
import PaginationComponent from './PaginationComponent';

const getData = async (page, cat) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/posts?page=${page}&cat=${cat || ""}` || `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`);

    if (!response.ok) {
      console.error('Error fetching posts: ', response);
      throw new Error('Could not get posts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return { posts: [], count: 0 };
  }
};

const PostCardList = async ({page, cat}) => {

  const { posts = [], count = 0 } = await getData(page, cat);

  console.log(posts[0]);

  const POST_PER_PAGE = 9;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className='flex flex-col gap-6 items-center mt-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
        {posts.length > 0 ? (
          posts.map((item) => (
            <div key={item.id}>
              <PostCard item={item} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <PaginationComponent page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default PostCardList;