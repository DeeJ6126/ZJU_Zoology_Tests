import { useCallback } from 'react'

type DictValue = string | Record<string, string | Record<string, string>>
type Dict = Record<string, DictValue>

const zh: Dict = {
  nav: {
    home: '首页',
    categories: '题型选择',
    practice: '练习',
    mistakes: '错题本',
    results: '结果',
    about: '关于',
  },
  brand: {
    title: '动物学刷题工具',
    subtitle: 'Zoology · ZJU',
  },
  status: {
    answered: '已答',
    questions: '题',
    mistakes: '错题',
  },
  typeLabels: {
    translation: '名词解释',
    choice: '选择题',
    'true-false': '判断题',
    essay: '简答论述题',
  },
  typeDesc: {
    translation: '查看名词解释的参考答案，自主判断对错',
    choice: '四选一，选择后立即显示对错与解析',
    'true-false': '判断正误，即时反馈解析',
    essay: '论述分析，查看参考答案后自主判分',
  },
  practice: {
    notFound: '找不到当前题目。',
    back: '返回题型选择',
    questionN: '第 {n} / {m} 题',
    mistakeMode: '错题复习',
    inMistakes: '此题在错题本中',
    notInMistakes: '此题不在错题本中',
    removeMistake: '从错题本移除',
    addMistake: '加入错题本',
    prev: '上一题',
    next: '下一题',
    results: '查看结果',
    restart: '重新开始',
  },
  intro: {
    title: 'ZJU 动物学刷题工具',
    subtitle: '涵盖 4 种题型',
    startBtn: '开始练习',
    resumeSession: '继续上次练习',
    mistakesBtn: '错题本（{n}）',
    totalQuestions: '总题量',
    questionTypes: '题型类别',
    subCategories: '子分类',
    pendingMistakes: '待复习错题',
    typeStats: '{count} 道题，{cats} 个子分类',
    guideTitle: '使用指南',
    step1Title: '选择题型',
    step1Desc: '在题型选择页勾选想要练习的题型和子分类',
    step2Title: '答题练习',
    step2Desc: '按题型依次作答：名词解释、选择、判断、论述自主判分',
    step3Title: '查看结果',
    step3Desc: '完成练习后查看成绩统计，区分自动判分与自主判分',
    step4Title: '错题回顾',
    step4Desc: '错题自动收入错题本，支持错题专项练习',
  },
  tr: {
    subtitle: '名词解释 —— 写出你的答案后揭晓参考答案，自主判断对错',
    placeholder: '在此输入你的答案...',
    reveal: '显示参考答案',
    reference: '参考答案',
    gotIt: '我答对了',
    gotWrong: '我答错了',
    judgedCorrect: '✓ 你判断自己回答正确',
    judgedWrong: '✗ 你判断自己回答错误，已加入错题本',
    yourAnswer: '你的答案：',
  },
  tf: {
    true: '正确',
    false: '错误',
    correctMsg: '✓ 回答正确！',
    wrongMsg: '✗ 回答错误，正确答案是：',
    explanation: '解析',
  },
  choice: {
    correct: '✓ 回答正确！',
    wrong: '✗ 回答错误，正确答案是：',
    explanation: '解析',
  },
  essay: {
    subtitle: '论述题 —— 请在草稿区写下你的思路，然后查看参考答案并自主判断',
    placeholder: '在此输入你的分析论述（可选）...',
    reveal: '显示参考答案',
    reference: '参考答案',
    gotIt: '我基本答对了',
    gotWrong: '我答错了',
    judgedCorrect: '✓ 你判断自己回答正确',
    judgedWrong: '✗ 你判断自己回答错误，已加入错题本',
  },
  categories: {
    title: '选择题型与子分类',
    subtitle: '勾选想练习的子分类。已选 {n} 题。',
    start: '开始练习（{n} 题）',
    startShort: '开始练习',
    selectAll: '全选',
    deselectAll: '取消全选',
    clear: '清空',
    questionCount: '{n}',
  },
  results: {
    title: '练习结果',
    accuracy: '正确率：{n}%',
    answered: '已答：{n}/{m}',
    correct: '正确：{n}',
    selfJudgedCorrect: '自判正确：{n}',
    selfJudgedWrong: '自判错误：{n}',
    unanswered: '未答：{n}',
    totalLabel: '总题数',
    byType: '按题型统计',
    scope: '本次练习范围',
    retry: '再做一次',
    backCategories: '返回题型选择',
    viewMistakes: '查看错题本',
  },
  mistakes: {
    title: '错题本',
    emptyTitle: '错题本为空',
    emptyDesc: '完成练习后，答错的题目会自动加入错题本。',
    count: '共 {n} 道错题。',
    hint: '点击"开始错题练习"进行针对性复习。',
    startDrill: '开始错题练习（{n} 题）',
    startDrillShort: '开始错题练习',
    clearAll: '清空全部',
    confirmClear: '确定清空 {n} 条错题记录？',
    wrongCount: '错 {n} 次',
    yourAnswer: '你的答案：',
    correctAnswer: '正确答案：',
    removeFromMistakes: '从错题本移除',
  },
  about: {
    title: '关于',
    desc: 'ZJU 动物学刷题工具。涵盖名词解释、选择题、判断题、简答论述题 4 种题型。琥珀金配色。React 19 + Vite 8 + TypeScript 6。纯静态前端，localStorage 持久化。',
    source: '题库来源',
    sourceDesc: '历年考试真题汇总，按题型分类整理',
    types: '四种题型',
    typesDesc: '名词解释、选择题、判断题、简答论述题',
    selfJudge: '自主判分',
    selfJudgeDesc: '名词解释与论述题不自动判分，由你对照参考答案自行判断',
    mistakes: '错题本',
    mistakesDesc: '答错的题目自动收入错题本，支持错题专项练习',
    techTitle: '技术实现',
    techDesc: 'React 19 + Vite 8 + TypeScript 6，纯静态前端应用。所有练习数据仅存储在浏览器本地（localStorage），不上传任何服务器。',
  },
  app: {
    loadingTitle: '动物学习题库',
    loading: '正在加载题库...',
    errorTitle: '题库加载失败',
    errorMsg: '无法加载题库数据。',
    reload: '重新加载',
  },
}

export function useT() {
  return useCallback((category: string, key: string): string => {
    const parts = category.split('.')
    let node: unknown = zh
    for (const part of parts) {
      if (node == null || typeof node !== 'object') return key
      node = (node as Record<string, unknown>)[part]
    }
    if (node != null && typeof node === 'object' && !Array.isArray(node)) {
      return (node as Record<string, string>)[key] ?? key
    }
    if (typeof node === 'string') return node
    return key
  }, [])
}
