// API调用封装函数
// 统一处理与后端服务器的通信

/**
 * 调用AI分析API
 * @param {string} question - 用户问题
 * @param {Object} data - 相关数据
 * @param {string} module - 模块类型 (kanban, lean, scrum)
 */
async function callAI(question, data, module = 'general') {
    try {
        const response = await fetch('/api/ai/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                data: data,
                module: module,
                timestamp: new Date().toISOString()
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result.response;
        } else {
            throw new Error(result.message || 'AI分析失败');
        }
    } catch (error) {
        console.error('AI API调用失败:', error);
        // 返回模拟响应作为fallback
        return generateMockAIResponse(question, data, module);
    }
}

/**
 * 上传文档API
 * @param {FormData} formData - 文档数据
 */
async function uploadDocument(formData) {
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('文档上传失败:', error);
        throw error;
    }
}

/**
 * 健康检查API
 */
async function healthCheck() {
    try {
        const response = await fetch('/health');
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('健康检查失败:', error);
        return { status: 'ERROR', message: error.message };
    }
}

/**
 * 生成模拟AI响应（当真实API不可用时）
 * @param {string} question - 问题
 * @param {Object} data - 数据
 * @param {string} module - 模块
 */
function generateMockAIResponse(question, data, module) {
    const mockResponses = {
        kanban: {
            procurement: "建议优化供应商选择：选择距离更近的供应商可减少运输碳排放约15%，同时考虑使用可再生能源的供应商。",
            manufacturing: "生产工艺优化建议：采用清洁能源，优化生产流程，预计可减少制造阶段碳排放20-25%。",
            logistics: "物流优化方案：采用电动车辆配送，优化运输路线，建立区域配送中心，预计减排30%。",
            usage: "产品使用阶段优化：提高产品能效设计，延长产品寿命，提供维修服务，减少使用阶段排放。",
            recycling: "回收处理改进：建立完善回收网络，提高材料回收率，采用先进回收技术，减少处理过程排放。",
            decomposition: "降解优化建议：使用可生物降解材料，优化包装设计，减少自然降解时间和环境影响。"
        },
        lean: {
            high: "深度分析显示该环节存在显著浪费。建议：1)流程重组 2)技术升级 3)供应链优化。预期减排效果：25-35%",
            medium: "发现中等程度的优化空间。建议：1)工艺改进 2)能源优化 3)材料替换。预期减排效果：15-25%",
            low: "该环节已相对优化，建议：1)持续监控 2)微调优化 3)标准化流程。预期减排效果：5-15%"
        },
        scrum: "基于Scrum方法论分析，建议建立跨功能减排团队，设置2周迭代周期，优先处理高碳排放环节。预期在3个Sprint内完成初步优化。"
    };
    
    const defaultResponse = "感谢您的咨询。基于当前数据分析，我们建议优先关注高排放环节，采用系统化方法逐步优化。具体建议需要结合更多详细信息进行深入分析。";
    
    // 根据模块和数据类型返回相应的响应
    if (module === 'kanban' && data && data.type) {
        return mockResponses.kanban[data.type] || defaultResponse;
    } else if (module === 'lean' && data && data.level) {
        return mockResponses.lean[data.level] || defaultResponse;
    } else if (module === 'scrum') {
        return mockResponses.scrum;
    }
    
    return defaultResponse;
}
