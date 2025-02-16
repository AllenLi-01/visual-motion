import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
} 