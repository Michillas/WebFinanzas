"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import {
  Sparkles,
  Send,
  Settings,
  ArrowDown,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
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

export default function AiPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    setInput,
  } = useChat({
    api: "/api/chat",
    headers: apiKey
      ? {
          "x-api-key": apiKey,
        }
      : undefined,
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "¡Hola! Soy tu asistente financiero IA. ¿Cómo puedo ayudarte a gestionar tus finanzas hoy?",
      },
    ],
    onError: (error) => {
      console.error("Error de chat:", error);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey) {
      const userMessage = {
        id: Date.now().toString(),
        role: "user" as const,
        content: input,
      };
      const noticeMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content:
          "Por favor, añade tu clave API de OpenAI en la configuración para obtener respuestas de IA.",
      };

      append(userMessage);
      setTimeout(() => append(noticeMessage), 500);
      handleInputChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      handleSubmit(e);
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
    const storedApiKey = localStorage.getItem("openai-api-key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && apiKey) {
      localStorage.setItem("openai-api-key", apiKey);
    }
  }, [apiKey, mounted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="flex-1 flex p-4 overflow-hidden">
        <div className="flex flex-1 max-w-[calc(100%-18rem)] md:max-w-[calc(100%-20rem)]">
          <div className="flex-1 flex items-start justify-center">
            <div className="w-full h-full flex flex-col rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm overflow-hidden">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                onScroll={handleScroll}
              >
                {!apiKey && (
                  <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p>
                      No hay clave API configurada. Añade tu clave API de OpenAI
                      en la configuración para obtener respuestas de IA.
                    </p>
                  </div>
                )}

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
                      <p className="whitespace-pre-wrap">{message.content}</p>
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
                <form onSubmit={onSubmit} className="flex gap-2 items-center">
                  <Input
                    value={input}
                    onChange={handleInputChange}
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

        <div className="w-72 ml-1 flex-shrink-0">
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
