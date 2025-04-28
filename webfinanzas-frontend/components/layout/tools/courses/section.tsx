"use client"

import { useState } from "react"
import { coursesData } from "@/data/courses"
import CourseCard from "./course-card"
import CourseDetail from "./course-detail"
import { BookOpen, BarChart2, PiggyBank, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FinanceCoursesSection() {
  const [courses, setCourses] = useState(coursesData)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeCategory, setActiveCategory] = useState("todos")

  const categories = [
    { id: "todos", name: "Todos", icon: <BookOpen className="h-4 w-4" /> },
    { id: "presupuesto", name: "Presupuesto", icon: <BarChart2 className="h-4 w-4" /> },
    { id: "ahorro", name: "Ahorro", icon: <PiggyBank className="h-4 w-4" /> },
    { id: "inversion", name: "Inversión", icon: <DollarSign className="h-4 w-4" /> },
  ]

  const filterCourses = (category: any) => {
    setActiveCategory(category)
    setSelectedCourse(null)

    if (category === "todos") {
      setCourses(coursesData)
    } else {
      setCourses(coursesData.filter((course) => course.category === category))
    }
  }

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course)
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBackToList = () => {
    setSelectedCourse(null)
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-200 mb-2">Educación Financiera</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Aprende a manejar tus finanzas personales con nuestros cursos y guías interactivas
        </p>
      </div>

      {!selectedCourse ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeCategory === category.id ? "bg-primary hover:bg-emerald-400" : ""
                }`}
                onClick={() => filterCourses(category.id)}
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => handleCourseSelect(course)} />
            ))}
          </div>
        </>
      ) : (
        <CourseDetail course={selectedCourse} onBack={handleBackToList} />
      )}
    </section>
  )
}
