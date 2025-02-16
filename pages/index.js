import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [minStep, setMinStep] = useState(18000)
  const [maxStep, setMaxStep] = useState(25000)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, pwd, minStep, maxStep }),
      })
      const data = await res.json()
      setResult(data.success ? data.output : data.error)
    } catch (error) {
      setResult('请求失败：' + error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>小米运动刷步数</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>账号：</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码：</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <div>
          <label>最小步数：</label>
          <input
            type="number"
            value={minStep}
            onChange={(e) => setMinStep(e.target.value)}
          />
        </div>
        <div>
          <label>最大步数：</label>
          <input
            type="number"
            value={maxStep}
            onChange={(e) => setMaxStep(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '更新中...' : '更新步数'}
        </button>
      </form>
      {result && (
        <pre style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          {result}
        </pre>
      )}
    </div>
  )
}