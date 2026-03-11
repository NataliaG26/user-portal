import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import LoginForm from './LoginForm';

vi.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );

describe('LoginForm', () => {
  it('should render email and password fields', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByPlaceholderText('eve.holt@reqres.in')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('should render sign in button', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should update email and password fields on input', async () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('eve.holt@reqres.in');
    const passwordInput = screen.getByPlaceholderText('••••••••');

    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'cityslicka' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('eve.holt@reqres.in');
      expect(passwordInput).toHaveValue('cityslicka');
    });
  });
});