import { useState } from 'react';

export default function TestPage({ data }) {
  const [apiData, setApiData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientSystemCode: "MCLS",
          deviceList: [
            { deviceId: "AC-UNIT-02_SN-2025B" }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setApiData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>API テストページ</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testAPI} 
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '5px'
          }}
        >
          {loading ? 'テスト中...' : 'APIをテスト'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          エラー: {error}
        </div>
      )}

      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        padding: '15px',
        borderRadius: '5px'
      }}>
        <h3>レスポンス:</h3>
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          wordWrap: 'break-word',
          fontSize: '14px',
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '3px'
        }}>
          {JSON.stringify(apiData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// サーバーサイド（getServerSideProps）では CORS エラーは発生しない
export async function getServerSideProps() {
  try {
    // 初期データとして空のレスポンスを返す
    return {
      props: { 
        data: { message: "APIをテストボタンを押してください" }
      },
    };
  } catch (error) {
    return {
      props: { 
        data: { error: "初期データの取得に失敗しました" }
      },
    };
  }
}