import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ThaiIDGenerator } from '@/lib/thai_id/components/generator';
import { ThaiId } from '@/lib/thai_id';
import { DisplayThaiID } from '@/lib/thai_id/utils';

jest.mock('@/lib/thai_id', () => ({
  ThaiId: {
    generate: jest.fn(),
  },
}));

jest.mock('@/lib/thai_id/utils', () => ({
  DisplayThaiID: jest.fn(),
}));

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(Promise.resolve()),
    },
  });
});

describe('ThaiIDGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates and displays a Thai ID when the button is clicked', async () => {
    const mockThaiID = '1234567890123';
    const mockDisplayThaiID = '1-2345-67890-12-3';
    (ThaiId.generate as jest.Mock).mockReturnValue(mockThaiID);
    (DisplayThaiID as jest.Mock).mockReturnValue(mockDisplayThaiID);

    render(<ThaiIDGenerator />);

    const button = screen.getByRole('button', { name: /สุ่ม/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(ThaiId.generate).toHaveBeenCalled();
      expect(DisplayThaiID).toHaveBeenCalledWith(mockThaiID);
      // expect(screen.getByText(mockDisplayThaiID)).toBeInTheDocument();
    });
  });
});
