import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import CodeExecutor from './CodeExecutor.jsx'
import { getQuestionById } from '../data/questions'

export default function QuestionPage() {
  const { id } = useParams()
  const data = useMemo(() => getQuestionById(id), [id])
  const randomQuestion = useMemo(() => {
    const samples = [
      'Why does the function return undefined instead of a value?',
      'Spot the off-by-one error and fix the range.',
      'What change prevents a NullPointerException in this flow?',
      'How would you ensure the program prints 8 as expected?',
    ]
    return samples[Math.floor(Math.random() * samples.length)]
  }, [id])

  return (
    <div className="question-wrap">
      <div className="question-header">
        <img className="question-img" src={data.image} alt={`Universe ${id}`} />
        <div>
          <h2 className="question-title">{data.title}</h2>
          <p className="question-desc">{data.description}</p>
          <div className="hint" aria-label="Question">Question: {randomQuestion}</div>
          <div className="hint">{data.expected}</div>
          <div style={{ marginTop: 10 }}>
            <Link to="/" className="brand">← Back to universes</Link>
          </div>
        </div>
      </div>

      <CodeExecutor language={data.language} code={data.code} />
    </div>
  )
}