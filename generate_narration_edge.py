#!/usr/bin/env python3
"""
Edge-TTS 旁白音频生成脚本
为 "赵夏的英文名选择大冒险" 项目生成中文旁白

使用方法：
1. 安装 edge-tts: pip install edge-tts
2. 运行: python generate_narration_edge.py

生成的音频文件将保存在 ./audio/ 目录下
"""

import asyncio
import os

# 检查是否安装了 edge-tts
try:
    import edge_tts
except ImportError:
    print("❌ 请先安装 edge-tts:")
    print("   pip install edge-tts")
    exit(1)

# 旁白脚本配置 - 每个页面使用不同的语音角色
# 格式: { "key": ("文本内容", "语音角色", "语速") }
NARRATION_CONFIG = {
    "grid": {
        "text": "特工赵夏，听好了。总部为你锁定了三个终极代号。每一个名字，都封印着一种改变世界的力量。现在的任务是：点击卡片，解码档案，决定你的命运。",
        "voice": "zh-CN-YunyangNeural",  # 专业可靠的男声 - 任务简报风格
        "rate": "+0%"
    },
    "xavier": {
        "text": "代号 Xavier。听，这是未来的回响。它象征着像X教授一样的大脑，用绝对的智慧穿透迷雾。选择它，你就是拥有心灵感应的领航者。",
        "voice": "zh-CN-YunxiNeural",  # 阳光活泼男声 - 神秘智慧感
        "rate": "+5%"
    },
    "julian": {
        "text": "代号 Julian。感受到了吗？这是盛夏正午的烈阳。像年轻的凯撒大帝一样，自带光芒，温暖而强大。选择它，你就是天生的王者。",
        "voice": "zh-CN-XiaoxiaoNeural",  # 温暖女声 - 优雅皇家气质
        "rate": "+0%"
    },
    "sean": {
        "text": "代号 Sean。干脆，利落。不需要多余的修饰，行动就是最好的语言。像风一样自由，像剑一样锋利。选择它，做最酷的行动派。",
        "voice": "zh-CN-YunjianNeural",  # 激情男声 - 有力度和冲劲
        "rate": "+10%"
    },
    "success": {
        "text": "代号已确认。恭喜你，特工。新的身份代码已录入系统。去创造你的传奇吧，祝你好运。",
        "voice": "zh-CN-XiaoyiNeural",  # 活泼女声 - 欢快庆祝
        "rate": "+5%"
    }
}

# 输出目录
OUTPUT_DIR = "./audio"

async def generate_audio(text: str, output_path: str, voice: str, rate: str):
    """生成单个音频文件"""
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_path)

async def main():
    # 创建输出目录
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("🎙️ Edge-TTS 多角色旁白生成器")
    print("=" * 50)
    print("🎭 语音角色配置:")
    for key, config in NARRATION_CONFIG.items():
        print(f"   {key}: {config['voice']} ({config['rate']})")
    print()
    
    print("🎤 开始生成旁白音频...")
    print("-" * 50)
    
    for key, config in NARRATION_CONFIG.items():
        # Edge-TTS 输出 mp3 格式
        output_path = os.path.join(OUTPUT_DIR, f"narration_{key}.mp3")
        
        print(f"\n📝 生成: {key}")
        print(f"   语音: {config['voice']}")
        print(f"   文本: {config['text'][:30]}...")
        
        await generate_audio(config['text'], output_path, config['voice'], config['rate'])
        
        print(f"   ✅ 已保存: {output_path}")
    
    print("\n" + "=" * 50)
    print("🎉 全部音频生成完成！")
    print(f"📂 音频文件位置: {os.path.abspath(OUTPUT_DIR)}")
    print("\n生成的文件:")
    for key in NARRATION_CONFIG.keys():
        print(f"   - audio/narration_{key}.mp3")
    
    print("\n💡 提示: 音频已是 MP3 格式，可直接使用！")

if __name__ == "__main__":
    asyncio.run(main())
