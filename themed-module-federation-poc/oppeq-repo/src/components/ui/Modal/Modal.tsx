import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sizes, Intent } from '@ui/config';
import { Button } from '@ui/Button';
import { Icons } from '@ui/Icon';
import './Modal.css';

interface IModal {
  actions?: ReactElement[];
  children: ReactNode;
  className?: string;
  hasCloseButton?: boolean;
  hasOverlay?: boolean;
  header?: string | ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  shouldCloseOnOverlayClick?: boolean;
  subHeader?: string;
}

const createPortalRoot = () => {
  let portalRoot = document.getElementById('portal-root');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
    document.body.style.overflow = 'hidden';
  }
  return portalRoot;
};

interface IModalButton {
  onClick: () => void;
}

export const ModalConfirmButton = ({ onClick }: IModalButton): JSX.Element => {
  return (
    <Button intent={Intent.Primary} onClick={onClick} className={`syo-modal__confirm-button`}>
      OK
    </Button>
  );
};

export const ModalCancelButton = ({ onClick }: IModalButton): JSX.Element => {
  return (
    <Button intent={Intent.Transparent} onClick={onClick}>
      Cancel
    </Button>
  );
};

export const Modal = ({
  actions = [],
  children,
  className = '',
  hasOverlay = true,
  hasCloseButton = true,
  header,
  onCancel = () => null,
  shouldCloseOnOverlayClick,
  subHeader,
}: IModal): JSX.Element => {
  const root = useRef(createPortalRoot());

  useEffect(() => {
    const portalRoot = root.current;
    return () => {
      if (portalRoot.childElementCount === 0) {
        document.body.removeChild(portalRoot);
        document.body.style.overflow = 'unset';
      }
    };
  }, []);

  return createPortal(
    <>
      <div
        role={shouldCloseOnOverlayClick ? 'button' : 'presentation'}
        className={hasOverlay ? 'syo-modal__bg' : 'syo-modal__bg--transparent'}
        onClick={(e) => {
          shouldCloseOnOverlayClick && onCancel(e);
        }}
      />
      <div className={`syo-modal__scroll`}>
        <div className={`syo-modal ${className}`}>
          <div className="syo-modal__header">
            {hasCloseButton && (
              <Button
                className="syo-modal__close-button"
                iconSize={Sizes.md}
                icon={Icons.CloseWindow}
                intent={Intent.Transparent}
                onClick={onCancel}
              />
            )}
            {header && <div className="syo-modal__header-text">{header}</div>}
            {subHeader && <div className="syo-modal__subheader-text mt-2">{subHeader}</div>}
          </div>
          <div className="syo-modal__children-container">{children}</div>
          <div className="syo-modal__button-container">
            {!!actions.length && (
              <div className="syo-actions">{actions.map((actionBtn) => actionBtn)}</div>
            )}
          </div>
        </div>
      </div>
    </>,
    root.current
  );
};

Modal.displayName = 'Modal';
