import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import theme from "@/theme/theme";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  const modalWrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backDropHandler = (e: MouseEvent) => {
      if (modalWrapperRef.current === null) return;
      if (!modalWrapperRef?.current?.contains(e.target as Node)) {
        onClose();
      }
    }

    setIsBrowser(true);

    window.addEventListener('click', backDropHandler);
    return () => window.removeEventListener('click', backDropHandler);
  }, [onClose]);

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <StyledModalOverlay>
      <StyledModalWrapper ref={modalWrapperRef}>
        <StyledModal>
          <StyledModalHeader>
            <Button onClick={handleCloseClick} size="sm" styleSheet={{ height: "25px", width: "25px" }}>
              <Icon name="close" styleSheet={{ color: theme.colors.accent.x050, height: "25px", width: "25px" }} viewBox={[25, 25]}/>
            </Button>
          </StyledModalHeader>
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: ${theme.colors.primary.x600}; 
  height:100%;
  width:100%;
  padding: 20px 25px 20px 40px;
`;

const StyledModalWrapper = styled.div`
  width: 60vw;
  height: 100%;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${theme.colors.accent.x400}7f;
`;

export default Modal;
