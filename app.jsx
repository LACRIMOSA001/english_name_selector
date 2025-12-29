const { useState, useEffect, useRef } = React;

// --- 图标组件 (内置SVG，替代 import) ---
const Icon = ({ path, size = 24, className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {path}
    </svg>
);

const Icons = {
    Brain: (props) => <Icon {...props} path={<><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4A2.5 2.5 0 0 0 14.5 2Z" /></>} />,
    Sun: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>} />,
    Activity: (props) => <Icon {...props} path={<path d="M22 12h-4l-3 9L9 3l-3 9H2" />} />,
    Music: (props) => <Icon {...props} path={<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>} />,
    Crown: (props) => <Icon {...props} path={<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />} />,
    Star: (props) => <Icon {...props} path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />} />,
    ArrowRight: (props) => <Icon {...props} path={<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>} />,
    ArrowLeft: (props) => <Icon {...props} path={<><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>} />,
    CheckCircle: (props) => <Icon {...props} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>} />,
    Shield: (props) => <Icon {...props} path={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />} />,
    Disc: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></>} />,
    Volume2: (props) => <Icon {...props} path={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>} />,
    VolumeX: (props) => <Icon {...props} path={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>} />,
    PlayCircle: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>} />,
    Target: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>} />,
    Users: (props) => <Icon {...props} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>} />,
    Camera: (props) => <Icon {...props} path={<><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>} />,
    Download: (props) => <Icon {...props} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>} />,
    Share: (props) => <Icon {...props} path={<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>} />,
    Image: (props) => <Icon {...props} path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>} />,
    Sparkles: (props) => <Icon {...props} path={<><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></>} />
};

// --- AUDIO CONFIGURATION (BGM) ---
// 主题音乐配置 - 使用已验证可用的 Mixkit URL：
// grid: 特工任务主题 - 紧张神秘的间谍风格
// xavier: 科幻智慧主题 - 深沉科技感
// julian: 皇家夏日主题 - 温暖优雅
// sean: 现代简洁主题 - 动感节拍
const AUDIO_URLS = {
    grid: './audio/bgm_grid.mp3',      // Spy Glass (Kevin MacLeod) - 特工主题
    xavier: './audio/bgm_xavier.mp3',  // Space 1990 (Kevin MacLeod) - 科幻主题
    julian: './audio/bgm_julian.mp3',  // Master of the Feast (Kevin MacLeod) - 节日/欢快主题
    sean: './audio/bgm_sean.mp3',     // Cool Vibes (Kevin MacLeod) - 现代/酷炫主题
    success: './audio/bgm_success.mp3' // Adventure Meme (Kevin MacLeod) - 胜利音效
};

// --- NARRATION AUDIO URLS (预生成的TTS音频文件) ---
// 使用 Edge-TTS 生成的高质量中文旁白音频
// 运行 python generate_narration_edge.py 生成这些文件
const NARRATION_AUDIO_URLS = {
    grid: './audio/narration_grid.mp3',
    xavier: './audio/narration_xavier.mp3',
    julian: './audio/narration_julian.mp3',
    sean: './audio/narration_sean.mp3',
    success: './audio/narration_success.mp3'
};

// --- NARRATION SCRIPTS ---
const NARRATION_SCRIPTS = {
    grid: "特工赵夏，听好了。总部为你锁定了三个终极代号。每一个名字，都封印着一种改变世界的力量。现在的任务是：点击卡片，解码档案，决定你的命运。",
    xavier: "代号 Xavier。听，这是未来的回响。它象征着像X教授一样的大脑，用绝对的智慧穿透迷雾。选择它，你就是拥有心灵感应的领航者。",
    julian: "代号 Julian。感受到了吗？这是盛夏正午的烈阳。像年轻的凯撒大帝一样，自带光芒，温暖而强大。选择它，你就是天生的王者。",
    sean: "代号 Sean。干脆，利落。不需要多余的修饰，行动就是最好的语言。像风一样自由，像剑一样锋利。选择它，做最酷的行动派。",
    success: "代号已确认。恭喜你，特工。新的身份代码已录入系统。去创造你的传奇吧，祝你好运。"
};

// --- Confetti Helper ---
const fireConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 150; i++) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = '-10px';
        div.style.width = Math.random() * 10 + 5 + 'px';
        div.style.height = Math.random() * 10 + 5 + 'px';
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        div.style.transition = 'top 2.5s ease-in, transform 2.5s ease-in';
        div.style.zIndex = '9999';
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.top = '110vh';
            div.style.transform = `rotate(${Math.random() * 720}deg)`;
        }, 100);
        setTimeout(() => div.remove(), 3000);
    }
};

// --- DATA ---
const NAMES_DATA = [
    {
        id: 'xavier',
        name: 'Xavier',
        ipa: '/ˈzeɪ.vi.ə/',
        cnName: '泽维尔',
        tagline: '神秘的 X 战警',
        theme: 'scifi',
        description: 'X 代表未知，也代表无限可能。这个名字充满了智慧与科技感，像极了那些改变世界的超级天才。',
        superpower: '心灵感应 & 绝对智慧',
        reason: '完美呼应拼音 "Xia" 的首字母 X。',
        visualElement: <Icons.Brain size={120} />,
        color: 'from-indigo-600 to-purple-800'
    },
    {
        id: 'julian',
        name: 'Julian',
        ipa: '/ˈdʒuː.li.ən/',
        cnName: '朱利安',
        tagline: '夏日的小国王',
        theme: 'royal',
        description: '源自 glorious summer (光辉的夏日)。这是一个温暖、优雅且充满贵族气息的名字，就像七月的阳光一样耀眼。',
        superpower: '太阳光辉 & 领袖魅力',
        reason: '对应中文“夏”的含义 (July)。',
        visualElement: <Icons.Sun size={120} />,
        color: 'from-amber-400 to-orange-600'
    },
    {
        id: 'sean',
        name: 'Sean',
        ipa: '/ʃɔːn/',
        cnName: '肖恩',
        tagline: '完美的声音回响',
        theme: 'sonic',
        description: '简单、有力、纯粹。Sean 的发音干净利落，就像一段完美的旋律。它是一个现代且永不过时的经典名字。',
        superpower: '声波共鸣 & 极速行动',
        reason: '发音最接近“夏” (Sha- -> Shawn)。',
        visualElement: <Icons.Activity size={120} />,
        color: 'from-emerald-400 to-teal-600'
    }
];

// --- COMPONENTS ---

const HeroCard = ({ data, onClick }) => (
    <div
        onClick={onClick}
        className="group relative aspect-[6/7] w-full cursor-pointer overflow-hidden rounded-3xl bg-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-80 transition-opacity group-hover:opacity-100`}></div>
        <div className="absolute -right-6 -bottom-6 opacity-20 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110 text-white md:-right-10 md:-bottom-10">
            {data.visualElement}
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8 text-white">
            <div className="w-fit rounded-xl bg-white/20 p-3 backdrop-blur-md shadow-lg">
                {data.id === 'xavier' && <Icons.Brain size={28} />}
                {data.id === 'julian' && <Icons.Crown size={28} />}
                {data.id === 'sean' && <Icons.Music size={28} />}
            </div>

            <div className="space-y-2">
                <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">{data.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="bg-black/30 px-2 py-1 rounded text-sm font-mono tracking-wider opacity-80">{data.ipa}</span>
                </div>
                <p className="text-2xl font-bold opacity-90">{data.cnName}</p>
            </div>

            <div>
                <p className="font-bold text-lg opacity-80 mb-2">{data.tagline}</p>
                <div className="flex items-center gap-2 text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>点击解锁档案</span>
                    <Icons.ArrowRight size={16} />
                </div>
            </div>
        </div>
    </div>
);

const XavierView = ({ data, onBack, onConfirm, onReplay, isSpeaking }) => (
    <div className="app-screen bg-slate-950 text-indigo-100 font-mono">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 relative z-20 gap-4">
                <button onClick={onBack} className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                    <Icons.ArrowLeft size={16} /> 返回基地
                </button>
                <button
                    onClick={onReplay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/50 text-xs font-bold transition-all ${isSpeaking ? 'bg-indigo-500 text-white animate-pulse' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/50'}`}
                >
                    {isSpeaking ? <Icons.Activity size={14} className="animate-bounce" /> : <Icons.PlayCircle size={14} />}
                    {isSpeaking ? 'TRANSMITTING...' : '重播特工简报'}
                </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="w-full md:w-1/2 relative order-1">
                    <div className="relative z-10 bg-slate-900/80 border border-indigo-500/50 p-6 md:p-8 rounded-lg backdrop-blur-xl shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                        <div className="absolute -top-3 -left-3 bg-indigo-500 text-black text-xs font-bold px-2 py-1">TOP SECRET</div>
                        <div className="flex justify-center py-6 md:py-10 animate-pulse text-indigo-400">
                            <Icons.Brain size={120} className="md:w-[180px] md:h-[180px]" strokeWidth={1} />
                        </div>
                        <div className="font-mono text-xs text-indigo-500/70 mt-4 flex justify-between">
                            <span>ID: ZHAO-XIA-008</span>
                            <span>STATUS: UNLOCKED</span>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>

                <div className="w-full md:w-1/2 space-y-6 md:space-y-8 order-2">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-white mb-2 tracking-tighter glitch-effect">
                            {data.name}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="text-xl md:text-2xl font-mono text-indigo-300/80 tracking-wide bg-indigo-950/50 px-3 py-1 rounded">{data.ipa}</span>
                            <p className="text-xl md:text-2xl text-indigo-300 font-bold tracking-widest uppercase">/ {data.cnName} /</p>
                        </div>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-6 space-y-4">
                        <p className="text-base md:text-lg leading-relaxed text-indigo-100">{data.description}</p>
                        <div className="bg-indigo-900/30 p-4 rounded border border-indigo-500/30">
                            <h4 className="text-xs text-indigo-400 uppercase tracking-wider mb-2">匹配理由 (Mission Match)</h4>
                            <p>{data.reason}</p>
                        </div>
                    </div>
                    <div className="pt-4 pb-8 md:pb-0">
                        <button onClick={onConfirm} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95">
                            <Icons.Shield size={20} /> 确认代号：XAVIER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const JulianView = ({ data, onBack, onConfirm, onReplay, isSpeaking }) => (
    <div className="app-screen bg-[#fffbf0] text-amber-900 font-serif">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-amber-100/50 to-transparent rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 relative z-20 gap-4">
                <button onClick={onBack} className="flex items-center gap-2 text-amber-700/60 hover:text-amber-800 transition-colors font-sans font-bold text-sm tracking-wide">
                    <Icons.ArrowLeft size={16} /> Back to Selection
                </button>
                <button
                    onClick={onReplay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/50 text-xs font-bold font-sans transition-all ${isSpeaking ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/50 text-amber-600 hover:bg-white'}`}
                >
                    {isSpeaking ? <Icons.Activity size={14} className="animate-bounce" /> : <Icons.PlayCircle size={14} />}
                    {isSpeaking ? 'NARRATING...' : '重播简报'}
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
                <div className="mb-6 md:mb-8 relative">
                    <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-20 text-amber-500">
                        <Icons.Sun size={120} className="md:w-[200px] md:h-[200px]" />
                    </div>
                    <Icons.Crown size={60} className="md:w-[80px] md:h-[80px] text-amber-500 relative z-10 drop-shadow-xl" />
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-amber-600 mb-2 drop-shadow-sm">{data.name}</h1>
                <div className="flex items-center gap-4 mb-8 md:mb-10 opacity-70">
                    <div className="h-[1px] w-6 md:w-12 bg-amber-900"></div>
                    <span className="text-lg md:text-2xl font-mono text-amber-800/80">{data.ipa}</span>
                    <span className="text-xl md:text-2xl italic tracking-wide">{data.cnName}</span>
                    <div className="h-[1px] w-6 md:w-12 bg-amber-900"></div>
                </div>
                <div className="bg-white/60 p-6 md:p-10 rounded-t-3xl md:rounded-t-full rounded-b-[50px] md:rounded-b-[100px] border border-amber-200 shadow-xl backdrop-blur-sm mb-12 w-full">
                    <p className="text-lg md:text-xl leading-loose text-amber-800 font-medium">
                        “{data.description}”
                    </p>
                    <div className="mt-6 text-sm font-sans uppercase tracking-widest text-amber-600/60">
                        The King of Summer
                    </div>
                </div>
                <button onClick={onConfirm} className="group relative w-full md:w-auto px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-sans font-bold text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all mb-8 md:mb-0">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        戴上王冠 (Choose Julian) <Icons.Star className="fill-white" size={18} />
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
            </div>
        </div>
    </div>
);

const SeanView = ({ data, onBack, onConfirm, onReplay, isSpeaking }) => (
    <div className="app-screen bg-slate-50 text-slate-800 font-sans">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50 -skew-x-12 translate-x-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 relative z-20 gap-4">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors font-bold">
                    <Icons.ArrowLeft size={20} /> 返回列表
                </button>
                <button
                    onClick={onReplay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/50 text-xs font-bold transition-all ${isSpeaking ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-emerald-600 hover:bg-emerald-50'}`}
                >
                    {isSpeaking ? <Icons.Activity size={14} className="animate-bounce" /> : <Icons.PlayCircle size={14} />}
                    {isSpeaking ? 'PLAYING...' : '重播'}
                </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                <div className="w-full md:w-1/2 relative order-2 md:order-1">
                    <div className="relative">
                        <h1 className="text-[6rem] md:text-[12rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-600 opacity-20 absolute -top-10 -left-4 md:-top-20 md:-left-10 select-none pointer-events-none">
                            SEAN
                        </h1>
                        <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter relative z-10">
                            {data.name}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-xl md:text-2xl font-mono text-emerald-600 bg-emerald-100 px-2 rounded">{data.ipa}</span>
                            <h2 className="text-2xl md:text-4xl font-bold text-emerald-600 flex items-center gap-3">
                                {data.cnName} <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce"></div>
                            </h2>
                        </div>
                    </div>
                    <div className="mt-8 md:mt-12 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 bg-slate-900"></div>
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-600">
                                {data.description}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Icons.Activity className="text-emerald-500" />
                                <span className="font-bold text-sm uppercase text-slate-400">Name Frequency Analysis</span>
                            </div>
                            <div className="flex items-end gap-1 h-12">
                                {[40, 70, 30, 80, 50, 90, 60, 40].map((h, i) => (
                                    <div key={i} className="flex-1 bg-emerald-400 rounded-t-sm animate-[pulse_1s_ease-in-out_infinite]" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-right">Match: 99.9% compatible with "Xia"</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center py-6 md:py-0">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2rem] shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-500 group">
                        <Icons.Disc size={120} className="md:w-[150px] md:h-[150px] text-white animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-[2rem] transition-opacity"></div>
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg font-bold text-slate-800 transform rotate-6 text-sm md:text-base">
                            简单 Simple
                        </div>
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg font-bold text-slate-800 transform -rotate-6 text-sm md:text-base">
                            有力 Strong
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 md:mt-0 flex justify-end pb-8 md:pb-0">
                <button onClick={onConfirm} className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 active:bg-emerald-700 transition-colors shadow-xl flex items-center justify-center gap-3">
                    确认选择 <Icons.ArrowRight />
                </button>
            </div>
        </div>
    </div>
);

// --- Camera Component (Enhanced with better UI) ---
const CameraCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [flash, setFlash] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsActive(true);
            }
        } catch (err) {
            console.error("Camera error:", err);
            alert("无法访问摄像头，请检查浏览器权限。");
        }
    };

    const takePhotoWithCountdown = () => {
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    capturePhoto();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const capturePhoto = () => {
        if (!videoRef.current) return;

        // Flash effect
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        const canvas = document.createElement("canvas");
        const size = Math.min(videoRef.current.videoWidth, videoRef.current.videoHeight);
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");

        const sx = (videoRef.current.videoWidth - size) / 2;
        const sy = (videoRef.current.videoHeight - size) / 2;

        // 镜像绘制
        ctx.translate(400, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, sx, sy, size, size, 0, 0, 400, 400);

        const dataUrl = canvas.toDataURL("image/png", 0.95);
        onCapture(dataUrl);

        // 停止流
        const stream = videoRef.current.srcObject;
        if (stream) stream.getTracks().forEach(t => t.stop());
        setIsActive(false);
    };

    const cancelCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) stream.getTracks().forEach(t => t.stop());
        setIsActive(false);
        setCountdown(0);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onCapture(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 my-6">
            {!isActive ? (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <button
                        onClick={startCamera}
                        className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        <Icons.Camera size={20} className="group-hover:animate-pulse" />
                        <span>📸 拍摄特工照片</span>
                    </button>

                    <div className="text-slate-400 text-xs font-mono">- OR -</div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="group flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-slate-600"
                    >
                        <Icons.Image size={20} />
                        <span>📂 上传照片</span>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    {/* Camera viewport */}
                    <div className="relative rounded-2xl overflow-hidden border-4 border-indigo-500 shadow-2xl shadow-indigo-500/30">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-72 h-72 object-cover transform -scale-x-100"
                        />

                        {/* Flash overlay */}
                        {flash && (
                            <div className="absolute inset-0 bg-white animate-pulse z-20"></div>
                        )}

                        {/* Countdown overlay */}
                        {countdown > 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                <span className="text-8xl font-black text-white animate-ping">{countdown}</span>
                            </div>
                        )}

                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>

                        {/* Scanning line effect */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-[pulse_2s_ease-in-out_infinite]"></div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={cancelCamera}
                            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={takePhotoWithCountdown}
                            disabled={countdown > 0}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                        >
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            {countdown > 0 ? '准备中...' : '拍照'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Simple Camera Component (Native File Input Only) ---
const SimpleCameraCapture = ({ onCapture }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Compress/Resize image before processing if needed, but for now direct read
            const reader = new FileReader();
            reader.onload = (event) => {
                onCapture(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 my-6">
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-col items-center justify-center gap-3 bg-slate-800/80 hover:bg-slate-700 text-white w-full max-w-xs h-32 rounded-2xl border-2 border-dashed border-slate-600 hover:border-indigo-500 transition-all shadow-lg active:scale-95 px-6"
            >
                <div className="p-3 bg-indigo-600 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                    <Icons.Camera size={24} />
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">点击拍摄 / 上传照片</span>
                    <span className="text-[10px] text-slate-400 mt-1">支持相机和相册</span>
                </div>
            </button>
        </div>
    );
};

// --- SUCCESS SCREEN (Agent ID Card Version) ---
const SuccessScreen = ({ data, onReset }) => {
    const [photo, setPhoto] = useState(null);
    const cardRef = useRef(null);
    const [isSharing, setIsSharing] = useState(false);

    // 生成图片 Blob (用于分享)
    const generateImageBlob = async () => {
        if (!cardRef.current) return null;
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2
            });
            return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        } catch (err) {
            console.error("Image generation failed:", err);
            return null;
        }
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2 // 高清导出
            });
            const link = document.createElement('a');
            link.download = `Agent_${data.name}_ID.png`;
            link.href = canvas.toDataURL();
            link.click();
        } catch (err) {
            console.error("Export failed:", err);
            alert("下载失败，请手动截图保存。");
        }
    };

    const handleShare = async () => {
        setIsSharing(true);
        try {
            const blob = await generateImageBlob();
            if (!blob) throw new Error("无法生成特工证图片");

            const shareData = {
                title: '特工身份已确认',
                text: `我已加入 Jaylen Language Studio 特工组织！我的代号是 ${data.name}。立即加入我们：`,
                url: window.location.href
            };

            // 1. 尝试原生文件分享 (移动端体验最佳)
            if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'card.png', { type: 'image/png' })] })) {
                await navigator.share({
                    ...shareData,
                    files: [new File([blob], `Agent_${data.name}.png`, { type: 'image/png' })]
                });
            }
            // 2. 尝试普通原生分享 (不带图)
            else if (navigator.share) {
                await navigator.share(shareData);
                alert("已调用分享菜单。别忘了先下载特工证图片哦！");
            }
            // 3. 降级方案：复制链接
            else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert("分享链接已复制！请手动发送特工证图片给好友。");
            }
        } catch (err) {
            console.error("Share failed:", err);
            // 忽略用户取消分享的错误
            if (err.name !== 'AbortError') {
                alert("分享功能暂不可用，请截图分享。");
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="app-screen p-4 bg-slate-50 text-slate-900">
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${data.color} pointer-events-none`}></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-in-up">

                {/* 左侧：操作区 */}
                <div className="flex-1 flex flex-col items-center text-center space-y-6">
                    <h1 className="text-4xl font-black mb-2">任务完成！</h1>
                    <p className="text-xl text-slate-600">你的特工代号是：</p>
                    <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${data.color}`}>
                        {data.name}
                    </div>

                    {/* 拍照组件 */}
                    {!photo && <SimpleCameraCapture onCapture={setPhoto} />}
                    {photo && (
                        <button onClick={() => setPhoto(null)} className="text-sm text-slate-500 underline">
                            重新拍摄
                        </button>
                    )}

                    <div className="flex flex-col gap-3 mt-4 w-full max-w-xs">
                        {/* 下载按钮 */}
                        <button onClick={handleDownload} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
                            <Icons.Download size={20} /> 保存特工证 (Save ID)
                        </button>

                        <div className="flex gap-3">
                            {/* 分享按钮 */}
                            <button
                                onClick={handleShare}
                                disabled={isSharing}
                                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                            >
                                {isSharing ? <Icons.Activity size={20} className="animate-spin" /> : <Icons.Share size={20} />}
                                分享任务
                            </button>

                            {/* 重置按钮 */}
                            <button onClick={onReset} className="flex-1 px-4 py-3 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600 transition-colors">
                                重置
                            </button>
                        </div>
                    </div>
                </div>

                {/* 右侧：特工证预览 (将被截图的区域) */}
                <div className="flex-1 flex justify-center relative">
                    {/* 透明度展示背景：放置一个科技网格背景在卡片后面，证明它是透明的 */}
                    <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-20 mask-image-faded"></div>

                    <div
                        ref={cardRef}
                        className="w-[350px] bg-slate-900/75 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 holo-scan-overlay transform-gpu"
                        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                    >
                        {/* 证件背景纹理 - 动态微光 (改为更淡的纹理以配合透明感) */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 shimmer-bg-animate"></div>
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${data.color}`}></div>

                        <div className="p-6 relative z-10 flex flex-col items-center">
                            <div className="flex justify-between w-full items-center mb-6 border-b border-slate-700 pb-2">
                                <span className="font-mono text-xs text-slate-400 tracking-widest">TOP SECRET // AGENT ID</span>
                                <Icons.Shield size={20} className="text-slate-500" />
                            </div>

                            {/* 头像区 */}
                            <div className="w-32 h-32 rounded-lg bg-slate-800 border-2 border-slate-600 mb-6 overflow-hidden flex items-center justify-center relative">
                                {photo ? (
                                    <img src={photo} alt="Agent" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-slate-600 flex flex-col items-center">
                                        <Icons.Users size={40} className="mb-2 opacity-50" /> {/* Users icon as placeholder */}
                                        <span className="text-[10px]">NO PHOTO</span>
                                    </div>
                                )}
                                {/* 全息效果遮罩 */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
                            </div>

                            <h2 className="text-3xl font-black uppercase tracking-wider mb-1">{data.name}</h2>
                            <p className="font-mono text-indigo-400 text-sm mb-6">CODE: ZHAO-XIA-008</p>

                            <div className="w-full space-y-3 bg-slate-800/50 p-4 rounded text-sm mb-4 relative overflow-hidden">
                                <div className="flex justify-between border-b border-slate-700/50 pb-1">
                                    <span className="text-slate-500">REAL NAME</span>
                                    <span className="font-bold">ZHAO XIA</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-700/50 pb-1">
                                    <span className="text-slate-500">SPECIALTY</span>
                                    <span className="font-bold text-xs">{data.superpower.split('&')[0]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">ISSUED</span>
                                    <span className="font-mono">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* 认证戳 (Jaylen Language Studio) */}
                            <div className="w-full relative h-16 mt-2 flex items-center justify-between px-2">
                                <div className="text-[10px] text-slate-600 font-mono w-1/2 leading-tight">
                                    AUTHORIZED BY<br />CENTRAL COMMAND
                                </div>

                                {/* Jaylen Language Studio Stamp (金色印章风格) */}
                                <div className="w-24 h-24 absolute right-[-10px] bottom-[-20px] rounded-full border-2 border-yellow-600/60 rotate-[-15deg] flex items-center justify-center p-1 opacity-80 mix-blend-screen pointer-events-none">
                                    <div className="w-full h-full rounded-full border border-yellow-600/40 flex items-center justify-center p-1">
                                        <div className="text-center">
                                            <div className="text-[6px] tracking-widest text-yellow-600 font-black uppercase">Official</div>
                                            <div className="text-[8px] font-serif text-yellow-500 font-bold leading-tight py-1">
                                                Jaylen<br />Language<br />Studio
                                            </div>
                                            <div className="text-[6px] text-yellow-600 uppercase tracking-widest">Certified</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function App() {


    // UI State
    const [viewState, setViewState] = useState('grid'); // grid, detail, success
    const [selectedId, setSelectedId] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [visitedIds, setVisitedIds] = useState(new Set());

    // Scanner State
    const [hasStarted, setHasStarted] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const scanAudioCtxRef = useRef(null);
    const scanIntervalRef = useRef(null);

    // Audio Refs
    const bgmRefs = useRef({});
    const narrationAudioRef = useRef(null);

    // --- 1. Audio Initialization ---
    useEffect(() => {
        console.log("Initializing Audio System...");
        // Preload BGMs
        Object.keys(AUDIO_URLS).forEach(key => {
            const audio = new Audio(AUDIO_URLS[key]);
            audio.loop = (key !== 'success');
            audio.volume = 0.5;
            audio.preload = 'auto';
            audio.addEventListener('canplaythrough', () => console.log(`✅ BGM Loaded: ${key}`));
            audio.addEventListener('error', (e) => console.log(`❌ BGM Error [${key}]: ${e.target.error.code} - ${e.target.src}`));
            bgmRefs.current[key] = audio;
        });
        // Init Narration
        narrationAudioRef.current = new Audio();
        narrationAudioRef.current.volume = 1.0;
        narrationAudioRef.current.addEventListener('error', (e) => console.log(`❌ TTS Error: ${e.target.error?.message}`));

        return () => {
            Object.values(bgmRefs.current).forEach(a => a.pause());
            if (narrationAudioRef.current) narrationAudioRef.current.pause();
            if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
            if (scanAudioCtxRef.current) scanAudioCtxRef.current.close();
        };
    }, []);

    // --- 2. Scanner Logic (Web Audio) ---
    const isScanCompleteRef = useRef(false);

    // --- 2. Scanner Logic (Web Audio) ---
    const playScanSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            if (!scanAudioCtxRef.current) scanAudioCtxRef.current = new AudioContext();

            const ctx = scanAudioCtxRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error("Scan sound error:", e);
        }
    };

    const playSuccessBeep = () => {
        try {
            const ctx = scanAudioCtxRef.current;
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
            console.error("Success beep error:", e);
        }
    };

    const startScan = () => {
        setScanProgress(0);
        isScanCompleteRef.current = false;

        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

        // 1. Initialize/Resume Web Audio Context (User Gesture)
        try {
            if (!scanAudioCtxRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) scanAudioCtxRef.current = new AudioContext();
            }
            if (scanAudioCtxRef.current && scanAudioCtxRef.current.state === 'suspended') {
                scanAudioCtxRef.current.resume();
            }
        } catch (e) {
            console.log("Ctx Error: " + e.message);
        }

        // 2. Pre-play BGM silently (User Gesture hacking)
        // This ensures the browser allows audio playback later
        const gridBgm = bgmRefs.current['grid'];
        if (gridBgm) {
            // Don't use 0, use a very low volume to ensure 'active' state
            gridBgm.volume = 0.01;
            const p = gridBgm.play();
            if (p) {
                p.then(() => console.log("BGM Started (Silent)"))
                    .catch(e => console.log("BGM Blocked: " + e.message));
            }
        }

        scanIntervalRef.current = setInterval(() => {
            setScanProgress(prev => {
                const next = prev + 3; // Speed
                playScanSound();
                if (next >= 100) {
                    clearInterval(scanIntervalRef.current);
                    isScanCompleteRef.current = true; // Mark complete
                    playSuccessBeep();
                    completeScan();
                    return 100;
                }
                return next;
            });
        }, 30);
    };

    const stopScan = () => {
        if (isScanCompleteRef.current) return; // Don't stop if we just finished

        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        setScanProgress(0);

        // Stop the silent BGM if user gave up
        const gridBgm = bgmRefs.current['grid'];
        if (gridBgm) {
            gridBgm.pause();
            gridBgm.currentTime = 0;
        }
    };

    const completeScan = () => {
        // Ensure volume is restored eventually
        setTimeout(() => handleStart(), 500);
    };

    // --- 3. Audio Control Functions ---
    const fadeInAudio = (audio, targetVolume = 0.5, duration = 2000) => {
        // SIMPLIFIED: Direct play to debug silence issue
        try {
            audio.volume = targetVolume;
            if (audio.paused) {
                const p = audio.play();
                if (p) p.catch(e => console.log("FadeIn Play Err: " + e.message));
            }
        } catch (e) {
            console.log("FadeIn Err: " + e.message);
        }
    };

    const playBgm = (key) => {
        console.log(`Playing BGM: ${key}`);

        // 先停止当前旁白，避免音频重叠
        if (narrationAudioRef.current && !narrationAudioRef.current.paused) {
            narrationAudioRef.current.pause();
            narrationAudioRef.current.currentTime = 0;
            setIsSpeaking(false);
        }
        window.speechSynthesis.cancel();

        Object.entries(bgmRefs.current).forEach(([k, audio]) => {
            if (k === key) {
                try {
                    audio.volume = 0.5;
                    audio.currentTime = 0; // 从头开始播放
                    if (audio.paused) {
                        const p = audio.play();
                        if (p) p.catch(e => console.log(`PlayBgm [${k}] Err: ${e.message}`));
                    }
                } catch (e) {
                    console.log(`Audio Access Err: ${e.message}`);
                }
            } else {
                // 立即停止其他音频
                audio.pause();
                audio.currentTime = 0;
            }
        });
    };

    const playNarration = (narrationKey) => {
        if (isMuted || !narrationAudioRef.current) return;
        const audioUrl = NARRATION_AUDIO_URLS[narrationKey];
        if (!audioUrl) return;

        narrationAudioRef.current.src = audioUrl;

        // Ducking Logic
        const currentBgmKey = narrationKey === 'success' ? 'success' : (viewState === 'detail' ? narrationKey : 'grid');
        const currentBgm = bgmRefs.current[currentBgmKey] || bgmRefs.current['grid'];

        narrationAudioRef.current.onplay = () => {
            setIsSpeaking(true);
            if (currentBgm && !currentBgm.paused) currentBgm.volume = 0.15;
        };

        narrationAudioRef.current.onended = () => {
            setIsSpeaking(false);
            if (currentBgm) currentBgm.volume = 0.5;
        };

        const p = narrationAudioRef.current.play();
        if (p) p.catch(e => fallbackSpeak(NARRATION_SCRIPTS[narrationKey]));
    };

    const fallbackSpeak = (text) => {
        if (isMuted || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'));
        if (zhVoice) utterance.voice = zhVoice;
        utterance.rate = 0.95;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    // --- 4. Event Handlers ---
    const handleStart = () => {
        setHasStarted(true);
        setIsMuted(false);
        const gridBgm = bgmRefs.current['grid'];
        if (gridBgm) fadeInAudio(gridBgm, 0.5, 2000);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // Mute Effect
    useEffect(() => {
        if (isMuted) {
            Object.values(bgmRefs.current).forEach(a => a.pause());
            if (narrationAudioRef.current) narrationAudioRef.current.pause();
            window.speechSynthesis.cancel(); // 停止 TTS
            setIsSpeaking(false);
        } else {
            let currentKey = viewState === 'detail' ? selectedId : (viewState === 'success' ? 'success' : 'grid');
            if (currentKey) playBgm(currentKey);
        }
    }, [isMuted]);

    // --- Page Visibility: 离开页面时暂停，返回时恢复 ---
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // 页面隐藏：暂停所有音频
                console.log('📱 Page hidden - pausing audio');
                Object.values(bgmRefs.current).forEach(a => a.pause());
                if (narrationAudioRef.current) narrationAudioRef.current.pause();
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                // 页面可见：恢复播放 (仅当未静音且已开始时)
                console.log('📱 Page visible - resuming audio');
                if (!isMuted && hasStarted) {
                    let currentKey = viewState === 'detail' ? selectedId : (viewState === 'success' ? 'success' : 'grid');
                    if (currentKey) playBgm(currentKey);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isMuted, hasStarted, viewState, selectedId]);

    const handleReplayBriefing = () => {
        if (viewState === 'grid') playNarration('grid');
        if (viewState === 'detail' && selectedId) playNarration(selectedId);
    };

    const handleCardClick = (id) => {
        setSelectedId(id);
        setViewState('detail');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setViewState('grid');
        setSelectedId(null);
    };

    const handleConfirm = () => {
        setViewState('success');
        fireConfetti();
    };

    const handleReset = () => {
        setViewState('grid');
        setSelectedId(null);
        setHasStarted(false); // Reset to scanner? Or keep logged in. Let's keep logged in but go to grid.
    };

    // --- 5. Main Logic Effect ---
    useEffect(() => {
        if (!hasStarted) return;

        let currentKey = 'grid';
        if (viewState === 'success') currentKey = 'success';
        else if (viewState === 'detail') currentKey = selectedId;

        // Play BGM
        playBgm(currentKey);

        // Play Narration (Smart Logic)
        if (!isMuted) {
            let shouldPlay = false;
            if (currentKey === 'success') {
                shouldPlay = true;
            } else if (viewState === 'detail') {
                if (!visitedIds.has(currentKey)) {
                    shouldPlay = true;
                    setVisitedIds(prev => new Set(prev).add(currentKey));
                }
            } else if (viewState === 'grid') {
                if (!visitedIds.has('grid')) {
                    shouldPlay = true;
                    setVisitedIds(prev => new Set(prev).add('grid'));
                }
            }

            if (shouldPlay) {
                const timer = setTimeout(() => playNarration(currentKey), 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [viewState, selectedId, isMuted, hasStarted]);


    const selectedData = NAMES_DATA.find(n => n.id === selectedId);

    // --- 6. Render ---

    // Fingerprint Welcome Screen
    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-center p-6 select-none touch-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>

                <div className="relative z-10 animate-fade-in-up flex flex-col items-center">
                    <div className="text-xl font-mono text-indigo-400 mb-12 tracking-widest animate-pulse">SYSTEM LOCKED</div>

                    <div
                        className="relative w-40 h-40 mb-10 cursor-pointer group"
                        onMouseDown={startScan}
                        onMouseUp={stopScan}
                        onMouseLeave={stopScan}
                        onTouchStart={(e) => { e.preventDefault(); startScan(); }}
                        onTouchEnd={stopScan}
                    >
                        <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="46" fill="none" stroke={scanProgress >= 100 ? "#22c55e" : "#4f46e5"} strokeWidth="4" strokeDasharray="289" strokeDashoffset={289 - (289 * scanProgress / 100)} strokeLinecap="round" className="transition-all duration-75 ease-linear" />
                        </svg>
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${scanProgress > 0 ? 'scale-95 text-white' : 'text-slate-500 scale-100 group-hover:text-indigo-400'}`}>
                            <Icons.Target size={60} />
                        </div>
                        {scanProgress > 0 && scanProgress < 100 && (
                            <div className="absolute -inset-4 border border-indigo-500/50 rounded-full animate-ping"></div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        {scanProgress >= 100 ? "ACCESS GRANTED" : "身份验证"}
                    </h1>
                    <p className="text-indigo-300 text-sm tracking-widest font-mono">
                        {scanProgress > 0 ? `SCANNING... ${scanProgress}%` : "长按指纹解锁 / HOLD TO SCAN"}
                    </p>
                </div>
            </div>
        );
    }

    // Main App IO
    return (
        <div className="font-sans antialiased text-white">


            <button
                onClick={toggleMute}
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors shadow-2xl"
                title={isMuted ? "开启音效" : "静音"}
            >
                {isMuted ? <Icons.Music size={24} className="opacity-50" /> : <Icons.Music size={24} className="text-green-400 animate-pulse" />}
            </button>

            {viewState === 'grid' && (
                <div className="app-screen bg-slate-900 text-slate-100 pb-20">
                    <nav className="p-4 md:p-6 flex justify-between items-center max-w-6xl mx-auto">
                        <div className="text-xl md:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">ZHAO XIA</div>
                        <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-slate-800 text-xs md:text-sm font-bold border border-slate-700 text-slate-400 mr-24 md:mr-0">Agent Age: 8</div>
                    </nav>
                    <header className="text-center py-8 md:py-16 px-4 max-w-4xl mx-auto relative">
                        {!isMuted && (
                            <div className="flex justify-center mb-6">
                                <button onClick={handleReplayBriefing} className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border transition-all ${isSpeaking ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-slate-800/50'}`}>
                                    {isSpeaking ? <Icons.Activity size={14} className="animate-bounce" /> : <Icons.PlayCircle size={14} />}
                                    {isSpeaking ? 'INCOMING TRANSMISSION...' : '重播任务简报'}
                                </button>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-8 leading-tight">选择你的 <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">英文代号 (v2.1)</span></h1>
                        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">这里有三份顶级机密档案。每一个名字都蕴含着不同的力量。点击卡片，进入档案详情室，做出你的决定。</p>
                    </header>
                    <main className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {NAMES_DATA.map((n) => (<HeroCard key={n.id} data={n} onClick={() => handleCardClick(n.id)} />))}
                        </div>
                    </main>
                </div>
            )}

            {viewState === 'detail' && selectedData && (
                <div className="animate-fade-in">
                    {selectedData.id === 'xavier' && <XavierView data={selectedData} onBack={handleBack} onConfirm={handleConfirm} onReplay={handleReplayBriefing} isSpeaking={isSpeaking} />}
                    {selectedData.id === 'julian' && <JulianView data={selectedData} onBack={handleBack} onConfirm={handleConfirm} onReplay={handleReplayBriefing} isSpeaking={isSpeaking} />}
                    {selectedData.id === 'sean' && <SeanView data={selectedData} onBack={handleBack} onConfirm={handleConfirm} onReplay={handleReplayBriefing} isSpeaking={isSpeaking} />}
                </div>
            )}

            {viewState === 'success' && selectedData && (
                <SuccessScreen data={selectedData} onReset={handleReset} />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
