const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 安全和性能中间件
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api-inference.modelscope.cn"]
        }
    }
}));

app.use(compression());
app.use(cors());
app.use(morgan('combined'));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API路由
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 文档上传API
app.post('/api/upload', (req, res) => {
    try {
        // 这里可以处理文档上传逻辑
        res.json({
            success: true,
            message: '文档上传成功',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '文档上传失败',
            error: error.message
        });
    }
});

// AI分析API
app.post('/api/ai/analyze', (req, res) => {
    try {
        const { question, data, module } = req.body;
        
        // 模拟AI分析响应
        const mockResponses = {
            kanban: "基于Kanban分析，建议优化供应链流程以降低碳排放...",
            lean: "通过Lean方法论分析，识别出生产过程中的浪费环节...",
            scrum: "Scrum执行建议：建立跨功能团队，优化迭代周期..."
        };
        
        res.json({
            success: true,
            response: mockResponses[module] || "AI分析结果",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'AI分析失败',
            error: error.message
        });
    }
});

// 健康检查接口
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '2.1.0',
        environment: process.env.NODE_ENV || 'production'
    });
});

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404处理
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 EMS碳排放管理系统已启动`);
    console.log(`📍 服务地址: http://localhost:${PORT}`);
    console.log(`🌍 环境: ${process.env.NODE_ENV || 'production'}`);
    console.log(`📊 版本: 2.1.0`);
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('收到SIGTERM信号，正在优雅关闭服务器...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('收到SIGINT信号，正在优雅关闭服务器...');
    process.exit(0);
});
