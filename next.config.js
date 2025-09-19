/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ENDPOINT: 'https://27gdtu5dih.execute-api.ap-northeast-1.amazonaws.com/v1/ConstraintInformationAcquisitionAPIRequest'
  }
}

module.exports = nextConfig