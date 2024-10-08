import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { NavigateSettingMenuButton } from '../../../components/molecules/NavigateSettingMenuButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NavigateSettingMenuButton component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // モック関数をリセット
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('navigates to the setting page when clicked', () => {
    render(
      <Router>
        <NavigateSettingMenuButton />
      </Router>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // navigateが呼び出されたことを確認
    expect(mockNavigate).toHaveBeenCalledWith('/setting');
  });
});
