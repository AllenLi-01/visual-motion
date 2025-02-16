const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');
const execAsync = util.promisify(exec);
const copyFileAsync = util.promisify(fs.copyFile);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持POST请求' });
    }

    const { user, pwd, minStep, maxStep } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ error: '请提供账号和密码' });
    }

    try {
        // 源文件和目标文件路径
        const sourcePath = path.join(process.cwd(), 'public', 'main');
        const targetPath = '/tmp/main';

        // 复制文件到 /tmp 目录
        await copyFileAsync(sourcePath, targetPath);
        
        // 修改权限并执行
        await execAsync(`chmod +x ${targetPath}`);
        
        const { stdout, stderr } = await execAsync(
            `${targetPath} -user=${user} -pwd=${pwd} ` +
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
            error: error.message,
            path: process.cwd()  // 输出当前工作目录以便调试
        });
    }
}