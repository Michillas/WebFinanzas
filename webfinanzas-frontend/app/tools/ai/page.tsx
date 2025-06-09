"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Send,
  ArrowDown,
  Loader2,
  AlertCircle,
  DollarSign,
  PiggyBank,
  TrendingUp,
  BarChart4,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PromptButton } from "@/components/layout/tools/ai/prompt-button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { financialPrompts } from "@/lib/financial-prompts";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente financiero IA. ¿Cómo puedo ayudarte a gestionar tus finanzas hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [prevMessageCount, setPrevMessageCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const openai = async (messages: { role: "user" | "assistant" | "system"; content: string }[]) => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Error fetching AI response");
    }
  
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
  
    try {
      const updatedMessages: { role: "user" | "assistant" | "system"; content: string }[] = [
        { role: "system", content: "You are a helpful financial assistant. Always answer in Spanish and be concise. Use markdown language." },
        ...messages.map(({ id, ...rest }) => rest),
        { role: "user", content: input },
      ];
  
      const completion = await openai(updatedMessages);
  
      const assistantMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content: completion.choices?.[0]?.message?.content ?? "No se recibió respuesta.",
      };
  
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error en la respuesta de IA:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handlePromptClick = (promptText: string) => {
    setInput(promptText);
    const inputElement = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  useEffect(() => {
    if (messages.length > prevMessageCount) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setPrevMessageCount(messages.length);
  }, [messages, prevMessageCount]);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setIsScrolled(scrollTop < scrollHeight - clientHeight - 10);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categoryIcons = {
    Inversiones: <TrendingUp className="h-4 w-4" />,
    Presupuesto: <PiggyBank className="h-4 w-4" />,
    Deudas: <CreditCard className="h-4 w-4" />,
    Planificación: <BarChart4 className="h-4 w-4" />,
    General: <DollarSign className="h-4 w-4" />,
  };

  return (
    <main className="flex flex-col bg-gradient-to-b p-4">
      <div className="flex-1 flex-wrap md:flex p-4 overflow-hidden">
        <div className="flex flex-1 max-w-[calc(100%)] md:max-w-[calc(100%-20rem)]">
          <div className="flex-1 flex items-start justify-center">
            <div className="w-full h-full flex flex-col rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm overflow-hidden">
              <div
                ref={chatContainerRef}
                className="flex-1 max-h-[75vh] overflow-y-auto p-4 space-y-4"
                onScroll={handleScroll}
              >
                <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>
                    No son consejos financieros. Usa la información bajo tu propio riesgo.
                  </p>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 border border-gray-800">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="IA"
                        />
                        <AvatarFallback className="bg-emerald-500/10 text-emerald-500">
                          IA
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg p-3 text-sm",
                        message.role === "user"
                          ? "bg-gray-800 text-gray-100"
                          : "bg-gray-800/50 border border-gray-700/50 text-gray-200"
                      )}
                    >
                      {message.role === "assistant" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                              p: ({ node, ...props }) => <p className="my-1 leading-relaxed" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                              blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4" {...props} />
                              ),
                              code: ({ node, ...props }) => (
                                <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm" {...props} />
                              ),
                              pre: ({ node, ...props }) => (
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto my-4" {...props} />
                              ),
                              hr: () => <hr className="my-6 border-t border-gray-700" />,
                              table: ({ node, ...props }) => (
                                <table className="table-auto w-full border-collapse my-4" {...props} />
                              ),
                              thead: ({ node, ...props }) => (
                                <thead className="bg-gray-700 text-left text-gray-300" {...props} />
                              ),
                              tbody: ({ node, ...props }) => <tbody {...props} />,
                              tr: ({ node, ...props }) => <tr className="border-b border-gray-700" {...props} />,
                              th: ({ node, ...props }) => (
                                <th className="px-4 py-2 font-semibold text-sm" {...props} />
                              ),
                              td: ({ node, ...props }) => (
                                <td className="px-4 py-2 text-sm text-gray-300" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}

                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 bg-gray-700">
                        <AvatarFallback>Tú</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border border-gray-800">
                      <AvatarFallback className="bg-emerald-500/10 text-emerald-500">
                        IA
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[75%] rounded-lg p-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p className="text-sm">Pensando...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border border-gray-800">
                      <AvatarFallback className="bg-red-500/10 text-red-500">
                        !
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[75%] rounded-lg p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <p>Error: {error.message}</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {isScrolled && (
                <Button
                  className="absolute bottom-24 right-1/2 transform translate-x-[9rem] rounded-full shadow-lg bg-gray-800 hover:bg-gray-700"
                  size="icon"
                  onClick={scrollToBottom}
                  aria-label="Desplazar al final"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}

              <div className="p-3 border-t border-gray-800 bg-gray-900/50">
                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pregunta sobre tus finanzas..."
                    className="flex-1 text-sm bg-gray-800 border-gray-700 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input}
                    className="rounded-full w-10 h-10 p-0 bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-700/20"
                    aria-label="Enviar mensaje"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="w-72 ml-3 mt-4 md:mt-0 md:ml-1 flex-shrink-0">
          <div className="sticky top-4">
            <Collapsible
              open={true}
              className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-300 hover:text-gray-100"
                >
                  Plantillas de Preguntas
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ScrollArea className="h-[calc(100vh-220px)] p-3">
                  <div className="space-y-4">
                    {Object.entries(financialPrompts).map(
                      ([category, prompts]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {
                              categoryIcons[
                                category as keyof typeof categoryIcons
                              ]
                            }
                            <span>{category}</span>
                          </div>
                          <div className="grid gap-2">
                            {prompts.map((prompt, index) => (
                              <PromptButton
                                key={index}
                                text={prompt.text}
                                onClick={() => handlePromptClick(prompt.text)}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </main>
  );
}
