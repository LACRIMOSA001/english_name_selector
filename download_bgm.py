import os
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

AUDIO_DIR = os.path.join(os.path.dirname(__file__), 'audio')
if not os.path.exists(AUDIO_DIR):
    os.makedirs(AUDIO_DIR)

# Kevin MacLeod 音乐 (Incompetech) - 高度可靠的直链
# + Archive Vivaldi for Classical
TRACKS = [
    # 1. Grid: Spy Glass (Kevin MacLeod) - Reliable
    ('bgm_grid.mp3', 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Spy%20Glass.mp3'),

    # 2. Xavier: Space 1990-B (Kevin MacLeod) - Reliable
    ('bgm_xavier.mp3', 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Space%201990-B.mp3'),
    
    # 3. Julian: Master of the Feast (Kevin MacLeod) - Reliable
    ('bgm_julian.mp3', 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Master%20of%20the%20Feast.mp3'),

    # 4. Sean: Cool Vibes (Kevin MacLeod) - Reliable
    ('bgm_sean.mp3', 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cool%20Vibes.mp3'),
    
    # 5. Success: Adventure Meme (Kevin MacLeod) - Reliable Short Fanfare
    ('bgm_success.mp3', 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Adventure%20Meme.mp3')
]

import subprocess

def download_file(url, filename):
    filepath = os.path.join(AUDIO_DIR, filename)
    print(f"Adding '{filename}'...")
    
    # Use curl with a browser-like User-Agent to bypass 403 checks
    # -L: Follow redirects
    # -A: User Agent
    # -o: Output file
    cmd = [
        "curl", 
        "-L", 
        "-A", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "-o", filepath,
        url
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"  ✅ [CURL OK] {filename}")
        else:
            print(f"  ❌ [ERROR] {filename}: {result.stderr}")
            
    except Exception as e:
        print(f"  ❌ [EXCEPTION] {filename}: {e}")

if __name__ == "__main__":
    print(f"⬇️ Downloading to {AUDIO_DIR} using curl...")
    for filename, url in TRACKS:
        if os.path.exists(os.path.join(AUDIO_DIR, filename)):
           print(f"  ⚠️ {filename} already exists, overwriting...")
        download_file(url, filename)
