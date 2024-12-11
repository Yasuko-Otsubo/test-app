//import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Home = () =>{

  //データ用の状態管理
  const [posts, setPosts] = useState(null);

// APIでpostsを取得する処理をuseEffectで実行します。
useEffect(() => {
  const fetcher = async () => {
    try {

    // APIを呼び出してデータを取得する処理
    const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
    const data = await res.json()
    setPosts(data.posts)

    } catch (error){
      console.log("接続できませんでした。" , error );

    }

  };
  fetcher();
}, [])

    if(posts === null){
      return <p className='text-center mt-20'>データ取得中・・・</p>
    }
    if (posts.length === 0 ) {
      return <p className='text-center mt-20'>ブログが見つかりません。</p>
    }

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

