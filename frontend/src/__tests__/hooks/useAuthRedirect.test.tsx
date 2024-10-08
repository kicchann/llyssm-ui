import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('useAuthRedirect', () => {
  it('should redirect to root when not authenticated', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue(
      false
    ); // 非認証状態をモック

    renderHook(() => useAuthRedirect());

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should not redirect when authenticated', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue(
      true
    ); // 認証済み状態をモック

    renderHook(() => useAuthRedirect());

    expect(navigate).not.toHaveBeenCalled();
  });
});
