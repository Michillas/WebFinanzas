"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DollarSign, Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CourseCard } from "@/components/layout/tools/courses/course-card"
import { FeaturedCourse } from "@/components/layout/tools/courses/featured-course"
import { coursesData, CourseLevel, CourseDuration, CourseTopic, SortOption, Course } from "@/data/courses"

export default function CoursesPage() {
    const [levelFilters, setLevelFilters] = useState<CourseLevel[]>([])
    const [durationFilters, setDurationFilters] = useState<CourseDuration[]>([])
    const [topicFilters, setTopicFilters] = useState<CourseTopic[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOption, setSortOption] = useState<SortOption>("popular")
    const [activeFiltersCount, setActiveFiltersCount] = useState(0)
    const [showMobileFilters, setShowMobileFilters] = useState(false)
  
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData)
    const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  
    useEffect(() => {
      setActiveFiltersCount(levelFilters.length + durationFilters.length + topicFilters.length + (searchQuery ? 1 : 0))
    }, [levelFilters, durationFilters, topicFilters, searchQuery])
  
    useEffect(() => {
      let result = [...coursesData]
  
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(
          (course) => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query),
        )
      }
  
      if (levelFilters.length > 0) {
        result = result.filter((course) => levelFilters.includes(course.level))
      }

      if (durationFilters.length > 0) {
        result = result.filter((course) => durationFilters.includes(course.durationCategory as CourseDuration))
      }

      if (topicFilters.length > 0) {
        result = result.filter((course) => course.topics.some((topic) => topicFilters.includes(topic as CourseTopic)))
      }
  
      result = sortCourses(result, sortOption)
  
      setFeaturedCourses(coursesData.filter((course) => course.featured).slice(0, 2))
  
      setFilteredCourses(result)
    }, [levelFilters, durationFilters, topicFilters, searchQuery, sortOption])

    const sortCourses = (courses: Course[], option: SortOption) => {
      switch (option) {
        case "popular":
          return [...courses].sort((a, b) => b.students - a.students)
        case "newest":
          return [...courses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        case "highest-rated":
          return [...courses].sort((a, b) => b.rating - a.rating)
        case "price-low":
          return [...courses].sort((a, b) => a.price - b.price)
        case "price-high":
          return [...courses].sort((a, b) => b.price - a.price)
        default:
          return courses
      }
    }

    const toggleLevelFilter = (level: CourseLevel) => {
      setLevelFilters((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
    }

    const toggleDurationFilter = (duration: CourseDuration) => {
      setDurationFilters((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
    }

    const toggleTopicFilter = (topic: CourseTopic) => {
      setTopicFilters((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
    }

    const resetFilters = () => {
      setLevelFilters([])
      setDurationFilters([])
      setTopicFilters([])
      setSearchQuery("")
    }
  
    // Group courses by category for the "All" tab
    const budgetingCourses = filteredCourses.filter(
      (course) => course.topics.includes("Budgeting") || course.topics.includes("Saving"),
    )
    const investingCourses = filteredCourses.filter((course) => course.topics.includes("Investing"))
    const debtCourses = filteredCourses.filter((course) => course.topics.includes("Debt Management"))
    const retirementCourses = filteredCourses.filter(
      (course) => course.topics.includes("Retirement") || course.topics.includes("Tax"),
    )
  
    // Get courses for specific tabs
    const popularCourses = coursesData.sort((a, b) => b.students - a.students).slice(0, 6)
    const newCourses = coursesData.filter((course) => course.isNew).slice(0, 6)
    const trendingCourses = coursesData.filter((course) => course.trending).slice(0, 6)
  
    // Spanish translations for level labels
    const getLevelInSpanish = (level: CourseLevel) => {
      switch (level) {
        case "Beginner":
          return "Principiante"
        case "Intermediate":
          return "Intermedio"
        case "Advanced":
          return "Avanzado"
        case "All Levels":
          return "Todos los niveles"
        default:
          return level
      }
    }
  
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Cursos de Educación Financiera</h1>
                <p className="text-muted-foreground">
                  Explora nuestro plan de estudios de cursos interactivos para desarrollar tu educación financiera
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar cursos..."
                    className="w-full md:w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Borrar búsqueda</span>
                    </button>
                  )}
                </div>
                <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowMobileFilters(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && <Badge className="ml-1 bg-green-600">{activeFiltersCount}</Badge>}
                </Button>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Mobile filters overlay */}
              {showMobileFilters && (
                <div className="fixed inset-0 z-50 bg-background md:hidden">
                  <div className="container py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Filtros</h2>
                      <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Filter content - same as desktop but in mobile overlay */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Nivel</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="beginner-mobile"
                              checked={levelFilters.includes("Beginner")}
                              onCheckedChange={() => toggleLevelFilter("Beginner")}
                            />
                            <Label htmlFor="beginner-mobile">Principiante</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="intermediate-mobile"
                              checked={levelFilters.includes("Intermediate")}
                              onCheckedChange={() => toggleLevelFilter("Intermediate")}
                            />
                            <Label htmlFor="intermediate-mobile">Intermedio</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="advanced-mobile"
                              checked={levelFilters.includes("Advanced")}
                              onCheckedChange={() => toggleLevelFilter("Advanced")}
                            />
                            <Label htmlFor="advanced-mobile">Avanzado</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="all-levels-mobile"
                              checked={levelFilters.includes("All Levels")}
                              onCheckedChange={() => toggleLevelFilter("All Levels")}
                            />
                            <Label htmlFor="all-levels-mobile">Todos los niveles</Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Duración</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="short-mobile"
                              checked={durationFilters.includes("Short")}
                              onCheckedChange={() => toggleDurationFilter("Short")}
                            />
                            <Label htmlFor="short-mobile">Corto (&lt; 3 semanas)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="medium-mobile"
                              checked={durationFilters.includes("Medium")}
                              onCheckedChange={() => toggleDurationFilter("Medium")}
                            />
                            <Label htmlFor="medium-mobile">Medio (3-6 semanas)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="long-mobile"
                              checked={durationFilters.includes("Long")}
                              onCheckedChange={() => toggleDurationFilter("Long")}
                            />
                            <Label htmlFor="long-mobile">Largo (&gt; 6 semanas)</Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Tema</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="budgeting-mobile"
                              checked={topicFilters.includes("Budgeting")}
                              onCheckedChange={() => toggleTopicFilter("Budgeting")}
                            />
                            <Label htmlFor="budgeting-mobile">Presupuesto</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="saving-mobile"
                              checked={topicFilters.includes("Saving")}
                              onCheckedChange={() => toggleTopicFilter("Saving")}
                            />
                            <Label htmlFor="saving-mobile">Ahorro</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="investing-mobile"
                              checked={topicFilters.includes("Investing")}
                              onCheckedChange={() => toggleTopicFilter("Investing")}
                            />
                            <Label htmlFor="investing-mobile">Inversión</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="debt-mobile"
                              checked={topicFilters.includes("Debt Management")}
                              onCheckedChange={() => toggleTopicFilter("Debt Management")}
                            />
                            <Label htmlFor="debt-mobile">Gestión de Deudas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="retirement-mobile"
                              checked={topicFilters.includes("Retirement")}
                              onCheckedChange={() => toggleTopicFilter("Retirement")}
                            />
                            <Label htmlFor="retirement-mobile">Jubilación</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button variant="outline" className="w-1/2" onClick={resetFilters}>
                        Restablecer
                      </Button>
                      <Button
                        className="w-1/2 bg-green-600 hover:bg-green-700"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </div>
              )}
  
              {/* Desktop filters sidebar */}
              <div className="hidden md:block md:w-[240px] flex-shrink-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                      {activeFiltersCount > 0 && <Badge className="ml-2 bg-green-600">{activeFiltersCount}</Badge>}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Nivel</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="beginner"
                              checked={levelFilters.includes("Beginner")}
                              onCheckedChange={() => toggleLevelFilter("Beginner")}
                            />
                            <Label htmlFor="beginner" className="text-sm">
                              Principiante
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="intermediate"
                              checked={levelFilters.includes("Intermediate")}
                              onCheckedChange={() => toggleLevelFilter("Intermediate")}
                            />
                            <Label htmlFor="intermediate" className="text-sm">
                              Intermedio
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="advanced"
                              checked={levelFilters.includes("Advanced")}
                              onCheckedChange={() => toggleLevelFilter("Advanced")}
                            />
                            <Label htmlFor="advanced" className="text-sm">
                              Avanzado
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="all-levels"
                              checked={levelFilters.includes("All Levels")}
                              onCheckedChange={() => toggleLevelFilter("All Levels")}
                            />
                            <Label htmlFor="all-levels" className="text-sm">
                              Todos los niveles
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Duración</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="short"
                              checked={durationFilters.includes("Short")}
                              onCheckedChange={() => toggleDurationFilter("Short")}
                            />
                            <Label htmlFor="short" className="text-sm">
                              Corto (&lt; 3 semanas)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="medium"
                              checked={durationFilters.includes("Medium")}
                              onCheckedChange={() => toggleDurationFilter("Medium")}
                            />
                            <Label htmlFor="medium" className="text-sm">
                              Medio (3-6 semanas)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="long"
                              checked={durationFilters.includes("Long")}
                              onCheckedChange={() => toggleDurationFilter("Long")}
                            />
                            <Label htmlFor="long" className="text-sm">
                              Largo (&gt; 6 semanas)
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Tema</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="budgeting"
                              checked={topicFilters.includes("Budgeting")}
                              onCheckedChange={() => toggleTopicFilter("Budgeting")}
                            />
                            <Label htmlFor="budgeting" className="text-sm">
                              Presupuesto
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="saving"
                              checked={topicFilters.includes("Saving")}
                              onCheckedChange={() => toggleTopicFilter("Saving")}
                            />
                            <Label htmlFor="saving" className="text-sm">
                              Ahorro
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="investing"
                              checked={topicFilters.includes("Investing")}
                              onCheckedChange={() => toggleTopicFilter("Investing")}
                            />
                            <Label htmlFor="investing" className="text-sm">
                              Inversión
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="debt"
                              checked={topicFilters.includes("Debt Management")}
                              onCheckedChange={() => toggleTopicFilter("Debt Management")}
                            />
                            <Label htmlFor="debt" className="text-sm">
                              Gestión de Deudas
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="retirement"
                              checked={topicFilters.includes("Retirement")}
                              onCheckedChange={() => toggleTopicFilter("Retirement")}
                            />
                            <Label htmlFor="retirement" className="text-sm">
                              Jubilación
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={resetFilters}>
                      Restablecer Filtros
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="w-full">
                    <Tabs defaultValue="all" className="w-full">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <TabsList>
                          <TabsTrigger value="all">Todos los Cursos</TabsTrigger>
                          <TabsTrigger value="popular">Populares</TabsTrigger>
                          <TabsTrigger value="new">Nuevos</TabsTrigger>
                          <TabsTrigger value="trending">Tendencia</TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Ordenar por:</span>
                          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Ordenar por" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="popular">Más Populares</SelectItem>
                              <SelectItem value="newest">Más Recientes</SelectItem>
                              <SelectItem value="highest-rated">Mejor Valorados</SelectItem>
                              <SelectItem value="price-low">Precio: Bajo a Alto</SelectItem>
                              <SelectItem value="price-high">Precio: Alto a Bajo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
  
                      {/* Results count */}
                      {(activeFiltersCount > 0 || searchQuery) && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">
                            Mostrando {filteredCourses.length} {filteredCourses.length === 1 ? "resultado" : "resultados"}
                            {searchQuery && (
                              <span>
                                {" "}
                                para <span className="font-medium text-foreground">{searchQuery}</span>
                              </span>
                            )}
                          </p>
                        </div>
                      )}
  
                      <TabsContent value="all">
                        {filteredCourses.length === 0 ? (
                          <div className="text-center py-12">
                            <h3 className="text-lg font-medium mb-2">No se encontraron cursos</h3>
                            <p className="text-muted-foreground mb-4">
                              Intenta ajustar tus filtros o términos de búsqueda
                            </p>
                            <Button variant="outline" onClick={resetFilters}>
                              Restablecer Filtros
                            </Button>
                          </div>
                        ) : (
                          <div className="grid gap-6">
                            {/* Only show featured section if we're not filtering or searching */}
                            {activeFiltersCount === 0 && !searchQuery && featuredCourses.length > 0 && (
                              <div>
                                <h2 className="text-xl font-bold mb-4">Cursos Destacados</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                                  {featuredCourses.map((course) => (
                                    <FeaturedCourse
                                      key={course.id}
                                      title={course.title}
                                      description={course.description}
                                      image={course.image}
                                      modules={course.modules}
                                      duration={course.duration}
                                      level={course.level}
                                      slug={course.slug}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* Budgeting & Saving Section */}
                            {budgetingCourses.length > 0 && (
                              <div>
                                <h2 className="text-xl font-bold mb-4">Presupuesto y Ahorro</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {budgetingCourses.map((course) => (
                                    <CourseCard
                                      key={course.id}
                                      title={course.title}
                                      description={course.description}
                                      image={course.image}
                                      modules={course.modules}
                                      duration={course.duration}
                                      level={course.level}
                                      slug={course.slug}
                                      isNew={course.isNew}
                                      trending={course.trending}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* Investing Section */}
                            {investingCourses.length > 0 && (
                              <div>
                                <h2 className="text-xl font-bold mb-4">Inversión</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {investingCourses.map((course) => (
                                    <CourseCard
                                      key={course.id}
                                      title={course.title}
                                      description={course.description}
                                      image={course.image}
                                      modules={course.modules}
                                      duration={course.duration}
                                      level={course.level}
                                      slug={course.slug}
                                      isNew={course.isNew}
                                      trending={course.trending}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* Debt Management Section */}
                            {debtCourses.length > 0 && (
                              <div>
                                <h2 className="text-xl font-bold mb-4">Gestión de Deudas</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {debtCourses.map((course) => (
                                    <CourseCard
                                      key={course.id}
                                      title={course.title}
                                      description={course.description}
                                      image={course.image}
                                      modules={course.modules}
                                      duration={course.duration}
                                      level={course.level}
                                      slug={course.slug}
                                      isNew={course.isNew}
                                      trending={course.trending}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* Retirement & Long-term Planning Section */}
                            {retirementCourses.length > 0 && (
                              <div>
                                <h2 className="text-xl font-bold mb-4">Jubilación y Planificación a Largo Plazo</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {retirementCourses.map((course) => (
                                    <CourseCard
                                      key={course.id}
                                      title={course.title}
                                      description={course.description}
                                      image={course.image}
                                      modules={course.modules}
                                      duration={course.duration}
                                      level={course.level}
                                      slug={course.slug}
                                      isNew={course.isNew}
                                      trending={course.trending}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* If we have filtered courses but none fit into the categories above */}
                            {filteredCourses.length > 0 &&
                              budgetingCourses.length === 0 &&
                              investingCourses.length === 0 &&
                              debtCourses.length === 0 &&
                              retirementCourses.length === 0 && (
                                <div>
                                  <h2 className="text-xl font-bold mb-4">Resultados de Búsqueda</h2>
                                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses.map((course) => (
                                      <CourseCard
                                        key={course.id}
                                        title={course.title}
                                        description={course.description}
                                        image={course.image}
                                        modules={course.modules}
                                        duration={course.duration}
                                        level={course.level}
                                        slug={course.slug}
                                        isNew={course.isNew}
                                        trending={course.trending}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="popular">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {popularCourses.map((course) => (
                            <CourseCard
                              key={course.id}
                              title={course.title}
                              description={course.description}
                              image={course.image}
                              modules={course.modules}
                              duration={course.duration}
                              level={course.level}
                              slug={course.slug}
                              isNew={course.isNew}
                              trending={course.trending}
                            />
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="new">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {newCourses.map((course) => (
                            <CourseCard
                              key={course.id}
                              title={course.title}
                              description={course.description}
                              image={course.image}
                              modules={course.modules}
                              duration={course.duration}
                              level={course.level}
                              slug={course.slug}
                              isNew={true}
                            />
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="trending">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {trendingCourses.map((course) => (
                            <CourseCard
                              key={course.id}
                              title={course.title}
                              description={course.description}
                              image={course.image}
                              modules={course.modules}
                              duration={course.duration}
                              level={course.level}
                              slug={course.slug}
                              trending={true}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="w-full border-t bg-background py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="font-bold">FinanceWise</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2023 FinanceWise. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Términos
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacidad
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contacto
              </Link>
            </div>
          </div>
        </footer>
      </div>
    )
}