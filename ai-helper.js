/**
 * API调用辅助函数
 * 统一处理前端API调用，支持服务器代理模式
 */

// 检测是否在Railway等生产环境中
function isProduction() {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
}

// 统一的AI API调用函数
async function callAIAPI(requestBody) {
    const url = isProduction() ? '/api/ai' : '/api/ai';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Request': 'true'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`AI API调用失败: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('AI API调用错误:', error);
        throw error;
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { callAIAPI, isProduction };
}

// 全局变量（用于HTML内的script标签）
window.AIHelper = { callAIAPI, isProduction };
