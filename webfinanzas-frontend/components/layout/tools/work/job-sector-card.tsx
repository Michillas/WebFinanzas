import { Briefcase } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JobSectorProps {
  sector: {
    id: number
    title: string
    description: string
    jobCount: number
  }
}

export function JobSectorCard({ sector }: JobSectorProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-gray-500" />
          {sector.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{sector.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">{sector.jobCount.toLocaleString()} open positions</p>
        <Button variant="outline" size="sm">
          Explore
        </Button>
      </CardFooter>
    </Card>
  )
}
