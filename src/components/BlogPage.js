//import { posts } from '../data/posts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogPage = () => {
  //useParamsでURLからidを取得
  const { id } = useParams(); // URLが/posts/1の場合、idには1が格納されます

  //データ用の状態管理 
  //nullをいれるのはまだ値が設定されていない状態を表現するため
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null); 
    
  ///////////////////////コンポーネントが初期化される、またはidが変更されるとuseEffectが実行///////////////////////
  useEffect(() => {
    const fetcher = async () => {
      try {

        ///////////////////////fetcher関数が呼び出され、APIからデータを受け取る///////////////////////
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);

        //throwによってエラーオブジェクトを発生させ、現在のコードの実行を中断
        //レスポンスのokプロパティ（HTTPステータスコードが200〜299の場合にtrueになる）をチェック
        if (!res.ok) {
          throw new Error(`HTTPエラー: ${res.status}`);
        }

        //res.json()を使ってレスポンスボディをパースし、必要なデータ部分を取得
        const data = await res.json();

        ///////////////////////正常なレスポンスの場合、データの形式を確認してpostステートに保存///////////////////////
        // 'posts'キーまたは'post'キーが存在するか確認
        if (data.posts && Array.isArray(data.posts)) {
          setPost(data.posts[0]); // 'posts'が配列の場合
        } else if (data.post) {
          setPost(data.post); // 'post'キーの場合
        } else {
          throw new Error("レスポンスに 'posts' または 'post' が含まれていません。");
        }
        } catch (error) {
          ///////////////////////異常がある場合は、エラーメッセージをコンソールに出力し、errorステートに保存///////////////////////
          console.error("データ取得中のエラー:", error.message);
          setError(`データの取得に失敗しました: ${error.message}`);
        }
      };
      fetcher();
    //依存配列を空にする（=useEffectの第二引数に空の配列を渡す）と、初回レンダリング時のみ処理が実行される
  },[id]); //空の依存配列を追加


    // エラーハンドリング
    if (error) {
      return <p className='text-center mt-20'>{error}</p>;
    }
    
    return (
      <div className='blogpage'>
        {post ? (
          <>
            <img className="mb-6" src={post.thumbnailUrl} alt="Thumbnail" />
            <div className='blog_sub px-1 py-1 flex justify-between'>
              <time className='b_time'>{new Date(post.createdAt).toLocaleDateString()}</time>
              <div className='flex gap-1'>
                {post.categories?.map((category) => (
                  <div className='b_category ' key={category}>
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <h2 className='text-xl mb-5'>{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
          </>
        ) : (
          <p>データを読み込んでいます...</p>
        )}
      </div>
    );
    }
export default BlogPage;