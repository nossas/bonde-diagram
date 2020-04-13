import React from 'react';
import { Button, Flexbox2 as Flexbox, Icon, Text, Spacing } from 'bonde-styleguide';

interface AddReplyProps {
  onQuickReply: Function;
};

const AddReply: React.FC<AddReplyProps> = ({ onQuickReply }) => (
  <Button flat onClick={() => onQuickReply('Texto do botão')}>
    <Flexbox horizontal middle>
      <Icon name='plus' />
      <Spacing margin={{ left: 5 }}>
        <Text fontSize={12}>adicionar resposta</Text>
      </Spacing>
    </Flexbox>
  </Button>
);

export default AddReply;
