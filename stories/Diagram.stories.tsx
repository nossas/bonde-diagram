// import React from 'react';
// import { Thing, Props } from '../src';

// export default {
//   title: 'Welcome',
// };

// // By passing optional props to this story, you can control the props of the component when
// // you consume the story in a test.
// export const Default = (props?: Partial<Props>) => <Thing {...props} />;
import React from 'react';
import {
  DiagramApplication,
  DiagramProvider,
  Layer,
  ActionMessageModel,
  ReplyMessageModel,
  TextMessageModel
} from '../src';
import { Icon, Title } from 'bonde-styleguide';
import * as DiagramStyleguide from 'bonde-styleguide/dist/components/diagram';
import Toolbar, { Button as ToolbarButton } from './components/Toolbar';
import AddReply from './components/AddReply';
import ZoomButton from './components/ZoomButton';

const CustomReplyUI = {
  ...DiagramStyleguide.MessageWithReplyUI,
  addReply: AddReply
}

interface InputProps {
  value: string;
  onChange: Function;
};

interface DiagramFieldProps {
  input: InputProps;
  defaultValue?: string;
};

class DiagramField extends React.Component<DiagramFieldProps> {

  app: DiagramApplication;

  constructor(props) {
    super(props)
    this.app = new DiagramApplication({
      action: DiagramStyleguide.MessageActionUI,
      message: DiagramStyleguide.MessageUI,
      reply: CustomReplyUI
    }, this.handleChange.bind(this));
    // check default value received on Field
    const value = this.getFormValue();
    if (value) {
      this.deserialize(value);
    }
  }

  getFormValue() {
    const { input, defaultValue } = this.props;
    if (input.value) {
      try {
        JSON.parse(input.value);
      } catch (e) {
        return JSON.parse(defaultValue);
      }
    }
    return input.value || defaultValue ? JSON.parse(input.value || defaultValue) : undefined;
  }

  setFormValue(value) {
    const { input } = this.props;
    input.onChange(JSON.stringify(value));
  }

  serialize() {
    return this.app.getActiveDiagram().serialize();
  }

  deserialize(value) {
    this.app
      .getActiveDiagram()
      .deserializeModel(value, this.app.getDiagramEngine());
  }

  handleChange(evt) {
    const value = this.serialize();
    this.setFormValue(value);
  }

  handleCreateMessage(kind: 'message' | 'reply' | 'action') {
    // TODO: add translate
    switch (kind) {
      case 'message':
        return new TextMessageModel({
          text: 'Escreva sua mensagem aqui.'
        });
      case 'reply':
        return new ReplyMessageModel({
          text: 'Escreva sua mensagem aqui.',
          replies: ['Texto do botão']
        });
      case 'action':
        // TODO: check validation of actionId
        return new ActionMessageModel({
          text: 'Escreva um texto pedindo e-mail do usuário.',
          validLabel: 'E-mail válido',
          invalidLabel: 'E-mail inválido',
          actionId: Number(window.prompt('Informe o ID do widget de pressao:'))
        });
      default:
        // eslint-disable-next-line
        throw new Error(`Model kind ${kind} isnt mapped on diagram.`);
    };
  }

  render() {
    return (
      <DiagramProvider app={this.app}>
        <div style={{ position: 'relative', width: '100%', height: `100%` }}>
          <Toolbar>
            <ToolbarButton kind='message'>
              <Icon size={30} name='ballon-text' />
              <Title.H5 align='center'>MSG</Title.H5>
            </ToolbarButton>
            <ToolbarButton kind='reply'>
              <Icon size={30} name='ballon' />
              <Title.H5 align='center'>BOTÃO</Title.H5>
            </ToolbarButton>
            <ToolbarButton kind='action'>
              <Icon size={30} name='user' />
              <Title.H5 align='center'>AÇÃO</Title.H5>
            </ToolbarButton>
          </Toolbar>
          <Layer
            background='rgba(255,255,255,0.5)'
            color='rgba(0,0,0,0.05)'
            onCreateMessage={this.handleCreateMessage.bind(this)} />
          <ZoomButton />
        </div>
      </DiagramProvider>
    );
  }
}

export default {
  title: 'Welcome',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => {
  const [value, onChange] = React.useState()
  
  const input: InputProps = {
    value,
    onChange
  }

  return (
    <DiagramField input={input} />
  );
};