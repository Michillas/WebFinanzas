import { Briefcase, TrendingUp, Clock, GraduationCap, Heart, Laptop, DollarSign, Star } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import type { JobType } from "@/data/job-data"

interface JobCardProps {
  job: JobType
}

export function JobCard({ job }: JobCardProps) {
  const formattedSalary = job.averageSalary.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })

  const getSalaryTier = (salary: number) => {
    if (salary >= 120000) return "text-emerald-600 bg-emerald-50"
    if (salary >= 80000) return "text-blue-600 bg-blue-50"
    if (salary >= 50000) return "text-amber-600 bg-amber-50"
    return "text-gray-600 bg-gray-50"
  }

  const getExperienceText = (years: number) => {
    if (years < 1) return "Principiante"
    if (years < 3) return "Junior"
    if (years < 5) return "Intermedio"
    if (years < 8) return "Senior"
    return "Experto"
  }

  return (
    <Card
      className="h-full transition-all hover:shadow-md overflow-hidden border-t-4"
      style={{ borderTopColor: `hsl(${job.id * 20}, 70%, 50%)` }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className={getSalaryTier(job.averageSalary)}>
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  {formattedSalary}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Salario anual promedio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-gray-500 flex items-center">
          <Briefcase className="h-3.5 w-3.5 mr-1.5" />
          {job.industry}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <p className="text-sm text-gray-600">{job.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Experiencia
            </div>
            <div className="flex items-center">
              <Progress value={Math.min(job.experienceRequired * 10, 100)} className="h-2 mr-2" />
              <span className="text-xs font-medium">{getExperienceText(job.experienceRequired)}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              Crecimiento
            </div>
            <div className="flex items-center">
              <Progress value={job.growthPotential * 10} className="h-2 mr-2" />
              <span className="text-xs font-medium">{job.growthPotential}/10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {job.keySkills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
          {job.keySkills.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs font-normal">
                    +{job.keySkills.length - 3} más
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">{job.keySkills.slice(3).join(", ")}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center p-1.5 rounded">
            <GraduationCap className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-center">{job.educationRequired}</span>
          </div>
          <div className="flex flex-col items-center p-1.5 rounded">
            <Laptop className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-center">{job.remotePercentage}% Remoto</span>
          </div>
          <div className="flex flex-col items-center p-1.5 rounded">
            <Heart className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-center">Vida-Trabajo: {job.workLifeBalance}/10</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-amber-400 mr-1" />
          <span className="text-sm">{job.jobSatisfaction}/10 Satisfacción</span>
        </div>
        <Button size="sm">Ver Detalles</Button>
      </CardFooter>
    </Card>
  )
}
