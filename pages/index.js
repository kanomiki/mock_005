import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>API テストアプリケーション</h1>
      <p>このアプリケーションはAWS Lambda APIをテストするためのものです。</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link href="/test">
          <button style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            textDecoration: 'none'
          }}>
            APIテストページへ
          </button>
        </Link>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>機能:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Next.jsプロキシ経由でAWS Lambda APIにアクセス</li>
          <li>CORSエラーを回避</li>
          <li>認証トークン付きリクエスト</li>
          <li>レスポンスの表示</li>
        </ul>
      </div>
    </div>
  );
}