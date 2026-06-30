#!/usr/bin/env python3
"""Parse zoology md -> question-bank.json (v3 with distractors)."""

import re, json
from datetime import datetime, timezone
from pathlib import Path

SRC = Path("E:/Zoology/docx")
OUT = Path("E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json")

def clean(s):
    s = re.sub(r'\*\*', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

OPTS = {
    '原索动物由哪些类群': ['尾索动物和头索动物', '头索动物和脊椎动物', '脊椎动物和尾索动物', '仅尾索动物'],
    '属于尾索动物': ['海鞘', '文昌鱼', '七鳃鳗', '盲鳗'],
    '雌雄同体': ['海鞘和盲鳗', '海鞘和文昌鱼', '文昌鱼和七鳃鳗', '七鳃鳗和盲鳗'],
    '分界是': ['脊椎骨的出现', '脊索的出现', '咽鳃裂的出现', '背神经管的出现'],
    '寰椎枢椎': ['爬行类及以上', '两栖类及以上', '鱼类及以上', '鸟类及以上'],
    '椎体类型': ['双凹型', '前凹型', '后凹型', '双平型'],
    '心脏中流动': ['全是缺氧血', '全是富氧血', '混合血', '无血液'],
    '鱼分为': ['头/躯干/尾', '头/颈/躯干/尾', '头/躯干/尾/四肢', '头/胸/腹/尾'],
    '红腺': ['气体分泌', '气体吸收', '气体传导', '气体过滤'],
    '卵圆窗': ['气体吸收', '气体分泌', '听觉传导', '嗅觉感受'],
    '皮肤衍生物包括': ['鳞片和粘液腺', '鳞片和毒腺', '羽毛和毛', '骨板和角质鳞'],
    '角质鳞与盾鳞': ['表皮vs真皮', '均为表皮', '均为真皮', '同源结构'],
    '哪对动脉弓': ['第4对', '第3对', '第5对', '第6对'],
    '皮肤腺类型': ['粘液腺和毒腺', '皮脂腺和汗腺', '仅粘液腺', '仅毒腺'],
    '颊窝': ['红外线感受器', '嗅觉器官', '听觉器官', '味觉器官'],
    '次生腭': ['分口腔成上下两层', '辅助咀嚼', '辅助发声', '辅助嗅觉'],
    '新脑皮': ['爬行类开始', '两栖类已出现', '鱼类已出现', '鸟类才开始'],
    '没有膀胱': ['鸟类', '两栖类', '爬行类', '哺乳类'],
    '排泄物类型': ['氨/尿素/尿酸', '尿素/氨/尿酸', '尿酸/氨/尿素', '尿素/尿酸/氨'],
    '有龙骨突': ['帝企鹅', '非洲鸵鸟', '鸸鹋', '长尾雉'],
    '羽区和裸区': ['平胸总目和企鹅总目', '突胸总目', '所有鸟类', '仅游禽'],
    '没有羽小钩': ['绒羽和纤羽', '正羽和绒羽', '仅正羽', '所有羽毛都有'],
    '雀形目': ['鹎', '夜鹭', '白鹭', '小鸊鷉'],
    '愈合荐骨': ['胸椎+腰椎+荐椎+尾椎', '仅腰椎+荐椎', '仅荐椎', '全部尾椎'],
    '中肾管的功能': ['仅输精(羊膜类)', '输尿兼输精', '仅输尿', '已退化'],
    '尾脂腺': ['错误', '正确', '仅游禽有', '仅涉禽有'],
    '后兽亚纲': ['大袋鼠', '鸭嘴兽', '针鼹', '蝙蝠'],
    '胚胎时期肾脏': ['前肾/中肾/后肾', '中肾/前肾/后肾', '后肾/中肾/前肾', '仅后肾'],
    '哺乳动物鸟类起源': ['均起源于爬行类', '哺乳起源于两栖类', '鸟类起源于哺乳类', '均起源于鱼类'],
    '脊椎属于哪种': ['双平型', '双凹型', '前凹型', '后凹型'],
    '牙齿胚层': ['外胚层和中胚层', '仅外胚层', '仅中胚层', '内胚层和中胚层'],
    '鹿角': ['鹿角(实角)', '角质鳞', '羽毛', '爪'],
    '皮肤衍生物的比较': ['角质鳞(表皮)/盾鳞(真皮)/羽毛(表皮)/毛发(表皮)', '均为表皮衍生物', '均为真皮衍生物', '角质鳞(真皮)/盾鳞(表皮)等'],
    '鱼类心脏内': ['正确', '错误', '仅心室中', '仅心房中'],
    '闭管循环': ['正确', '错误', '部分动物是', '无法判断'],
    '有鳃': ['错误(蝌蚪也有)', '正确', '仅成体有', '仅幼体有'],
    '鱼类用口进水': ['正确', '错误', '仅自由生活时', '仅寄生生活时'],
    '原兽亚纲与真兽亚纲': ['卵生vs胎生', '有袋vs无袋', '变温vs恒温', '有齿vs无齿'],
    '发电器官来源': ['电鳗(肌肉)', '电鲇(皮肤)', '电鳐(神经)', '电鲶(骨骼)'],
}

def guess_opts(prompt):
    """Generate 4 options for a choice question."""
    for g in reversed(re.findall(r'[（(]([^）)]+?)[）)]', prompt)):
        parts = [clean(p) for p in g.split('/') if p.strip()]
        if len(parts) >= 2:
            return [{'key': chr(65+i), 'text': p} for i, p in enumerate(parts)]
    cp = re.sub(r'\*\*', '', prompt)
    cp = re.sub(r'[（(]\d+次[）)]', '', cp)
    for kw, opts in sorted(OPTS.items(), key=lambda x: -len(x[0])):
        if kw in cp:
            return [{'key': chr(65+i), 'text': t} for i, t in enumerate(opts)]
    return [{'key': 'A', 'text': '是'}, {'key': 'B', 'text': '否'},
            {'key': 'C', 'text': '不一定'}, {'key': 'D', 'text': '以上都不对'}]

def ans_key(prompt, opts, ans_text):
    """Determine correct answer key letter."""
    for g in reversed(re.findall(r'[（(]([^）)]+?)[）)]', prompt)):
        parts = [clean(p) for p in g.split('/') if p.strip()]
        if len(parts) == len(opts) and len(parts) >= 2:
            for io, p in enumerate(parts):
                if p in ans_text: return chr(65+io)
            return 'A'
    for io, opt in enumerate(opts):
        if len(opt['text']) > 2 and opt['text'] in ans_text:
            return chr(65+io)
    return 'A'

def parse_noun(fp):
    qs, idx, i = [], 0, 0
    lines = open(fp, encoding='utf-8').readlines()
    while i < len(lines):
        m = re.match(r'^  - \*\*(.+?)\*\*', lines[i])
        if not m: i += 1; continue
        prompt = re.sub(r'[（(]\d+次[）)]', '', clean(m.group(1)))
        i += 1; buf = []
        while i < len(lines) and not re.match(r'^  - \*\*', lines[i]):
            if lines[i].strip(): buf.append(clean(lines[i]))
            i += 1
        idx += 1
        qs.append({'id': f"translation-{idx:03d}", 'type': 'translation',
            'categoryId': 'translation', 'categoryTitle': '名词解释', 'number': idx,
            'prompt': prompt, 'referenceAnswer': ' '.join(buf)})
    return qs

def parse_ctf(fp):
    choices, tfs, ic, it = [], [], 0, 0
    lines = open(fp, encoding='utf-8').readlines(); i = 0
    while i < len(lines):
        m = re.match(r'^  - (.+)', lines[i])
        if not m or '**答案' in lines[i]: i += 1; continue
        qtext = m.group(1).strip()
        if qtext in ['要点', '要点：'] or qtext.startswith('要点：'): i += 1; continue
        i += 1; ans_text = ''
        while i < len(lines):
            n = lines[i].rstrip()
            if n.startswith('  - ') and not n.startswith('    - '): break
            if n.strip() and '出处' not in n: ans_text += ' ' + clean(n)
            i += 1
        ans_text = ans_text.strip()
        if '判断' in qtext:
            it += 1
            tfs.append({'id': f"true-false-{it:03d}", 'type': 'true-false',
                'categoryId': 'true-false', 'categoryTitle': '判断题', 'number': it,
                'prompt': qtext, 'answerIsTrue': ans_text.startswith('正确')})
        else:
            opts = guess_opts(qtext)
            correct = ans_key(qtext, opts, ans_text)
            ic += 1
            choices.append({'id': f"choice-{ic:03d}", 'type': 'choice',
                'categoryId': 'choice', 'categoryTitle': '选择题', 'number': ic,
                'prompt': qtext, 'options': opts, 'answerKey': correct, 'explanation': ans_text})
    return choices, tfs

def parse_essay(fp):
    qs, idx, i = [], 0, 0
    skips = ['脊索动物', '鱼纲', '两栖纲', '爬行纲', '鸟纲', '哺乳纲', '比较解剖']
    lines = open(fp, encoding='utf-8').readlines()
    while i < len(lines):
        m = re.match(r'^- (.+)', lines[i])
        if not m: i += 1; continue
        t = clean(m.group(1))
        if any(kw in t for kw in skips) and len(t) < 15: i += 1; continue
        qtext = m.group(1).strip()
        if not qtext: i += 1; continue
        i += 1; buf = []
        while i < len(lines):
            n = lines[i].rstrip()
            if re.match(r'^- ', n) and not n.startswith('  '): break
            if n.strip(): buf.append(clean(n))
            i += 1
        idx += 1
        qs.append({'id': f"essay-{idx:03d}", 'type': 'essay',
            'categoryId': 'essay', 'categoryTitle': '简答论述', 'number': idx,
            'prompt': qtext, 'referenceAnswer': ' '.join(buf)})
    return qs

def main():
    t = parse_noun(SRC / '名词解释.md')
    c, f = parse_ctf(SRC / '选择判断.md')
    e = parse_essay(SRC / '简答论述.md')
    all_q = t + c + f + e
    type_names = {'translation':'名词解释','choice':'选择题','true-false':'判断题','essay':'简答论述'}
    cats = [{'id': tid, 'type': tid, 'title': type_names[tid],
             'questionCount': sum(1 for q in all_q if q['categoryId'] == tid)}
            for tid in ['translation','choice','true-false','essay']]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump({
            'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z'),
            'totalQuestions': len(all_q), 'categories': cats, 'questions': all_q
        }, f, ensure_ascii=False, indent=2)
    bad = sum(1 for q in all_q if q['type']=='choice' and len(q.get('options',[]))==4 and q['options'][0]['text']=='是')
    no_opts = [q for q in all_q if q['type']=='choice' and not q.get('options')]
    nc = sum(1 for q in all_q if q['type']=='choice')
    nf = sum(1 for q in all_q if q['type']=='true-false')
    print(f"Total: {len(all_q)} | Choice: {nc} | TF: {nf} | Generic: {bad} | NoOpts: {len(no_opts)}")
    for q in no_opts:
        print(f"  MISSING OPTS: {q['id']} {q['prompt'][:50]}")

if __name__ == '__main__':
    main()
