# EMS系统 Railway部署指南

## 🚀 快速部署步骤

### 1. 准备工作
确保你的项目包含以下文件：
- ✅ `package.json` - 项目依赖配置
- ✅ `server.js` - Express服务器文件
- ✅ `railway.json` - Railway配置文件
- ✅ `Procfile` - 进程配置
- ✅ `.gitignore` - Git忽略文件
- ✅ `index_improved.html` - 主页面

### 2. Railway部署方法

#### 方法A：通过Railway Web界面
1. 访问 [Railway](https://railway.app/)
2. 登录你的GitHub账号
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择你的EMS项目仓库
6. Railway会自动检测到Node.js项目并开始部署

#### 方法B：通过Railway CLI
```bash
# 1. 安装Railway CLI
npm install -g @railway/cli

# 2. 登录Railway
railway login

# 3. 在项目目录中初始化
railway init

# 4. 部署项目
railway up
```

### 3. 环境变量配置

在Railway控制台中设置以下环境变量：

#### 必需变量
```
NODE_ENV=production
```

#### 可选变量
```
AI_API_KEY=your_modelscope_api_key
AI_BASE_URL=https://api-inference.modelscope.cn/v1
AI_MODEL=deepseek-ai/DeepSeek-V3.1
SESSION_SECRET=your_session_secret
LOG_LEVEL=info
```

### 4. 域名配置
1. 在Railway控制台中找到你的项目
2. 进入 "Settings" → "Domains"
3. 可以使用默认的 `.railway.app` 域名
4. 或绑定自定义域名

### 5. 部署后验证

访问以下URL验证部署：
- 主页面: `https://your-app.railway.app/`
- 健康检查: `https://your-app.railway.app/health`
- 原版页面: `https://your-app.railway.app/original`

## 🔧 本地测试

部署前建议本地测试：

```bash
# 安装依赖
npm install

# 启动服务器
npm start

# 访问应用
open http://localhost:3000
```

## 📊 监控和日志

### 查看实时日志
```bash
railway logs --follow
```

### 查看应用状态
```bash
railway status
```

### 查看部署历史
在Railway控制台的 "Deployments" 页面查看

## 🚨 常见问题解决

### 问题1：部署失败
**解决方案：**
```bash
# 检查构建日志
railway logs --deployment latest

# 验证package.json配置
cat package.json

# 重新部署
railway up --detach
```

### 问题2：静态文件无法访问
**解决方案：**
- 确保所有CSS/JS文件在项目根目录
- 检查文件路径大小写是否正确
- 验证server.js中的静态文件配置

### 问题3：环境变量不生效
**解决方案：**
```bash
# 查看当前环境变量
railway variables

# 设置环境变量
railway variables set NODE_ENV=production

# 重新部署使变量生效
railway up
```

### 问题4：端口错误
**确保server.js中使用：**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', callback);
```

## 🔄 更新部署

### 自动部署（推荐）
1. 推送代码到GitHub
2. Railway自动检测变更并重新部署

### 手动部署
```bash
railway up
```

## 📈 性能优化

### 1. 启用压缩
server.js中已包含compression中间件

### 2. 静态资源缓存
生产环境自动启用1天缓存

### 3. 安全配置
已配置Helmet安全中间件

## 🔒 安全检查清单

- ✅ 使用Helmet安全中间件
- ✅ 配置CORS策略
- ✅ 启用请求大小限制
- ✅ 隐藏X-Powered-By头
- ✅ 设置安全HTTP头
- ✅ 输入验证和错误处理

## 📞 获取帮助

如果遇到问题：
1. 查看Railway官方文档：https://docs.railway.app/
2. 检查项目GitHub Issues
3. 查看Railway社区论坛

## 🎉 部署完成

恭喜！你的EMS碳排放管理系统现在已经成功部署在Railway平台上。

访问你的应用：`https://your-app.railway.app/`
