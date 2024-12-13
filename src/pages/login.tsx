import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 固定されたユーザー名とパスワードで認証
    if (username === "user" && password === "password123") {
      // 認証成功後の処理（例: ダッシュボードにリダイレクト）
      window.localStorage.setItem("username", username)
      window.location.href = "/"; // ここでページ遷移（実際のアプリではReact Routerを使うことが一般的）
    } else {
      // 認証失敗の場合、エラーメッセージを表示
      setErrorMessage("ユーザー名またはパスワードが間違っています。");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl text-center text-white mb-4">ログイン</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="username">
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="password">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
