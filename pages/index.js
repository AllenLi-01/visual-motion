import { useState } from 'react'
import Head from 'next/head'
import { Form, Input, InputNumber, Button, Card, Typography, message, Alert } from 'antd'
import { StepForwardOutlined, LoadingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Home() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (data.success) {
        message.success('步数更新成功！')
        setResult(data.output)
      } else {
        message.error(data.error)
        setResult(data.error)
      }
    } catch (error) {
      message.error('请求失败：' + error.message)
      setResult('请求失败：' + error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Motional</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px'
      }}>
        <Card 
          style={{ 
            maxWidth: 500,
            margin: '0 auto',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <StepForwardOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={2} style={{ margin: 0 }}>
              Motional
            </Title>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              minStep: 18000,
              maxStep: 25000
            }}
            method="post"
            autoComplete="on"
          >
            <Form.Item
              label="账号"
              name="user"
              rules={[{ required: true, message: '请输入Zepp Life账号' }]}
            >
              <Input 
                placeholder="请输入Zepp Life账号" 
                size="large" 
                autoComplete="username"
                type="text"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="pwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password 
                placeholder="请输入密码" 
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item
                label="最小步数"
                name="minStep"
                rules={[{ required: true, message: '请输入最小步数' }]}
              >
                <InputNumber
                  min={0}
                  max={100000}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="最大步数"
                name="maxStep"
                rules={[{ required: true, message: '请输入最大步数' }]}
              >
                <InputNumber
                  min={0}
                  max={100000}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                icon={loading ? <LoadingOutlined /> : <StepForwardOutlined />}
                style={{ height: '46px' }}
              >
                {loading ? '更新中...' : '更新步数'}
              </Button>
            </Form.Item>
          </Form>

          {result && (
            <Alert
              message="执行结果"
              description={
                <pre style={{ 
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}>
                  {result}
                </pre>
              }
              type={result.includes('成功') ? 'success' : 'error'}
              showIcon
            />
          )}
        </Card>
      </div>
    </>
  )
}