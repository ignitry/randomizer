import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
      expect(screen.getByText(mockDisplayThaiID)).toBeInTheDocument();
    });
  });

  // it('copies the generated Thai ID to the clipboard', async () => {
  //   const mockThaiID = '1234567890123';
  //   const mockDisplayThaiID = '1-2345-67890-12-3';
  //   (ThaiId.generate as jest.Mock).mockReturnValue(mockThaiID);
  //   (DisplayThaiID as jest.Mock).mockReturnValue(mockDisplayThaiID);

  //   render(<ThaiIDGenerator />);

  //   const button = screen.getByRole('button', { name: /สุ่ม/i });
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockThaiID);
  //   });
  // });

  // it('logs an error if copying to the clipboard fails', async () => {
  //   const mockThaiID = '1234567890123';
  //   const mockDisplayThaiID = '1-2345-67890-12-3';
  //   (ThaiId.generate as jest.Mock).mockReturnValue(mockThaiID);
  //   (DisplayThaiID as jest.Mock).mockReturnValue(mockDisplayThaiID);

  //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  //   jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Failed to copy'));

  //   render(<ThaiIDGenerator />);

  //   const button = screen.getByRole('button', { name: /สุ่ม/i });
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy Thai ID: ', expect.any(Error));
  //   });

  //   consoleErrorSpy.mockRestore();
  // });
});
