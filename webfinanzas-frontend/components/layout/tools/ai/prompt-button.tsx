"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PromptButtonProps {
  text: string
  onClick: () => void
  className?: string
}

export function PromptButton({ text, onClick, className }: PromptButtonProps) {
  const isTruncated = text.length > 45
  const buttonText = isTruncated ? `${text.substring(0, 45)}...` : text

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className={cn(
              "justify-start text-left text-xs h-auto py-2 px-3 bg-gray-800/50 border-gray-700/50 hover:bg-gray-800 hover:text-emerald-400 transition-all truncate",
              className,
            )}
          >
            {buttonText}
          </Button>
        </TooltipTrigger>
        {isTruncated && <TooltipContent>{text}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}
