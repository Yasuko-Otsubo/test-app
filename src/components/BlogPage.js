import React from 'react';
import { posts } from '../data/posts';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
  console.log("BlogPage is rendering");
  const { id } = useParams();
  const singlePost = posts.find((post) => post.id === Number(id)); 


    //記事が見つからなかったとき
    console.log("URLパラメータ id:", id);
    console.log("取得した記事:", singlePost);

    if (!singlePost) {
      return <p>記事が見つかりませんでした。</p>;
    }

    
  return (
    <div className='blogpage'>
      <img  className="mb-6" src={singlePost.thumbnailUrl} alt="Thumbnail" />
      <div className='blog_sub px-1 py-1 flex justify-between'>
        <time className='b_time'>{new Date(singlePost.createdAt).toLocaleDateString()}</time>
          <div className='flex gap-1'>
            {singlePost.categories.map((category) => (
            <div className='b_category ' key={category}>
              {category}
            </div>
            ))}
          </div>
      </div>
        <h2 className='text-xl	mb-5'>{singlePost.title}</h2>
        <p  dangerouslySetInnerHTML={{ __html: singlePost.content }}></p>
    </div>
    )
}

export default BlogPage;