import React from 'react';

/**
 * Componente base para todas as telas do aplicativo.
 * Ele cria o contêiner externo, o título e o quadro do "celular".
 * @param {object} props
 * @param {string} props.title - O título a ser exibido acima da tela.
 * @param {object} [props.style] - Estilos CSS em linha para o contêiner principal da tela.
 * @param {React.ReactNode} props.children - O conteúdo a ser renderizado dentro da tela.
 */
const Screen = ({ title, children, style }) => {
  return (
    <div className="screen-container">
      <div className="screen-title">{title}</div>
      <div className="screen" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Screen;