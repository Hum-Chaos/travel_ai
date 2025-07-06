import requests
import json
from flask import current_app


def call_coze_api(message, hobbies=''):
    try:
        api_key = current_app.config['COZE_API_KEY']
        coze_url = current_app.config['COZE_API_URL']

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        # 构建提示词，加入用户爱好
        system_prompt = "你是一个专业的AI旅游助手。"
        if hobbies:
            system_prompt += f" 该用户喜欢{hobbies}。请根据用户的爱好推荐旅行地点和活动。"

        payload = {
            "model": "coze-model-name",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        }

        response = requests.post(coze_url, headers=headers, json=payload)
        response.raise_for_status()

        # 解析响应 - 根据Coze实际API响应调整
        response_data = response.json()
        return response_data['choices'][0]['message']['content']

    except Exception as e:
        current_app.logger.error(f"Coze API调用失败: {str(e)}")
        return None