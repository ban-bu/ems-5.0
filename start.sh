#!/bin/bash

# EMS碳排放管理系统 - 本地启动脚本

echo "🌱 EMS碳排放管理系统启动脚本"
echo "=================================="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js未安装"
    echo "请访问 https://nodejs.org/ 下载安装Node.js"
    exit 1
fi

# 显示Node.js版本
echo "📦 Node.js版本: $(node --version)"
echo "📦 npm版本: $(npm --version)"

# 检查是否有package.json
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 找不到package.json文件"
    echo "请确保在正确的项目目录中运行此脚本"
    exit 1
fi

# 安装依赖
echo ""
echo "📦 安装项目依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

# 设置环境变量
export NODE_ENV=development
export PORT=3000

echo ""
echo "🚀 启动EMS服务器..."
echo "📍 访问地址: http://localhost:3000"
echo "📱 主页面: http://localhost:3000/"
echo "🔧 原版页面: http://localhost:3000/original"
echo "🧪 测试页面: http://localhost:3000/test"
echo "💚 健康检查: http://localhost:3000/health"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=================================="

# 启动服务器
npm start
