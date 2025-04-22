"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { JobCard } from "./job-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jobData } from "@/data/jobs"

export function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")

  const filteredJobs = jobData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "salary":
        return b.averageSalary - a.averageSalary
      case "experience":
        return a.experienceRequired - b.experienceRequired
      case "growth":
        return b.growthPotential - a.growthPotential
      case "satisfaction":
        return b.jobSatisfaction - a.jobSatisfaction
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Buscar trabajos, habilidades o industrias..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="salary">Mayor Salario</SelectItem>
              <SelectItem value="experience">Menor Experiencia</SelectItem>
              <SelectItem value="growth">Potencial de Crecimiento</SelectItem>
              <SelectItem value="satisfaction">Satisfacción Laboral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {searchQuery && (
        <p className="text-sm text-gray-500">
          {sortedJobs.length} {sortedJobs.length === 1 ? "resultado" : "resultados"} para {searchQuery}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {searchQuery && sortedJobs.length === 0 && (
        <div className="text-center py-12 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-100">No se encontraron resultados</h3>
          <p className="mt-2 text-gray-500">
            No pudimos encontrar trabajos que coincidan con tu búsqueda. Intenta usar palabras clave diferentes o
            explora nuestras categorías.
          </p>
        </div>
      )}
    </div>
  )
}
