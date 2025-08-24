# 碳排放管理系统 (EMS) - Railway部署版

[![部署状态](https://railway.app/button.svg)](https://railway.app/)

## 🌟 项目简介

EMS (Environmental Management System) 是一个基于Web的碳排放管理系统，集成了Kanban分析、Lean优化和Scrum执行三大模块，提供全生命周期的碳排放管理解决方案。

### ✨ 主要功能

- **📤 文档上传与AI分析**: 支持多种格式文档上传，AI智能分析缺失信息
- **📊 Kanban碳排放分析**: 产品生命周期逆时间线展示和碳排放预测
- **⚡ Lean流程优化**: 基于实际数据的AI优化建议和方案对比
- **🔄 Scrum执行管理**: 敏捷项目管理和进度跟踪

## 🚀 快速部署到Railway

### 方法一：一键部署 (推荐)

[![部署到Railway](https://railway.app/button.svg)](https://railway.app/template/new?template=https://github.com/your-username/ems-carbon-management)

### 方法二：手动部署

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/ems-carbon-management.git
   cd ems-carbon-management
   ```

2. **安装Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **登录Railway**
   ```bash
   railway login
   ```

4. **初始化项目**
   ```bash
   railway init
   ```

5. **部署应用**
   ```bash
   railway up
   ```

### 方法三：GitHub集成

1. 将代码推送到GitHub仓库
2. 在Railway控制台中连接GitHub仓库
3. 选择项目进行自动部署

## 📁 项目结构

```
ems-2.1/
├── 📄 server.js              # Express服务器入口文件
├── 📄 package.json           # 项目依赖配置
├── 📄 railway.json           # Railway部署配置
├── 📄 Procfile               # 进程配置文件
├── 📄 .gitignore             # Git忽略文件配置
├── 🌐 index_improved.html    # 主页面 (改进版)
├── 🌐 index.html             # 原版页面
├── 🎨 styles.css             # 主样式文件
├── 🎨 improvements.css       # 改进样式文件
├── ⚙️ script_enhanced.js     # 增强脚本文件
├── ⚙️ script.js              # 原版脚本文件
├── 📝 AI改进说明.md          # AI功能说明
├── 📝 使用说明.md            # 使用指南
└── 🧪 test_*.html            # 测试页面
```

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 现代化页面结构
- **CSS3** - 响应式设计和动画效果
- **JavaScript ES6+** - 交互逻辑和AI集成
- **Font Awesome** - 图标库

### 后端技术
- **Node.js** - 服务器运行环境
- **Express.js** - Web应用框架
- **Helmet** - 安全中间件
- **CORS** - 跨域资源共享
- **Compression** - 响应压缩

### AI集成
- **ModelScope API** - AI分析服务
- **DeepSeek V3.1** - 深度学习模型

## ⚙️ 环境配置

### 必需的环境变量

在Railway控制台中设置以下环境变量：

```bash
# 生产环境标识
NODE_ENV=production

# 服务端口 (Railway自动设置)
PORT=$PORT

# AI API配置 (可选)
AI_API_KEY=your_modelscope_api_key
AI_BASE_URL=https://api-inference.modelscope.cn/v1
AI_MODEL=deepseek-ai/DeepSeek-V3.1
```

### 可选环境变量

```bash
# 自定义域名 (如果有)
CUSTOM_DOMAIN=your-domain.com

# 日志级别
LOG_LEVEL=info

# 会话密钥
SESSION_SECRET=your_session_secret
```

## 🌐 访问地址

部署成功后，你的应用将在以下地址可用：

- **主页面 (改进版)**: `https://your-app.railway.app/`
- **原版页面**: `https://your-app.railway.app/original`
- **测试页面**: `https://your-app.railway.app/test`
- **健康检查**: `https://your-app.railway.app/health`

## 📱 功能模块

### 1. 文档上传模块
- 支持PDF、DOC、DOCX、TXT格式
- 拖拽上传功能
- AI智能文档分析
- 缺失信息自动补全

### 2. Kanban分析模块
- 产品生命周期逆时间线
- 各环节碳排放分析
- 实时数据可视化
- AI优化建议

### 3. Lean优化模块
- 方案深度分析
- 成本效益评估
- 实施时间规划
- 风险评估报告

### 4. Scrum执行模块
- 敏捷项目管理
- 任务进度跟踪
- 团队协作功能
- 迭代计划管理

## 🔧 本地开发

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 启动生产服务器
```bash
npm start
```

### 访问应用
打开浏览器访问 `http://localhost:3000`

## 🔧 API接口

### 文件上传
```http
POST /api/upload
Content-Type: application/json

{
  "fileName": "document.pdf",
  "fileSize": 1024000,
  "fileType": "application/pdf"
}
```

### AI分析
```http
POST /api/analyze
Content-Type: application/json

{
  "documentContent": "文档内容",
  "analysisType": "carbon_emission"
}
```

### 获取排放数据
```http
GET /api/emissions
```

### 健康检查
```http
GET /health
```

## 🔒 安全特性

- **Helmet.js** - HTTP安全头设置
- **CORS** - 跨域请求控制
- **CSP** - 内容安全策略
- **输入验证** - 请求数据验证
- **错误处理** - 安全的错误响应

## 📊 监控和日志

### Railway内置监控
- 应用性能指标
- 资源使用情况
- 请求响应时间
- 错误率统计

### 日志查看
```bash
# 查看实时日志
railway logs --follow

# 查看历史日志
railway logs --tail 100
```

## 🚀 性能优化

- **Gzip压缩** - 减少传输大小
- **静态资源缓存** - 提升加载速度
- **响应式设计** - 移动端优化
- **懒加载** - 按需加载资源

## 🐛 故障排除

### 常见问题

1. **部署失败**
   ```bash
   # 检查构建日志
   railway logs --deployment latest
   ```

2. **静态资源404**
   - 确保文件路径正确
   - 检查服务器配置

3. **API调用失败**
   - 验证环境变量设置
   - 检查网络连接

### 调试命令
```bash
# 查看应用状态
railway status

# 重新部署
railway up --detach

# 查看环境变量
railway variables

# 连接到应用shell
railway shell
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持与联系

- **项目仓库**: [GitHub](https://github.com/your-username/ems-carbon-management)
- **问题反馈**: [Issues](https://github.com/your-username/ems-carbon-management/issues)
- **功能建议**: [Discussions](https://github.com/your-username/ems-carbon-management/discussions)

## 🗺️ 更新日志

### v2.1.0 (当前版本)
- ✅ Railway部署支持
- ✅ Express服务器重构
- ✅ API接口标准化
- ✅ 安全性增强
- ✅ 性能优化

### v2.0.0
- ✅ AI功能集成
- ✅ 改进版界面
- ✅ Lean优化模块
- ✅ Scrum管理功能

### v1.0.0
- ✅ 基础功能实现
- ✅ Kanban分析
- ✅ 文档上传
- ✅ 碳排放计算

---

**感谢使用EMS碳排放管理系统！** 🌱

如有任何问题或建议，欢迎通过GitHub Issues与我们联系。
