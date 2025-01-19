import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTextGenerate } from '../hooks/useTextGenerate'
import useSound from 'use-sound'

interface TextGenerateModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
}

export function TextGenerateModal({
  title,
  description,
  isOpen,
  onClose,
}: TextGenerateModalProps) {
  const { displayedText: displayedTitle, isComplete: isTitleComplete } =
    useTextGenerate(title)
  const {
    displayedText: displayedDescription,
    isComplete: isDescriptionComplete,
  } = useTextGenerate(description, 30)

  const [play, { stop }] = useSound('/keyboard-typing.mp3', { loop: true })

  useEffect(() => {
    if (isOpen) {
      play()
    } else {
      stop()
    }
    return () => stop()
  }, [isOpen, play, stop])

  useEffect(() => {
    if (isTitleComplete && isDescriptionComplete) {
      stop()
    }
  }, [isTitleComplete, isDescriptionComplete, stop])

  const handleOkClick = () => {
    console.log('hello')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{displayedTitle}</DialogTitle>
        </DialogHeader>
        <p>{displayedDescription}</p>
        <DialogFooter>
          <Button onClick={handleOkClick}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
