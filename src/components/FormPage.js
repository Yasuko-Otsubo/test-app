import { useState } from 'react';
//type Input = { name: string; mail: string };


const FormPage = () => {

  //stateを初期化
  const [ form, setForm ] = useState({ 
    name: '',
    email: '',
    text: ''
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    text: ''
  }); // エラー状態の初期値は空文字

  const clearForm = () => {
    setForm({ name: '', email: '', text: '' });
    setError({ name: '', email: '', text: '' });
  };
  
  //テキストエリアの変更時に入力値をstateに反映
  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //送信ボタンクリックで入力値をログ出力
  //入力必須 & 30文字以内
  const show = () => {
    let isValid = true; // バリデーションが成功したかどうかを確認するフラグ

    if (!form.name.trim()) {  //名前が空（またはスペースのみ）の場合
      setError(prev => ({ ...prev, name: "お名前は必須です" })); // エラーメッセージをセット
      isValid = false; // バリデーション失敗
    } 
     if (form.name.length > 30 ) {
      setError(prev => ({ ...prev, name: "お名前は30字以内で入力してください" }));
      isValid = false;
    } 
    if (form.name.trim() && form.name.length <= 30) { // 名前が正しい場合、エラーメッセージをクリア
      setError(prev => ({ ...prev, name: "" }));
    }

    //入力必須 & メールアドレスの形式
    const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
    if (!form.email.trim()) {
      setError(prev => ({ ...prev, email: "メールアドレスの形式が正しくありません" }));
      //return;
      isValid = false;
    } 
    if (!isValidEmail(form.email)) {
      setError(prev => ({ ...prev, email: "メールアドレスの形式が正しくありません" }));
      //return;
      isValid = false;
    } 
    if (form.email.trim() && isValidEmail(form.email)) {
      setError(prev => ({ ...prev, email: "" }));
    }

    //入力必須 & 500字以内
    if (!form.text.trim()) {
      setError(prev => ({ ...prev, text: "本文は必須です" }));
      //return;
      isValid = false;
    } 
    if (form.text.length > 500) {
      setError(prev => ({ ...prev, text: "本文は500字以内で入力してください" }));
      //return;
      isValid = false;
    } 
    if (form.text.trim() && form.text.length <= 500) {
      setError(prev => ({ ...prev, text: "" }));
    }


    // 入力内容をコンソールに出力
    if (isValid) {
      console.log(`お名前: ${form.name}`);
      console.log(`メールアドレス: ${form.email}`);
      console.log(`本文: ${form.text}`);
      alert("送信しました");
    }
  };
  
  return (
    <div className='formpage'>
      <h2 className='f_title'>問い合わせフォーム</h2>
      <form className='form_area'>

        <div className='f_input'> 
        <div className='f_input_upper'>
          <label htmlFor='name'>お名前</label>
          <input id="name" name='name' type="text"
          onChange={handleForm} value={form.name}
          className='f_note'/>
          </div>
          {error.name && <p className='f_note_error'>{error.name}</p>}

        </div>

        <div className='f_input'>
          <div className='f_input_upper'>
            <label htmlFor='email'>メールアドレス</label>
            <input id="email" name='email' type="text"
            onChange={handleForm} value={form.email} />
          </div>
          {error.email && <p className='f_note_error'>{error.email}</p>}
        </div>

        <div className='f_input'>
        <div className='f_input_upper'>
          <label htmlFor="comment">本文</label><br />
          <textarea id="text" name="text"
          cols="30" rows="7"
          value={form.text}
          onChange={handleForm}></textarea><br />
          </div>
          {error.text && <p className='f_note_error'>{error.text}</p>}
        </div>

        <div className='f_btn'>
          <button type="button" className='f_send' onClick={show}>送信</button>
          <button type="button" className="f_clear" onClick={clearForm}>クリア</button>
          </div>
      </form>
    </div>
  );
}

export default FormPage;