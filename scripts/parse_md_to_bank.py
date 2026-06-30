#!/usr/bin/env python3
"""
Parse zoology question bank markdown files into structured JSON.

Input files (in E:/Zoology/docx/):
  1. 名词解释.md  — noun/term explanation questions (type: translation)
  2. 选择判断.md   — choice and true-false questions (type: choice / true-false)
  3. 简答论述.md   — essay questions (type: essay)

Output: E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json
"""

import re
import json
from datetime import datetime, timezone
from pathlib import Path

# ─── Paths ───────────────────────────────────────────────────────────────────
DOCX_DIR = Path("E:/Zoology/docx")
OUTPUT_FILE = Path("E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json")

# ─── Category definitions ────────────────────────────────────────────────────
CATEGORIES = [
    {"id": 0, "name": "脊索动物门（含圆口纲）"},
    {"id": 1, "name": "鱼纲"},
    {"id": 2, "name": "两栖纲"},
    {"id": 3, "name": "爬行纲"},
    {"id": 4, "name": "鸟纲"},
    {"id": 5, "name": "哺乳纲"},
    {"id": 6, "name": "比较解剖 / 综合"},
]

# For matching: (keyword_regex, category_id, canonical_name)
CATEGORY_PATTERNS = [
    (r'脊索动物', 0, '脊索动物门（含圆口纲）'),
    (r'圆口纲', 0, '脊索动物门（含圆口纲）'),
    (r'鱼纲', 1, '鱼纲'),
    (r'两栖纲', 2, '两栖纲'),
    (r'爬行纲', 3, '爬行纲'),
    (r'鸟纲', 4, '鸟纲'),
    (r'哺乳纲', 5, '哺乳纲'),
    (r'比较解剖', 6, '比较解剖 / 综合'),
    (r'^综合$', 6, '比较解剖 / 综合'),
]

# Explicit category text patterns (after stripping bold markers and leading dash)
KNOWN_CATEGORY_TEXTS = {
    '脊索动物门', '脊索动物门（含圆口纲）',
    '鱼纲', '两栖纲', '爬行纲', '鸟纲', '哺乳纲',
    '比较解剖 / 综合',
}


# ─── Helper functions ────────────────────────────────────────────────────────

def read_lines(path: Path) -> list[str]:
    """Read a UTF-8 file and return its lines."""
    with open(path, 'r', encoding='utf-8') as f:
        return f.readlines()


def clean_bold(text: str) -> str:
    """Remove **bold** markers from text."""
    return re.sub(r'\*\*', '', text)


def detect_category(text: str):
    """Try to detect a category from a text line.

    Returns (category_id, canonical_name) or (None, None).
    """
    clean = re.sub(r'\*\*', '', text)
    clean = re.sub(r'^-\s*', '', clean).strip()
    for kw, cid, cname in CATEGORY_PATTERNS:
        if re.search(kw, clean):
            return cid, cname
    return None, None


def get_indent_level(line: str) -> int:
    """Return the number of leading spaces before the dash in a list item.

    Only valid for lines matching ``^ *- ``. Returns -1 otherwise.
    """
    m = re.match(r'^( *)- ', line)
    return len(m.group(1)) if m else -1


def strip_trailing_count(text: str) -> str:
    """Remove trailing （N次） markers."""
    return re.sub(r'\s*[（(]\d+次[）)]\s*$', '', text).strip()


def clean_prompt(text: str) -> str:
    """Fully clean a prompt: bold, count markers, judgment markers."""
    text = clean_bold(text)
    text = re.sub(r'\s*[（(]\d+次[）)]\s*', '', text)
    text = re.sub(r'\s*[（(]判断/选择[）)]\s*', '', text)
    text = re.sub(r'\s*[（(]判断[）)]\s*', '', text)
    return text.strip()


# ─── File-specific parsers ───────────────────────────────────────────────────

def parse_noun_file(lines: list[str]) -> list[dict]:
    """Parse 名词解释.md → list of translation-type question dicts."""
    questions = []
    cat_id, cat_name = None, None
    current = None
    counter = 0

    for line in lines:
        stripped = line.rstrip()
        if not stripped.strip():
            continue

        indent = get_indent_level(stripped)

        if indent == 0:
            # ── Category line ──
            cid, cname = detect_category(stripped)
            if cid is not None:
                # Finalize previous question
                if current and current.get('prompt'):
                    counter += 1
                    current['id'] = f"translation-{counter:03d}"
                    if current.get('answer'):
                        questions.append(current)
                cat_id, cat_name = cid, cname
                current = None

        elif indent == 2:
            # ── Question line (term) ──
            if current and current.get('prompt'):
                counter += 1
                current['id'] = f"translation-{counter:03d}"
                if current.get('answer'):
                    questions.append(current)

            q_text = line.lstrip(' -').strip()
            # Extract the first **term** as the prompt
            term_match = re.search(r'\*\*(.+?)\*\*', q_text)
            prompt = (
                clean_bold(term_match.group(1))
                if term_match
                else clean_bold(q_text)
            )
            current = {
                'type': 'translation',
                'categoryId': cat_id,
                'parentTitle': cat_name,
                'title': '名词解释',
                'prompt': prompt,
                'answer': '',
                'source': '',
            }

        elif indent >= 4 and current is not None:
            # ── Content (definition / source) ──
            content = stripped.lstrip(' -').strip()
            if re.match(r'核心定义[：:]', content):
                ans = re.sub(r'^核心定义[：:]\s*', '', content)
                current['answer'] = clean_bold(ans).strip()
            elif re.match(r'出处[：:]', content):
                src = re.sub(r'^出处[：:]\s*', '', content)
                current['source'] = clean_bold(src).strip()

    # ── Last question ──
    if current and current.get('prompt') and current.get('answer'):
        counter += 1
        current['id'] = f"translation-{counter:03d}"
        questions.append(current)

    return questions


def parse_choice_tf_file(lines: list[str]) -> list[dict]:
    """Parse 选择判断.md → list of choice / true-false question dicts."""
    questions = []
    cat_id, cat_name = None, None
    current = None
    counters = {'choice': 0, 'true-false': 0}

    for line in lines:
        stripped = line.rstrip()
        if not stripped.strip():
            continue

        indent = get_indent_level(stripped)

        if indent == 0:
            # ── Category line ──
            cid, cname = detect_category(stripped)
            if cid is not None:
                if current:
                    _finalize_ctf(current, questions, counters)
                    current = None
                cat_id, cat_name = cid, cname

        elif indent == 2:
            # ── Question line ──
            if current:
                _finalize_ctf(current, questions, counters)

            q_text = re.sub(r'^  -\s*', '', stripped)
            current = {
                'prompt': q_text,
                'answer': '',
                'source': '',
                'categoryId': cat_id,
                'parentTitle': cat_name,
            }

        elif indent >= 4 and current is not None:
            # ── Content (answer / source / etc.) ──
            content = stripped.lstrip(' -').strip()
            # Try various answer-line formats
            ans_match = (
                re.match(r'\*\*答案[：:]\*\*\s*(.*)', content)
                or re.match(r'答案[：:]\s*(.*)', content)
            )
            if ans_match:
                current['answer'] = ans_match.group(1)
                # If answer text ends with **答案** and has nested content,
                # mark that we should collect subsequent lines
                if not current['answer'].strip():
                    current['_ans_indent'] = indent
            elif content == '**答案**' or content == '**答案：**':
                # Special case: **答案** with no inline text (nested list follows)
                current['answer'] = ''
                current['_ans_indent'] = indent
            elif current.get('_ans_indent') is not None and indent > current['_ans_indent']:
                # Collect nested answer content
                raw_text = re.sub(r'^- ', '', stripped.strip(), count=1)
                clean_text = clean_bold(raw_text).strip()
                if current['answer']:
                    current['answer'] += '\n' + clean_text
                else:
                    current['answer'] = clean_text
            elif re.match(r'出处[：:]\s*', content):
                src = re.sub(r'^出处[：:]\s*', '', content)
                current['source'] = clean_bold(src).strip()
            elif re.match(r'要点', content):
                # Reached next section, stop collecting answer
                current.pop('_ans_indent', None)

    # ── Last question ──
    if current:
        _finalize_ctf(current, questions, counters)

    return questions


def _finalize_ctf(q_data: dict, questions: list, counters: dict):
    """Classify a pending choice/tf question and append it to *questions*."""
    prompt = q_data.get('prompt', '')
    answer = q_data.get('answer', '')
    source = q_data.get('source', '')

    if _is_tf(prompt, answer):
        clean_ans = clean_bold(answer).strip()
        tf_value = (
            clean_ans.startswith('正确')
            or clean_ans.startswith('对')
            or clean_ans.startswith('true')
        )
        counters['true-false'] += 1
        questions.append({
            'id': f"true-false-{counters['true-false']:03d}",
            'type': 'true-false',
            'categoryId': q_data['categoryId'],
            'parentTitle': q_data['parentTitle'],
            'title': '判断题',
            'prompt': clean_prompt(prompt),
            'answer': tf_value,
            'source': source,
        })
    else:
        options, correct = _extract_choice_options(prompt, answer)
        counters['choice'] += 1
        q = {
            'id': f"choice-{counters['choice']:03d}",
            'type': 'choice',
            'categoryId': q_data['categoryId'],
            'parentTitle': q_data['parentTitle'],
            'title': '选择题',
            'prompt': clean_prompt(prompt),
            'answer': correct if correct else clean_bold(answer),
            'source': source,
        }
        if options:
            q['options'] = options
        questions.append(q)


def _is_tf(prompt: str, answer: str) -> bool:
    """Determine whether a question should be classified as true-false."""
    if '（判断' in prompt or '(判断' in prompt or '判断）' in prompt or '判断)' in prompt:
        return True
    clean_ans = clean_bold(answer).strip()
    # Check prefix (answer may have extra text after the verdict)
    return any(clean_ans.startswith(v) for v in ('正确', '错误', '对', '错', 'true', 'false'))


def _extract_choice_options(prompt: str, answer: str):
    """Extract options and determine correct answer letter(s) for a choice question.

    Returns (options_list, correct_letter_str).
    """
    options = []

    # ── Find options from parentheses containing '/' separators ──
    # Look for （...）or (...) groups with slashes
    paren_groups = re.findall(r'[（(]([^）)]+?)[）)]', prompt)
    for group in reversed(paren_groups):
        if '/' in group:
            parts = [
                clean_bold(p.strip())
                for p in group.split('/')
                if p.strip()
            ]
            if len(parts) >= 2:
                options = parts
                break

    if not options:
        return [], None

    labeled = [f"{chr(ord('A')+i)}. {o}" for i, o in enumerate(options)]
    clean_ans = clean_bold(answer).strip()

    # ── Case 1: answer is a bare letter ──
    letter_m = re.match(r'^\s*([A-D])\s*$', clean_ans)
    if letter_m:
        return labeled, letter_m.group(1)

    # ── Case 2: try to match options against the first "sentence" of answer ──
    first_part = re.split(r'[（(]', clean_ans, maxsplit=1)[0]
    first_part = re.split(r'[；;]', first_part, maxsplit=1)[0]

    correct_idx = []
    for i, opt in enumerate(options):
        if opt in first_part:
            correct_idx.append(i)

    # Fallback: check full text
    if not correct_idx:
        for i, opt in enumerate(options):
            if opt == clean_ans or clean_ans in opt or opt in clean_ans:
                correct_idx.append(i)

    if correct_idx:
        correct = '、'.join(chr(ord('A') + i) for i in sorted(set(correct_idx)))
        return labeled, correct

    # No match found – return options but no letter-answer
    return labeled, None


def parse_essay_file(lines: list[str]) -> list[dict]:
    """Parse 简答论述.md → list of essay-type question dicts."""
    questions = []
    cat_id, cat_name = None, None
    current = None
    answer_buffer: list[str] = []
    counter = 0

    def flush_current():
        """Save the pending question if valid."""
        nonlocal current, counter
        if current is None:
            return
        answer_text = '\n'.join(answer_buffer).strip()
        if not answer_text:
            return
        src_match = re.search(r'出处[：:]\s*([^\n]+)', answer_text)
        source = (
            clean_bold(src_match.group(1)).strip()
            if src_match
            else ''
        )
        counter += 1
        questions.append({
            'id': f"essay-{counter:03d}",
            'type': 'essay',
            'categoryId': current['categoryId'],
            'parentTitle': current['parentTitle'],
            'title': '简答论述',
            'prompt': current['prompt'],
            'answer': clean_bold(answer_text),
            'source': source,
        })
        current = None
        answer_buffer.clear()

    for line in lines:
        stripped = line.rstrip()
        if not stripped.strip():
            continue

        # ── Top-level list item (category or question) ──
        if re.match(r'^- ', stripped):
            if _is_essay_category(stripped):
                # ── Category ──
                flush_current()
                cid, cname = detect_category(stripped)
                if cid is not None:
                    cat_id, cat_name = cid, cname
            else:
                # ── Question ──
                flush_current()
                prompt_text = re.sub(r'^- ', '', stripped)
                prompt_text = clean_bold(prompt_text).strip()
                prompt_text = strip_trailing_count(prompt_text)
                current = {
                    'categoryId': cat_id,
                    'parentTitle': cat_name,
                    'prompt': prompt_text,
                }
        elif current is not None:
            # ── Answer content ──
            answer_buffer.append(stripped)

    # ── Last question ──
    flush_current()

    return questions


def _is_essay_category(line: str) -> bool:
    """Determine if a top-level ``- `` line in 简答论述.md is a category header."""
    clean = re.sub(r'\*\*', '', line)
    clean = re.sub(r'^-\s*', '', clean).strip()

    # Exact match against known category texts
    if clean in KNOWN_CATEGORY_TEXTS:
        return True

    # Short lines (<= 15 chars) containing a category keyword
    if len(clean) <= 15:
        for kw, _, _ in CATEGORY_PATTERNS:
            if re.search(kw, clean):
                return True

    return False


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    all_questions: list[dict] = []

    # 1. 名词解释.md
    print("Parsing 名词解释.md ...")
    lines = read_lines(DOCX_DIR / '名词解释.md')
    qs = parse_noun_file(lines)
    all_questions.extend(qs)
    print(f"  → {len(qs)} translation questions")

    # 2. 选择判断.md
    print("Parsing 选择判断.md ...")
    lines = read_lines(DOCX_DIR / '选择判断.md')
    qs = parse_choice_tf_file(lines)
    n_choice = sum(1 for q in qs if q['type'] == 'choice')
    n_tf = sum(1 for q in qs if q['type'] == 'true-false')
    all_questions.extend(qs)
    print(f"  → {n_choice} choice + {n_tf} true-false = {len(qs)} total")

    # 3. 简答论述.md
    print("Parsing 简答论述.md ...")
    lines = read_lines(DOCX_DIR / '简答论述.md')
    qs = parse_essay_file(lines)
    all_questions.extend(qs)
    print(f"  → {len(qs)} essay questions")

    # ── Aggregate category counts ──
    cat_counts = {c['id']: 0 for c in CATEGORIES}
    for q in all_questions:
        cid = q.get('categoryId')
        if cid is not None and cid in cat_counts:
            cat_counts[cid] += 1

    # ── Build output ──
    output = {
        'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'totalQuestions': len(all_questions),
        'categories': [
            {'id': c['id'], 'name': c['name'], 'questionCount': cat_counts[c['id']]}
            for c in CATEGORIES
        ],
        'questions': all_questions,
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # ── Print summary ──
    stats = {
        'translation': sum(1 for q in all_questions if q['type'] == 'translation'),
        'choice': sum(1 for q in all_questions if q['type'] == 'choice'),
        'true-false': sum(1 for q in all_questions if q['type'] == 'true-false'),
        'essay': sum(1 for q in all_questions if q['type'] == 'essay'),
    }
    print()
    print("=" * 48)
    print(f"  Total questions : {len(all_questions)}")
    print(f"  translation     : {stats['translation']}")
    print(f"  choice          : {stats['choice']}")
    print(f"  true-false      : {stats['true-false']}")
    print(f"  essay           : {stats['essay']}")
    print("─" * 48)
    print(f"  Output          : {OUTPUT_FILE}")
    print("=" * 48)


if __name__ == '__main__':
    main()
