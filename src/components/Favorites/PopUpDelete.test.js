import { render, fireEvent, screen } from '@testing-library/react';
import DeleteModal from './PopUpDelete';
import '@testing-library/jest-dom/extend-expect';

describe('DeleteModal', () => {
  test('should open the modal and call onDelete on button click', () => {
    const onDelete = jest.fn();
    render(<DeleteModal onDelete={onDelete} />);

    const openButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(openButton);

    const modalTitle = screen.getByText('Estas seguro que quieres borrar las cartas guardadas?');
    expect(modalTitle).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: 'Borrar' });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);

    const closeButton = screen.getByRole('button', { name: 'Cerrar' });
    fireEvent.click(closeButton);
    const modal = screen.queryByTestId('modal');
    expect(modal).toBeNull();
  });
});
