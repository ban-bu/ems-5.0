// AI API 测试脚本
// 使用 Node.js 运行: node test_api.js

const API_CONFIG = {
    endpoint: 'https://api.modelscope.cn/v1/chat/completions',
    token: 'ms-150d583e-ed00-46d3-ab35-570f03555599',
    model: 'deepseek-ai/DeepSeek-V3.1'
};

async function testAPI() {
    console.log('🚀 开始测试 ModelScope AI API...\n');
    
    console.log('📋 配置信息:');
    console.log(`   端点: ${API_CONFIG.endpoint}`);
    console.log(`   模型: ${API_CONFIG.model}`);
    console.log(`   Token: ${API_CONFIG.token.substring(0, 10)}...`);
    console.log('');

    try {
        console.log('🔗 正在测试API连接...');
        
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.token}`
            },
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [{
                    role: 'user',
                    content: '你好，请简单回答：今天天气怎么样？'
                }],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        console.log(`📊 响应状态: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API调用失败:');
            console.error(`   状态码: ${response.status}`);
            console.error(`   错误信息: ${errorText}`);
            return false;
        }

        const data = await response.json();
        console.log('✅ API调用成功!');
        console.log('📝 响应数据:');
        console.log(JSON.stringify(data, null, 2));
        
        const aiResponse = data.choices?.[0]?.message?.content;
        if (aiResponse) {
            console.log('\n🤖 AI回复:');
            console.log(`   ${aiResponse}`);
        }
        
        return true;

    } catch (error) {
        console.error('❌ 网络错误或其他异常:');
        console.error(`   错误类型: ${error.name}`);
        console.error(`   错误信息: ${error.message}`);
        
        if (error.cause) {
            console.error(`   底层原因: ${error.cause}`);
        }
        
        return false;
    }
}

// 如果是直接运行此脚本
if (typeof window === 'undefined') {
    // Node.js 环境
    const fetch = require('node-fetch');
    testAPI().then(success => {
        console.log('\n' + '='.repeat(50));
        console.log(success ? '🎉 测试完成: API正常工作' : '💥 测试失败: API不可用');
        process.exit(success ? 0 : 1);
    });
} else {
    // 浏览器环境
    console.log('请在浏览器控制台中调用 testAPI() 函数');
}

// 导出供浏览器使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testAPI, API_CONFIG };
}
