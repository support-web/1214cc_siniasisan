'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 診断質問データ
const questions = [
  {
    id: 1,
    question: 'これまでの投資経験はありますか？',
    options: [
      { text: 'まったくない', score: 1 },
      { text: '預金や保険のみ', score: 2 },
      { text: '投資信託や株式の経験あり', score: 3 },
      { text: '積極的に運用している', score: 4 },
    ],
  },
  {
    id: 2,
    question: '資産運用の主な目的は何ですか？',
    options: [
      { text: '資産を減らさないこと', score: 1 },
      { text: 'インフレに負けない程度に増やしたい', score: 2 },
      { text: '老後資金をしっかり増やしたい', score: 3 },
      { text: '積極的に資産を増やしたい', score: 4 },
    ],
  },
  {
    id: 3,
    question: '運用中に一時的に資産が10%減少した場合、どうしますか？',
    options: [
      { text: 'すぐに全て売却する', score: 1 },
      { text: '一部を売却して様子を見る', score: 2 },
      { text: 'そのまま保有し続ける', score: 3 },
      { text: '追加で購入する', score: 4 },
    ],
  },
  {
    id: 4,
    question: '運用資金を使う予定はいつ頃ですか？',
    options: [
      { text: '1〜2年以内', score: 1 },
      { text: '3〜5年後', score: 2 },
      { text: '5〜10年後', score: 3 },
      { text: '10年以上先または未定', score: 4 },
    ],
  },
  {
    id: 5,
    question: '運用に回す資金は、生活費に対してどのような位置づけですか？',
    options: [
      { text: '生活に必要な資金の一部', score: 1 },
      { text: '数年分の生活費を確保した余裕資金', score: 2 },
      { text: '十分な余裕資金', score: 3 },
      { text: '完全な余剰資金', score: 4 },
    ],
  },
]

// 診断結果タイプ
const resultTypes = {
  stable: {
    icon: '🛡️',
    title: '安定重視型',
    description: 'あなたは資産の安全性を最も重視するタイプです。元本の保全を第一に考え、大きなリスクを取らない堅実な運用が向いています。',
    recommendations: [
      '元本確保型の商品を中心に',
      '定期預金、個人向け国債など',
      'リスク資産は全体の10〜20%程度',
    ],
    advice: 'インフレによる資産価値の目減りにも注意が必要です。専門家と一緒に、安全性と収益性のバランスを考えましょう。',
    color: 'bg-blue-100 border-blue-500',
    iconBg: 'bg-blue-500',
  },
  balanced: {
    icon: '⚖️',
    title: 'バランス型',
    description: 'あなたは安定性と成長性のバランスを重視するタイプです。リスクを抑えながらも、ある程度の資産成長を目指す運用が向いています。',
    recommendations: [
      '国内外の債券と株式をバランスよく',
      'バランス型投資信託の活用',
      'リスク資産は全体の30〜50%程度',
    ],
    advice: '定期的な見直しで、ライフステージに合わせた配分調整が大切です。プロのアドバイスを受けることをおすすめします。',
    color: 'bg-green-100 border-green-500',
    iconBg: 'bg-green-500',
  },
  growth: {
    icon: '📈',
    title: '成長志向型',
    description: 'あなたは中長期的な資産の成長を重視するタイプです。ある程度のリスクを許容しながら、積極的なリターンを目指す運用が向いています。',
    recommendations: [
      '株式を中心としたポートフォリオ',
      '国内外の株式投資信託',
      'リスク資産は全体の50〜70%程度',
    ],
    advice: '短期的な価格変動に一喜一憂せず、長期的な視点で運用することが成功の鍵です。',
    color: 'bg-orange-100 border-orange-500',
    iconBg: 'bg-orange-500',
  },
  aggressive: {
    icon: '🚀',
    title: '積極運用型',
    description: 'あなたは高いリターンを積極的に追求するタイプです。リスクを理解した上で、成長性の高い資産への投資が向いています。',
    recommendations: [
      '国内外の株式中心',
      '成長株や新興国への投資も視野に',
      'リスク資産は全体の70%以上',
    ],
    advice: '高いリターンには高いリスクが伴います。分散投資と定期的なリバランスを心がけましょう。',
    color: 'bg-red-100 border-red-500',
    iconBg: 'bg-red-500',
  },
}

type PageView = 'top' | 'diagnosis' | 'result'
type ResultType = keyof typeof resultTypes

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('top')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [resultType, setResultType] = useState<ResultType | null>(null)

  // スコア計算と結果タイプ判定
  const calculateResult = (scores: number[]): ResultType => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0)
    if (totalScore <= 8) return 'stable'
    if (totalScore <= 12) return 'balanced'
    if (totalScore <= 16) return 'growth'
    return 'aggressive'
  }

  // 診断開始
  const startDiagnosis = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setCurrentView('diagnosis')
  }

  // 回答選択
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const result = calculateResult(newAnswers)
      setResultType(result)
      setCurrentView('result')
    }
  }

  // 前の質問に戻る
  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    } else {
      setCurrentView('top')
    }
  }

  // もう一度診断する
  const restartDiagnosis = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResultType(null)
    setCurrentView('top')
  }

  // LINE URL (UTMパラメータ付き)
  const lineUrl = 'https://lin.ee/XXXXXXX?utm_source=shindan&utm_medium=web&utm_campaign=senior_asset'

  return (
    <main className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {/* トップページ */}
        {currentView === 'top' && (
          <motion.div
            key="top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* ヘッダー */}
            <header className="bg-primary text-white py-6 px-4">
              <h1 className="text-2xl md:text-3xl font-bold text-center leading-tight">
                シニアのための<br className="md:hidden" />資産運用診断
              </h1>
            </header>

            {/* メインコンテンツ */}
            <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-lg mx-auto w-full">
              {/* キャッチコピー */}
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl font-medium text-primary mb-4 leading-relaxed">
                  あなたに合った<br />資産運用を見つけましょう
                </p>
                <p className="text-lg text-gray-600 leading-loose">
                  簡単な5つの質問に答えるだけで、<br />
                  あなたに最適な運用スタイルがわかります
                </p>
              </div>

              {/* 診断の特徴 */}
              <div className="bg-white rounded-xl p-6 card-shadow mb-8">
                <div className="flex items-center justify-center gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">5</div>
                    <div className="text-sm text-gray-600">問の質問</div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div>
                    <div className="text-3xl font-bold text-primary">1</div>
                    <div className="text-sm text-gray-600">分で完了</div>
                  </div>
                </div>
              </div>

              {/* 診断開始ボタン */}
              <button
                onClick={startDiagnosis}
                className="w-full bg-accent hover:bg-orange-600 text-white text-xl font-bold py-5 px-8 rounded-xl card-shadow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                診断をはじめる
              </button>

              {/* 信頼性要素 */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  ※ 本診断はファイナンシャルプランナー監修
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 診断ページ */}
        {currentView === 'diagnosis' && (
          <motion.div
            key="diagnosis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {/* プログレスヘッダー */}
            <header className="bg-white border-b sticky top-0 z-10">
              <div className="max-w-lg mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={goBack}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    aria-label="前の質問に戻る"
                  >
                    <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-lg">戻る</span>
                  </button>
                  <span className="text-lg font-medium text-gray-700">
                    質問 {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                {/* プログレスバー */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-primary h-3 rounded-full"
                    initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </header>

            {/* 質問コンテンツ */}
            <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 質問文 */}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                    {questions[currentQuestion].question}
                  </h2>

                  {/* 選択肢 */}
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full text-left bg-white border-2 border-gray-200 hover:border-primary hover:bg-green-50 rounded-xl p-5 transition-all duration-200 card-shadow hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span className="flex items-center">
                          <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-lg font-bold text-gray-600 mr-4">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-lg text-gray-800">{option.text}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* 結果ページ */}
        {currentView === 'result' && resultType && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* ヘッダー */}
            <header className="bg-primary text-white py-4 px-4">
              <h1 className="text-xl font-bold text-center">診断結果</h1>
            </header>

            {/* 結果コンテンツ */}
            <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
              {/* 診断結果カード */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`bg-white rounded-2xl p-6 card-shadow border-l-4 ${resultTypes[resultType].color} mb-6`}
              >
                {/* タイプアイコンとタイトル */}
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{resultTypes[resultType].icon}</span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">あなたの運用タイプは</p>
                    <h2 className="text-2xl font-bold text-gray-800">{resultTypes[resultType].title}</h2>
                  </div>
                </div>

                {/* 説明文 */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {resultTypes[resultType].description}
                </p>

                {/* おすすめの運用方針 */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    おすすめの運用方針
                  </h3>
                  <ul className="space-y-2">
                    {resultTypes[resultType].recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* アドバイス */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">アドバイス</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {resultTypes[resultType].advice}
                  </p>
                </div>
              </motion.div>

              {/* LINE誘導セクション */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 card-shadow mb-6"
              >
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                  あなたに合った資産運用の<br />ご相談はこちらから
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  専門スタッフが無料でご相談をお受けします
                </p>

                {/* LINE友だち追加ボタン */}
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-btn flex items-center justify-center w-full py-4 px-6 text-xl font-bold"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINEで相談する
                </a>

                <p className="text-sm text-gray-500 text-center mt-4">
                  ※ 友だち追加後、「診断結果」と<br />メッセージをお送りください
                </p>
              </motion.div>

              {/* フッター */}
              <div className="text-center">
                <button
                  onClick={restartDiagnosis}
                  className="text-primary hover:text-primary-light text-lg underline mb-6"
                >
                  もう一度診断する
                </button>

                {/* 免責事項 */}
                <div className="bg-gray-100 rounded-lg p-4 text-left">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm">【ご注意】</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>・本診断は一般的な傾向を示すものであり、個別の投資アドバイスではありません。</li>
                    <li>・実際の投資判断は、ご自身の責任において行ってください。</li>
                    <li>・詳しくは専門家にご相談ください。</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
