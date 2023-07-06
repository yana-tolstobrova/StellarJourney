import { render, fireEvent, screen } from '@testing-library/react';
import TransitionsModal from './PopUpSave';

describe('TransitionsModal', () => {
  test('should update textarea value on change', () => {
    const setIsDataSaved = jest.fn();
    render(
      <TransitionsModal
        selectedCards={[]}
        isDataSaved={false}
        setIsDataSaved={setIsDataSaved}
      />
    );

    const openButton = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.click(openButton);

    const textarea = screen.getByPlaceholderText('Escribe tu comentario');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    expect(textarea.value).toBe('Test comment');
  });
});
