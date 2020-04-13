import React from 'react'
import { Card, Position, Spacing, Text } from 'bonde-styleguide';
import { Draggable } from '../../src';

interface ButtonProps {
  kind: 'message' | 'reply' | 'action';
};

export const Button: React.FC<ButtonProps> = ({ kind, children }) => {
  return (
    <Spacing margin={{ top: 5 }}>
      <Draggable kind={kind}>
        <Card
          rounded={2}
          style={{
            cursor: 'pointer',
            textAlign: 'center'
          }}
          padding={{ x: 20, y: 20 }}
        >
          {children}
        </Card>
      </Draggable>
    </Spacing>
  );
};

const Toolbar = ({ children }) => {
  return (
    <React.Fragment>
      <Position absolute left={60} top={5} index={99} height='100%'>
        {children}
      </Position>
      <Position absolute left={60} bottom={5}>
        <ul>
          <li><Text fontSize={12}>[DOUBLE-CLICK]: Editar conteúdo</Text></li>
          <li><Text fontSize={12}>[CTRL + ENTER]: Salvar edição</Text></li>
          <li><Text fontSize={12}>[ESC]: Cancelar edição</Text></li>
          <li><Text fontSize={12}>[DELETE]: Remover mensagem</Text></li>
        </ul>
      </Position>
    </React.Fragment>
  );
};

export default Toolbar;
