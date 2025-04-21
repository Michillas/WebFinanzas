"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, FileText, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// This would normally come from a database
const getLessonData = (slug: string, moduleId: string) => {
  // Mock data for the lesson
  return {
    courseTitle: "Financial Foundations",
    courseSlug: "financial-foundations",
    moduleTitle: "Budgeting Fundamentals",
    moduleNumber: Number.parseInt(moduleId),
    totalModules: 8,
    currentLesson: 1,
    totalLessons: 5,
    lessonTitle: "Creating Your First Budget",
    lessonContent: `
      <h2>Introduction to Budgeting</h2>
      <p>A budget is a financial plan that helps you track your income and expenses. It's a powerful tool that gives you control over your money and helps you achieve your financial goals.</p>
      
      <h3>Why Budgeting Matters</h3>
      <p>Budgeting is essential because it:</p>
      <ul>
        <li>Helps you understand where your money is going</li>
        <li>Prevents overspending</li>
        <li>Helps you save for future goals</li>
        <li>Reduces financial stress</li>
        <li>Enables better financial decisions</li>
      </ul>
      
      <h3>The 50/30/20 Rule</h3>
      <p>One popular budgeting method is the 50/30/20 rule:</p>
      <ul>
        <li><strong>50%</strong> of your income goes to needs (housing, food, utilities)</li>
        <li><strong>30%</strong> goes to wants (entertainment, dining out)</li>
        <li><strong>20%</strong> goes to savings and debt repayment</li>
      </ul>
      
      <p>This framework provides a simple starting point for allocating your income.</p>
    `,
    quiz: {
      question: "What percentage of your income should go to needs according to the 50/30/20 rule?",
      options: [
        { id: "a", text: "20%" },
        { id: "b", text: "30%" },
        { id: "c", text: "50%" },
        { id: "d", text: "60%" },
      ],
      correctAnswer: "c",
    },
    exercise: {
      title: "Create Your Basic Budget",
      instructions:
        "List your monthly income and expenses in the categories below. Calculate the percentage of income for each category and compare it to the 50/30/20 rule.",
      template: {
        income: "Monthly Income: $",
        needs: "Needs (housing, food, utilities): $",
        wants: "Wants (entertainment, dining out): $",
        savings: "Savings and debt repayment: $",
      },
    },
  }
}

export default function LessonPage({ params }: { params: { slug: string; module: string } }) {
  const lesson = getLessonData(params.slug, params.module)
  const [activeTab, setActiveTab] = useState("lesson")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [exerciseValues, setExerciseValues] = useState({
    income: "",
    needs: "",
    wants: "",
    savings: "",
  })

  const handleAnswerSubmit = () => {
    setIsAnswerSubmitted(true)
  }

  const handleExerciseChange = (field: string, value: string) => {
    setExerciseValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isCorrectAnswer = selectedAnswer === lesson.quiz.correctAnswer

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <Link
              href={`/tools/courses/${lesson.courseSlug}`}
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Course
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{lesson.lessonTitle}</h1>
                <p className="text-muted-foreground">
                  {lesson.courseTitle} • Module {lesson.moduleNumber}: {lesson.moduleTitle}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/tools/courses/${lesson.courseSlug}/${lesson.moduleNumber}/0`}>
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Link>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href={`/tools/courses/${lesson.courseSlug}/${lesson.moduleNumber}/2`}>
                    Next
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Lesson {lesson.currentLesson} of {lesson.totalLessons}
                </span>
                <span className="text-sm font-medium">
                  Module {lesson.moduleNumber} of {lesson.totalModules}
                </span>
              </div>
              <Progress value={(lesson.currentLesson / lesson.totalLessons) * 100} className="h-2 w-full" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="lesson">Lesson</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="exercise">Exercise</TabsTrigger>
                </TabsList>
                <TabsContent value="lesson" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div
                        className="prose max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: lesson.lessonContent }}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("quiz")}>
                        Complete Lesson
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("quiz")}>
                        Continue to Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="quiz" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Knowledge Check</CardTitle>
                      <CardDescription>Test your understanding of the lesson content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="font-medium">{lesson.quiz.question}</h3>
                        <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
                          {lesson.quiz.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.id} id={option.id} disabled={isAnswerSubmitted} />
                              <Label htmlFor={option.id}>{option.text}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                        {isAnswerSubmitted && (
                          <div
                            className={`p-4 rounded-md ${isCorrectAnswer ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                          >
                            {isCorrectAnswer ? (
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                <span>Correct! Well done.</span>
                              </div>
                            ) : (
                              <div>
                                <p>
                                  Not quite right. The correct answer is{" "}
                                  {lesson.quiz.options.find((o) => o.id === lesson.quiz.correctAnswer)?.text}.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("lesson")}>
                        Back to Lesson
                      </Button>
                      {isAnswerSubmitted ? (
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("exercise")}>
                          Continue to Exercise
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handleAnswerSubmit}
                          disabled={!selectedAnswer}
                        >
                          Submit Answer
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="exercise" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{lesson.exercise.title}</CardTitle>
                      <CardDescription>{lesson.exercise.instructions}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="income">{lesson.exercise.template.income}</Label>
                            <input
                              id="income"
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={exerciseValues.income}
                              onChange={(e) => handleExerciseChange("income", e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="needs">{lesson.exercise.template.needs}</Label>
                            <input
                              id="needs"
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={exerciseValues.needs}
                              onChange={(e) => handleExerciseChange("needs", e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="wants">{lesson.exercise.template.wants}</Label>
                            <input
                              id="wants"
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={exerciseValues.wants}
                              onChange={(e) => handleExerciseChange("wants", e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="savings">{lesson.exercise.template.savings}</Label>
                            <input
                              id="savings"
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={exerciseValues.savings}
                              onChange={(e) => handleExerciseChange("savings", e.target.value)}
                            />
                          </div>
                        </div>

                        {exerciseValues.income &&
                          exerciseValues.needs &&
                          exerciseValues.wants &&
                          exerciseValues.savings && (
                            <div className="p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              <h4 className="font-medium mb-2">Your Budget Breakdown:</h4>
                              <p>
                                Needs:{" "}
                                {(
                                  (Number.parseFloat(exerciseValues.needs) / Number.parseFloat(exerciseValues.income)) *
                                  100
                                ).toFixed(1)}
                                % (Target: 50%)
                              </p>
                              <p>
                                Wants:{" "}
                                {(
                                  (Number.parseFloat(exerciseValues.wants) / Number.parseFloat(exerciseValues.income)) *
                                  100
                                ).toFixed(1)}
                                % (Target: 30%)
                              </p>
                              <p>
                                Savings:{" "}
                                {(
                                  (Number.parseFloat(exerciseValues.savings) /
                                    Number.parseFloat(exerciseValues.income)) *
                                  100
                                ).toFixed(1)}
                                % (Target: 20%)
                              </p>
                            </div>
                          )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("quiz")}>
                        Back to Quiz
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" asChild>
                        <Link href={`/tools/courses/${lesson.courseSlug}/${lesson.moduleNumber}/2`}>
                          Next Lesson
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Module Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Introduction to Budgeting</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-green-100 dark:bg-green-900/30 p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                        <Play className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Creating Your First Budget</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <span className="text-xs">3</span>
                      </div>
                      <span className="text-sm">Tracking Your Expenses</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <span className="text-xs">4</span>
                      </div>
                      <span className="text-sm">Adjusting Your Budget</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <span className="text-xs">5</span>
                      </div>
                      <span className="text-sm">Module Assessment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="#" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Budget Template</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Expense Tracker Worksheet</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">50/30/20 Calculator</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Having trouble with this lesson? Connect with your instructor or fellow students.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Ask a Question
                    </Button>
                    <Button variant="outline" className="w-full">
                      Join Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
