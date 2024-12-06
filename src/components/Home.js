import { posts } from '../data/posts';
import { Link } from 'react-router-dom';


const Home = () =>{
  return (
    <div className='my-10'>
      {posts.map((post) => (
        <article className=" w-1/2 mx-auto py-3 px-2 mb-5 border-gray-200 border-2	" key={post.id}>
          <Link to={`/posts/${post.id}`}>
          <div className=' px-1 py-1 w-full flex justify-between'>
            <time className=' text-gray-400'>{new Date(post.createdAt).toLocaleDateString()}</time>
            <div className='flex gap-1'>
              {post.categories.map((category) => (
              <div className='border p-2 border-blue-400 rounded-lg	 text-blue-400	text-xs' key={category}>
                {category}
                </div>
              ))}
            </div>
          </div>
          <h2 className='text-xl	mb-5	'>{post.title}</h2>
          <p className="text-sm h-10 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}></p>
          </Link>
          </article>

      ))}
    </div>
  )  
}
export default Home; 

