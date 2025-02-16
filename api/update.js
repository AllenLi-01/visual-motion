const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持POST请求' });
    }

    const { user, pwd, minStep, maxStep } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ error: '请提供账号和密码' });
    }

    try {
        const { stdout, stderr } = await execAsync(
            `/tmp/main -user=${user} -pwd=${pwd} ` +
            `-min=${minStep || 18000} -max=${maxStep || 25000}`
        );

        return res.status(200).json({
            success: true,
            output: stdout,
            error: stderr
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}