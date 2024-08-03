"use client"

import { useState, useEffect, useCallback } from 'react'
import { ThaiId } from "@/lib/thai_id"

export const useThaiIDValidation = (inputID: string) => {
  const [errors, setErrors] = useState<string[]>([])

  const validateThaiID = useCallback(() => {
    const validationErrors = ThaiId.validate(inputID)
    setErrors(validationErrors)
  }, [inputID])

  useEffect(() => {
    validateThaiID();
  }, [inputID, validateThaiID])

  return errors
};
