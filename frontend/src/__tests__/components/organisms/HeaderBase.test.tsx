import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  CompactHeader,
  Header,
} from '../../../components/organisms/HeaderBase';

// モック関数を使うためにjest.mockを使ってreact-router-domをモック化
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  it('renders Header with the title "View Page" and does not show DrawerNode when isDesktop is true', () => {
    render(<Header />);
    expect(screen.getByText('View Page')).toBeInTheDocument();
    expect(screen.queryByTestId('drawer-node')).not.toBeInTheDocument(); // DrawerNodeは表示されないことを確認
  });

  it('renders CompactHeader and shows DrawerNode when isDesktop is false', () => {
    render(<CompactHeader />);
    expect(screen.getByText('View Page')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-node')).toBeInTheDocument(); // DrawerNodeが表示されることを確認
  });

  it('renders NavigateSettingMenuButton in both Header and CompactHeader', () => {
    render(<Header />);
    expect(
      screen.getAllByTestId('navigate-setting-menu-button')[0]
    ).toBeInTheDocument();

    render(<CompactHeader />);
    expect(
      screen.getAllByTestId('navigate-setting-menu-button')[1]
    ).toBeInTheDocument();
  });
});
