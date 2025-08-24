const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 安全中间件
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com", "https://api-inference.modelscope.cn"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api-inference.modelscope.cn"]
        },
    },
}));

// CORS配置
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.railway.app'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// 压缩中间件
app.use(compression());

// 解析JSON请求
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use(express.static(path.join(__dirname), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
    etag: true
}));

// 健康检查端点
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API端点 - 文件上传模拟
app.post('/api/upload', (req, res) => {
    try {
        // 模拟文件上传处理
        const { fileName, fileSize, fileType } = req.body;
        
        // 基本验证
        if (!fileName) {
            return res.status(400).json({ 
                error: '文件名不能为空',
                code: 'MISSING_FILENAME'
            });
        }

        // 模拟文件处理
        setTimeout(() => {
            res.json({
                success: true,
                message: '文件上传成功',
                data: {
                    fileName,
                    fileSize,
                    fileType,
                    uploadId: Date.now().toString(),
                    timestamp: new Date().toISOString()
                }
            });
        }, 1000);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: '文件上传失败',
            code: 'UPLOAD_ERROR'
        });
    }
});

// API端点 - AI分析模拟
app.post('/api/analyze', (req, res) => {
    try {
        const { documentContent, analysisType } = req.body;
        
        // 模拟AI分析处理
        setTimeout(() => {
            res.json({
                success: true,
                message: 'AI分析完成',
                data: {
                    analysisType,
                    results: {
                        carbonEmission: Math.random() * 100 + 50,
                        confidence: Math.random() * 0.3 + 0.7,
                        suggestions: [
                            '优化供应链管理',
                            '采用清洁能源',
                            '提升物流效率'
                        ]
                    },
                    timestamp: new Date().toISOString()
                }
            });
        }, 2000);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ 
            error: 'AI分析失败',
            code: 'ANALYSIS_ERROR'
        });
    }
});

// API端点 - 获取排放数据
app.get('/api/emissions', (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                procurement: { value: 45, level: 'medium', duration: '2个月' },
                manufacturing: { value: 78, level: 'high', duration: '3个月' },
                logistics: { value: 32, level: 'low', duration: '1个月' },
                usage: { value: 120, level: 'high', duration: '24个月' },
                recycling: { value: 15, level: 'low', duration: '6个月' },
                decomposition: { value: 8, level: 'low', duration: '12个月' }
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Emissions data error:', error);
        res.status(500).json({ 
            error: '获取排放数据失败',
            code: 'EMISSIONS_ERROR'
        });
    }
});

// 主页路由 - 重定向到改进版页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index_improved.html'));
});

// 原版页面路由
app.get('/original', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 测试页面路由
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test_improved.html'));
});

// 404处理
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index_improved.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? '服务器内部错误' 
            : err.message,
        code: 'SERVER_ERROR',
        timestamp: new Date().toISOString()
    });
});

// 优雅关闭处理
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// 启动服务器
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 EMS碳排放管理系统已启动`);
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ 启动时间: ${new Date().toLocaleString()}`);
});

module.exports = app;
