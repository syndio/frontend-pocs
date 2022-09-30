import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal, ModalConfirmButton, ModalCancelButton } from '@ui/Modal';
import userEvent from '@testing-library/user-event';

describe('Modal component', () => {
  test('properly displays children, buttons, header', () => {
    const onConfirmJest = jest.fn();
    const onCancelJest = jest.fn();
    render(
      <Modal
        header={'My Header'}
        actions={[
          <ModalConfirmButton key="confirm" onClick={onConfirmJest} />,
          <ModalCancelButton key="cancel" onClick={onCancelJest} />,
        ]}
      >
        hello
      </Modal>
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('My Header')).toBeInTheDocument();

    const okButton = screen.getByText('OK');
    userEvent.click(okButton);

    expect(onConfirmJest).toHaveBeenCalledTimes(1);
    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);
    expect(onConfirmJest).toHaveBeenCalledTimes(1);
  });
});
