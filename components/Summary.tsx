import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface SummaryProps {
  summary: string | null
}

const SAMPLE = 'Very nice summary'

export function Summary({ summary = SAMPLE }: SummaryProps) {
  // if (!summary) return null

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>Conversation Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{summary}</p>
      </CardContent>
    </Card>
  )
}
