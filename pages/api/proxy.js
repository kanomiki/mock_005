// Next.js API route that acts as a proxy to the AWS Lambda function
export default async function handler(req, res) {
  // Allow POST method only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // AWS Lambda API endpoint
    const apiEndpoint = 'https://27gdtu5dih.execute-api.ap-northeast-1.amazonaws.com/stage/{clientSystemCode}/api/contract/v1';
  
    // Forward the request to AWS Lambda
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    
    // Parse JSON if possible
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      jsonData = { rawResponse: data };
    }

    // Return the response from AWS Lambda
    res.status(response.status).json(jsonData);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}