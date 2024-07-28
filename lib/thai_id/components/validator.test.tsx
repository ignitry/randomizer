import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThaiIDValidator } from './validator'
import { ThaiId } from '@/lib/thai_id'

jest.mock('@/lib/thai_id', () => ({
  ThaiId: {
    validate: jest.fn(),
  },
}))

describe('ThaiIDValidator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('validates Thai ID and displays errors if any', async () => {
    const initialErrors = ["จำนวนหลักไม่เท่ากับ 13 หลัก"]
    ;(ThaiId.validate as jest.Mock).mockReturnValue(initialErrors)

    render(<ThaiIDValidator />)

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890121')
      expect(screen.getByText(initialErrors[0])).toBeInTheDocument()
    })

    ;(ThaiId.validate as jest.Mock).mockReturnValueOnce([])

    const input = screen.getByPlaceholderText('กรอกหมายเลขบัตรประชาชน')
    fireEvent.change(input, { target: { value: '1234567890123' } })

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890123')
      expect(screen.queryByText(initialErrors[0])).not.toBeInTheDocument()
      expect(screen.getByText('เลขบัตรประชาชนถูกต้อง')).toBeInTheDocument()
    })
  })

  it('displays success message if Thai ID is valid', async () => {
    (ThaiId.validate as jest.Mock).mockReturnValue([])

    render(<ThaiIDValidator />)

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890121')
      expect(screen.getByText('เลขบัตรประชาชนถูกต้อง')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('กรอกหมายเลขบัตรประชาชน')
    fireEvent.change(input, { target: { value: '1234567890123' } })

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890123')
      expect(screen.getByText('เลขบัตรประชาชนถูกต้อง')).toBeInTheDocument()
    })
  })

  it('updates errors when input changes', async () => {
    const initialErrors = ["จำนวนหลักไม่เท่ากับ 13 หลัก"]
    const updatedErrors = ["เลขหลักที่ 13 ไม่ถูกต้อง"]
    ;(ThaiId.validate as jest.Mock).mockReturnValueOnce(initialErrors).mockReturnValueOnce(updatedErrors)

    render(<ThaiIDValidator />)

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890121')
      expect(screen.getByText(initialErrors[0])).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('กรอกหมายเลขบัตรประชาชน')
    fireEvent.change(input, { target: { value: '1234567890122' } })

    await waitFor(() => {
      expect(ThaiId.validate).toHaveBeenCalledWith('1234567890122')
      expect(screen.getByText(updatedErrors[0])).toBeInTheDocument()
    })
  })
})
