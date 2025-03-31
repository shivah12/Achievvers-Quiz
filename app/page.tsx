"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ArrowRight,
  Clock,
  Trophy,
  GraduationCap,
  CheckCircle,
  XCircle,
  Brain,
  BookOpen,
  Sparkles,
  Award,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Define question types
type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

// Questions for grades 6-10
const juniorQuestions: Question[] = [
  {
    id: 1,
    question: "What is the value of x in the equation 3x + 7 = 22?",
    options: ["3", "5", "7", "15"],
    correctAnswer: "5",
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of chemical reaction?",
    options: ["Combustion", "Decomposition", "Sublimation", "Precipitation"],
    correctAnswer: "Sublimation",
  },
  {
    id: 3,
    question: "Identify the correct synonym for 'benevolent':",
    options: ["Malicious", "Kind", "Arrogant", "Timid"],
    correctAnswer: "Kind",
  },
  {
    id: 4,
    question: "What is the area of a rectangle with length 12 cm and width 5 cm?",
    options: ["17 cm²", "60 cm²", "35 cm²", "24 cm²"],
    correctAnswer: "60 cm²",
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 6,
    question: "In the sentence 'She walked quickly to school', which word is an adverb?",
    options: ["She", "walked", "quickly", "school"],
    correctAnswer: "quickly",
  },
  {
    id: 7,
    question: "What is the prime factorization of 36?",
    options: ["2² × 3²", "2 × 3²", "2³ × 3", "3³"],
    correctAnswer: "2² × 3²",
  },
  {
    id: 8,
    question: "Which of these is NOT a renewable energy source?",
    options: ["Solar", "Wind", "Natural Gas", "Hydroelectric"],
    correctAnswer: "Natural Gas",
  },
  {
    id: 9,
    question: "What is the main function of the mitochondria in a cell?",
    options: ["Protein synthesis", "Energy production", "Cell division", "Waste removal"],
    correctAnswer: "Energy production",
  },
  {
    id: 10,
    question: "Solve for y: 2y - 8 = 16",
    options: ["y = 4", "y = 12", "y = 8", "y = 24"],
    correctAnswer: "y = 12",
  },
  {
    id: 11,
    question: "Which of the following is an example of a compound?",
    options: ["Oxygen", "Gold", "Water", "Neon"],
    correctAnswer: "Water",
  },
  {
    id: 12,
    question: "What figure of speech is used in the phrase 'The wind whispered through the trees'?",
    options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
    correctAnswer: "Personification",
  },
  {
    id: 13,
    question: "If a triangle has angles measuring 30° and 60°, what is the measure of the third angle?",
    options: ["30°", "60°", "90°", "120°"],
    correctAnswer: "90°",
  },
  {
    id: 14,
    question: "Which of these animals is NOT a mammal?",
    options: ["Dolphin", "Bat", "Penguin", "Elephant"],
    correctAnswer: "Penguin",
  },
  {
    id: 15,
    question: "What is the correct spelling?",
    options: ["Accomodate", "Accommodate", "Acommodate", "Accomadate"],
    correctAnswer: "Accommodate",
  },
]

// Questions for grades 11-12
const seniorQuestions: Question[] = [
  {
    id: 1,
    question: "What is the derivative of f(x) = sin(x²)?",
    options: ["f'(x) = 2x·cos(x²)", "f'(x) = cos(x²)", "f'(x) = 2·sin(x²)", "f'(x) = x·cos(x²)"],
    correctAnswer: "f'(x) = 2x·cos(x²)",
  },
  {
    id: 2,
    question: "Which of the following is NOT a fundamental force in physics?",
    options: ["Gravitational force", "Electromagnetic force", "Strong nuclear force", "Centrifugal force"],
    correctAnswer: "Centrifugal force",
  },
  {
    id: 3,
    question: "What is the IUPAC name for CH₃-CH₂-CHO?",
    options: ["Propanol", "Propanal", "Propanone", "Ethyl methanoate"],
    correctAnswer: "Propanal",
  },
  {
    id: 4,
    question: "Which organelle is responsible for protein synthesis in a cell?",
    options: ["Mitochondria", "Golgi apparatus", "Ribosome", "Lysosome"],
    correctAnswer: "Ribosome",
  },
  {
    id: 5,
    question: "Solve the differential equation dy/dx + 2y = e^x",
    options: ["y = e^x + Ce^(-2x)", "y = e^x/3 + Ce^(-2x)", "y = e^x - Ce^(-2x)", "y = e^x/3 - Ce^(-2x)"],
    correctAnswer: "y = e^x/3 + Ce^(-2x)",
  },
  {
    id: 6,
    question: "What is the wavelength of a photon with energy 3.0 eV?",
    options: ["248 nm", "413 nm", "620 nm", "124 nm"],
    correctAnswer: "413 nm",
  },
  {
    id: 7,
    question: "Which of the following is an example of a redox reaction?",
    options: ["NaOH + HCl → NaCl + H₂O", "CaCO₃ → CaO + CO₂", "2H₂ + O₂ → 2H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃"],
    correctAnswer: "2H₂ + O₂ → 2H₂O",
  },
  {
    id: 8,
    question: "What is the function of the loop of Henle in the nephron?",
    options: [
      "Filtration of blood",
      "Reabsorption of water",
      "Creation of concentration gradient",
      "Secretion of hormones",
    ],
    correctAnswer: "Creation of concentration gradient",
  },
  {
    id: 9,
    question: "If vectors A = 3i + 2j and B = i - 4j, what is A × B?",
    options: ["10k", "-14k", "14k", "-10k"],
    correctAnswer: "-14k",
  },
  {
    id: 10,
    question: "Which of the following is NOT a postulate of Bohr's atomic model?",
    options: [
      "Electrons move in circular orbits around the nucleus",
      "Energy is absorbed when an electron jumps to a higher orbit",
      "Angular momentum of electron is quantized",
      "Electrons can exist anywhere in the electron cloud",
    ],
    correctAnswer: "Electrons can exist anywhere in the electron cloud",
  },
  {
    id: 11,
    question: "What is the major product when 2-butanol reacts with H₂SO₄?",
    options: ["1-butene", "2-butene", "Butanoic acid", "Butanal"],
    correctAnswer: "2-butene",
  },
  {
    id: 12,
    question: "Which of the following is a secondary messenger in cell signaling?",
    options: ["DNA", "cAMP", "mRNA", "tRNA"],
    correctAnswer: "cAMP",
  },
  {
    id: 13,
    question: "A particle moves according to x(t) = 3t² - 2t + 5. What is its acceleration?",
    options: ["6 m/s²", "3 m/s²", "6t - 2 m/s²", "6t m/s²"],
    correctAnswer: "6 m/s²",
  },
  {
    id: 14,
    question: "What is the hybridization of carbon in benzene?",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correctAnswer: "sp²",
  },
  {
    id: 15,
    question: "Which of the following is NOT a function of the liver?",
    options: ["Detoxification", "Production of bile", "Storage of glycogen", "Production of insulin"],
    correctAnswer: "Production of insulin",
  },
]

// Quiz steps
enum QuizStep {
  WELCOME = 0,
  GRADE_SELECTION = 1,
  QUIZ = 2,
  RESULTS = 3,
}

// Motion variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

// Custom circular timer component
const CircularTimer = ({ timeLeft, duration }: { timeLeft: number; duration: number }) => {
  const percentage = (timeLeft / duration) * 100
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted-foreground/20"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-all duration-1000 ease-linear",
            timeLeft > duration * 0.5
              ? "text-emerald-500"
              : timeLeft > duration * 0.25
                ? "text-amber-500"
                : "text-red-500",
          )}
        />
      </svg>
      <span className="absolute font-mono font-bold text-lg">{timeLeft}</span>
    </div>
  )
}

// Subject icons for different question types
const getSubjectIcon = (questionIndex: number) => {
  // Simple logic to assign different icons to different question types
  const iconIndex = questionIndex % 4
  switch (iconIndex) {
    case 0:
      return <BookOpen className="h-5 w-5 text-blue-500" />
    case 1:
      return <Brain className="h-5 w-5 text-purple-500" />
    case 2:
      return <Sparkles className="h-5 w-5 text-amber-500" />
    case 3:
      return <Award className="h-5 w-5 text-emerald-500" />
    default:
      return <BookOpen className="h-5 w-5 text-blue-500" />
  }
}

export default function QuizApp() {
  // State variables
  const [step, setStep] = useState<QuizStep>(QuizStep.WELCOME)
  const [name, setName] = useState<string>("")
  const [grade, setGrade] = useState<string>("")
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>(Array(15).fill(""))
  const [score, setScore] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  // Get questions based on grade
  const questions = Number.parseInt(grade) >= 11 ? seniorQuestions : juniorQuestions

  // Get timer duration based on grade
  const timerDuration = Number.parseInt(grade) >= 11 ? 90 : 30

  // Handle start quiz
  const handleStartQuiz = () => {
    if (name.trim() === "") return
    setStep(QuizStep.GRADE_SELECTION)
  }

  // Handle grade selection
  const handleGradeSelection = (selectedGrade: string) => {
    setGrade(selectedGrade)
    setTimeLeft(Number.parseInt(selectedGrade) >= 11 ? 90 : 30)
    // Set step to QUIZ last to trigger the useEffect
    setStep(QuizStep.QUIZ)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  // Handle next question
  const handleNextQuestion = () => {
    // Show correct answer briefly
    setShowAnswer(true)

    setTimeout(() => {
      // Check if answer is correct and update score
      if (answers[currentQuestion] === questions[currentQuestion].correctAnswer) {
        setScore(score + 10)
      }

      // Move to next question or results
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        // Reset timer for next question
        setTimeLeft(timerDuration)
        setShowAnswer(false)
      } else {
        // Calculate final score including current question
        let finalScore = score
        if (answers[currentQuestion] === questions[currentQuestion].correctAnswer) {
          finalScore += 10
        }
        setScore(finalScore)
        setStep(QuizStep.RESULTS)
        setShowAnswer(false)
      }
    }, 1500)
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (step === QuizStep.QUIZ && !showAnswer) {
      // Start timer immediately when question appears
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Move to next question when timer reaches zero
            handleNextQuestion()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    // Cleanup function to clear timer when component unmounts or dependencies change
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [currentQuestion, step, showAnswer]) // Re-run effect when question changes or quiz step changes

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / 15) * 100

  // Render based on current step
  const renderStep = () => {
    switch (step) {
      case QuizStep.WELCOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
              className="w-full max-w-md mx-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                <CardHeader className="text-center space-y-4 pb-2">
                  <div className="mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center shadow-md">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Achievers Coaching
                  </CardTitle>
                  <CardDescription className="text-lg font-medium">Knowledge Assessment Quiz</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label htmlFor="name" className="text-sm font-medium">
                      Please enter your name to begin
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </motion.div>

                  <motion.div
                    className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <h3 className="font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <Brain className="h-5 w-5" /> About this quiz
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>15 questions tailored to your grade level</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>10 marks per correct answer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Timed questions to test your knowledge</span>
                      </li>
                    </ul>
                  </motion.div>
                </CardContent>
                <CardFooter>
                  <motion.div className="w-full" variants={itemVariants}>
                    <Button
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handleStartQuiz}
                      disabled={name.trim() === ""}
                    >
                      Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
          </div>
        )

      case QuizStep.GRADE_SELECTION:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
              className="w-full max-w-md mx-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold">
                    Hi{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      {name}
                    </span>
                    !
                  </CardTitle>
                  <CardDescription className="text-lg">Let's customize your quiz experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div className="space-y-3" variants={itemVariants}>
                    <label htmlFor="grade" className="text-base font-medium">
                      Please select your grade
                    </label>
                    <Select onValueChange={handleGradeSelection}>
                      <SelectTrigger className="h-12 text-lg">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {[6, 7, 8, 9, 10, 11, 12].map((gradeNum) => (
                            <SelectItem
                              key={gradeNum}
                              value={gradeNum.toString()}
                              className={cn(
                                "flex items-center justify-center h-12 rounded-md transition-all",
                                "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-600 data-[state=checked]:text-white",
                              )}
                            >
                              Grade {gradeNum}
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <h3 className="font-semibold text-lg mb-3">Quiz Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-gray-700 p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">15 Questions</p>
                          <p className="text-sm text-muted-foreground">Covering key subjects</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-gray-700 p-2 rounded-full">
                          <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">10 Marks Per Question</p>
                          <p className="text-sm text-muted-foreground">Total possible score: 150</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-gray-700 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {Number.parseInt(grade) >= 11 ? "90 seconds" : "30 seconds"} per question
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {Number.parseInt(grade) >= 11
                              ? "Higher grades get more time for complex questions"
                              : "Quick thinking required!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
          </div>
        )

      case QuizStep.QUIZ:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
              className="w-full max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              key={currentQuestion}
            >
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 overflow-hidden">
                {/* Progress bar at the very top */}
                <div className="h-2 bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    {getSubjectIcon(currentQuestion)}
                    <span className="font-medium">Question {currentQuestion + 1} of 15</span>
                  </div>

                  <CircularTimer timeLeft={timeLeft} duration={timerDuration} />
                </div>

                <CardHeader className="pt-6">
                  <CardTitle className="text-2xl leading-tight">{questions[currentQuestion].question}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 pt-6">
                  <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div key={index} variants={itemVariants} className="relative">
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start h-auto py-4 px-5 text-left w-full text-base transition-all",
                            "hover:border-blue-300 dark:hover:border-blue-700",
                            answers[currentQuestion] === option &&
                              !showAnswer &&
                              "border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30",
                            showAnswer &&
                              answers[currentQuestion] === option &&
                              option !== questions[currentQuestion].correctAnswer &&
                              "border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-900/30",
                            showAnswer &&
                              option === questions[currentQuestion].correctAnswer &&
                              "border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-900/30",
                          )}
                          onClick={() => !showAnswer && handleAnswerSelect(option)}
                          disabled={showAnswer}
                        >
                          <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-500 dark:border-blue-400 font-semibold text-blue-600 dark:text-blue-400">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>

                          {/* Show correct/incorrect indicators when answer is revealed */}
                          {showAnswer && option === questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="absolute right-4 h-6 w-6 text-green-500" />
                          )}
                          {showAnswer &&
                            answers[currentQuestion] === option &&
                            option !== questions[currentQuestion].correctAnswer && (
                              <XCircle className="absolute right-4 h-6 w-6 text-red-500" />
                            )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 pb-6">
                  <Button
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={handleNextQuestion}
                    disabled={!answers[currentQuestion] || showAnswer}
                  >
                    {showAnswer ? (
                      <span className="flex items-center">
                        Processing... <span className="ml-2 inline-block animate-pulse">•••</span>
                      </span>
                    ) : (
                      <>
                        {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
          </div>
        )

      case QuizStep.RESULTS:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
              className="w-full max-w-md mx-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
                </div>

                <CardHeader className="text-center relative z-10">
                  <div className="mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
                </CardHeader>

                <CardContent className="space-y-8 relative z-10">
                  <motion.div className="text-center" variants={itemVariants}>
                    <p className="text-lg font-medium">Hi {name},</p>
                    <div className="mt-4 mb-2">
                      <p className="text-sm uppercase tracking-wider text-muted-foreground">Your Score</p>
                      <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        {score}/150
                      </p>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-4">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                        style={{ width: `${(score / 150) * 100}%` }}
                      />
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      {score < 50
                        ? "Keep practicing!"
                        : score < 100
                          ? "Good effort!"
                          : score < 130
                            ? "Great job!"
                            : "Excellent work!"}
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700 text-center"
                    variants={itemVariants}
                  >
                    {score < 50 ? (
                      <>
                        <h3 className="text-xl font-semibold mb-2">No worries!</h3>
                        <p className="text-base">
                          Everyone has room to improve. With the right guidance, you can excel in your studies and reach
                          your full potential.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold mb-2">Great score!</h3>
                        <p className="text-base">
                          Keep thriving and pushing your boundaries. You have excellent potential and can achieve even
                          more with the right guidance.
                        </p>
                      </>
                    )}
                  </motion.div>

                  <motion.div className="space-y-3 text-center" variants={itemVariants}>
                    <h3 className="font-semibold text-lg">Want to improve your academic performance?</h3>
                    <p className="text-muted-foreground">
                      Join Achievers Coaching and unlock your full potential with our expert teachers and proven
                      methods.
                    </p>
                  </motion.div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 relative z-10">
                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Join Us and Grow for the Future
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-lg"
                    onClick={() => {
                      setStep(QuizStep.WELCOME)
                      setCurrentQuestion(0)
                      setAnswers(Array(15).fill(""))
                      setScore(0)
                    }}
                  >
                    Take Another Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />

            {/* Confetti effect for good scores */}
            {score >= 100 && (
              <div className="absolute inset-0 pointer-events-none">
                {/* This would be where confetti animation would go */}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderStep()}

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Achievers Coaching. All rights reserved.
      </footer>
    </div>
  )
}

