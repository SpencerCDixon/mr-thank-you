import { h, Component } from 'preact';
import Portal from 'preact-portal';
import ReactModal2 from 'react-modal2';

const Modal = ({ open, onClose, into="body", children }) => (
  open ? (
    <Portal into={into}>
      <ReactModal2
        onClose={onClose}
        closeOnEsc
        closeOnBackdropClick
        modalClassName="modal"
        backdropClassName="modal-backdrop"
      >
        { children }
      </ReactModal2>
    </Portal> 
  ) : null
);

export default Modal;
