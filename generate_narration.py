#!/usr/bin/env python3
"""
Tortoise-TTS 旁白音频生成脚本
为 "赵夏的英文名选择大冒险" 项目生成中文旁白

使用方法：
1. 确保已安装 tortoise-tts: pip install tortoise-tts
2. 运行: python generate_narration.py

生成的音频文件将保存在 ./audio/ 目录下
"""

import os
import torch

# 检查是否安装了 tortoise-tts
try:
    from tortoise.api import TextToSpeech
    from tortoise.utils.audio import load_audio, load_voice, load_voices
except ImportError:
    print("❌ 请先安装 tortoise-tts:")
    print("   pip install tortoise-tts")
    print("   或者按照官方文档安装: https://github.com/neonbjb/tortoise-tts")
    exit(1)

# 旁白脚本 - 与 HTML 中的 NARRATION_SCRIPTS 对应
NARRATION_SCRIPTS = {
    "grid": "特工赵夏，听好了。总部为你锁定了三个终极代号。每一个名字，都封印着一种改变世界的力量。现在的任务是：点击卡片，解码档案，决定你的命运。",
    "xavier": "代号 Xavier。听，这是未来的回响。它象征着像X教授一样的大脑，用绝对的智慧穿透迷雾。选择它，你就是拥有心灵感应的领航者。",
    "julian": "代号 Julian。感受到了吗？这是盛夏正午的烈阳。像年轻的凯撒大帝一样，自带光芒，温暖而强大。选择它，你就是天生的王者。",
    "sean": "代号 Sean。干脆，利落。不需要多余的修饰，行动就是最好的语言。像风一样自由，像剑一样锋利。选择它，做最酷的行动派。",
    "success": "代号已确认。恭喜你，特工。新的身份代码已录入系统。去创造你的传奇吧，祝你好运。"
}

# 输出目录
OUTPUT_DIR = "./audio"

def main():
    # 创建输出目录
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("🎙️ Tortoise-TTS 旁白生成器")
    print("=" * 50)
    
    # 检测设备
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"📍 使用设备: {device}")
    
    if device == "cpu":
        print("⚠️  警告: 使用 CPU 生成可能非常慢，建议使用 GPU")
    
    # 初始化 TTS
    print("\n🔄 正在加载 Tortoise-TTS 模型...")
    tts = TextToSpeech()
    
    # 可选：使用自定义声音（需要提供参考音频）
    # 如果你有参考音频，可以放在 tortoise/voices/your_voice/ 目录下
    # voice_samples, conditioning_latents = load_voice("your_voice")
    
    print("\n🎤 开始生成旁白音频...")
    print("-" * 50)
    
    for key, text in NARRATION_SCRIPTS.items():
        output_path = os.path.join(OUTPUT_DIR, f"narration_{key}.wav")
        
        print(f"\n📝 生成: {key}")
        print(f"   文本: {text[:30]}...")
        
        # 生成语音
        # preset 可选: "ultra_fast", "fast", "standard", "high_quality"
        # 中文可能需要调整参数
        gen = tts.tts_with_preset(
            text,
            preset="fast",  # 可以改成 "standard" 或 "high_quality" 获得更好的质量
            voice_samples=None,
            conditioning_latents=None,
        )
        
        # 保存音频
        import torchaudio
        torchaudio.save(output_path, gen.squeeze(0).cpu(), 24000)
        
        print(f"   ✅ 已保存: {output_path}")
    
    print("\n" + "=" * 50)
    print("🎉 全部音频生成完成！")
    print(f"📂 音频文件位置: {os.path.abspath(OUTPUT_DIR)}")
    print("\n生成的文件:")
    for key in NARRATION_SCRIPTS.keys():
        print(f"   - audio/narration_{key}.wav")
    
    print("\n💡 提示: 你可能需要将 .wav 文件转换为 .mp3 以减小文件大小")
    print("   命令: ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3")

if __name__ == "__main__":
    main()
