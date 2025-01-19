import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from './ui/button'
import { Link } from 'lucide-react'
import { z } from 'zod'

interface SummaryProps {
  summary?: string
}

const summarySchema = z.object({
  result: z.string(),
  flags: z.array(z.string()),
  rating: z.string(),
  tactics: z.array(z.string()),
  improvement: z.array(z.string()),
  resources: z.array(z.string()),
})

type SummaryData = z.infer<typeof summarySchema>

interface SummaryCardProps {
  summary?: SummaryData
}

const SAMPLE = 'Very nice summary'

export function SummaryCardOld({ summary }: SummaryCardProps) {
  if (!summary) return null

  return (
    <div className="summary-card">
      <div className="result-section">
        <h2>Result: {summary.result}</h2>
        <div className="rating">{summary.rating}</div>
      </div>

      <div className="section">
        <h3>Security Red Flags</h3>
        <ul>
          {summary.flags.map((flag, index) => (
            <li key={index}>{flag}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Social Engineering Tactics Used</h3>
        <ul>
          {summary.tactics.map((tactic, index) => (
            <li key={index}>{tactic}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Areas for Improvement</h3>
        <ul>
          {summary.improvement.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Helpful Resources</h3>
        <ul>
          {summary.resources.map((resource, index) => (
            <li key={index}>
              <a href={resource} target="_blank" rel="noopener noreferrer">
                {resource}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Summary({ summary }: SummaryCardProps) {
  // if (!summary) return null

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle>Conversation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{JSON.stringify(summary)}</p>
        </CardContent>
      </Card>
      <Button asChild>
        <Link href="/">Try a new scenario</Link>
      </Button>
    </div>
  )
}
