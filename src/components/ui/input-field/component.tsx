import { Component } from 'react';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE, INPUT_NAME, INPUT_TYPE } from './initialize';
import { renderComponent } from './view';
import { validation } from './module';
import './style.css';
/**
 * TODO: Remove component
 * @deprecated Use `FormEntry` from `presentation-component/ui/form-entry`
 */
class InputField extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  static INPUT_NAME = INPUT_NAME;
  static INPUT_TYPE = INPUT_TYPE;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE(props.value);
  }

  validate(props = this.props, state = this.state) {
    const { validationValue, validationErrorMessage } = validation(props, state);
    const { onChange } = this.props as IProps;

    this.setState(
      {
        isValid: validationValue,
        errorMessage: validationErrorMessage
      } as IState,
      () =>
        onChange({
          value: state.value,
          valid: validationValue
        })
    );
  }

  handleKeyUp(event) {
    const { isValid } = this.state as IState;
    const { onSubmit } = this.props as IProps;
    true === isValid && 13 === event.keyCode && onSubmit();
  }

  handleChange(event) {
    this.setState(
      {
        value: event.target.value,
        isDirty: true
      } as IState,
      () => this.validate()
    );
  }

  handleFocus(event) {
    this.setState({
      isFocus: true
    } as IState);
    this.props.onFocus();
  }

  handleBlur(event) {
    this.setState({
      isFocus: false
    } as IState);
    this.props.onBlur();
  }
  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (prevProps !== this.props) {
      this.validate();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.valueCompare !== nextProps.valueCompare) {
      this.validate(nextProps);
    }

    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }

    if (!this.props.isShowError && !!nextProps.isShowError) {
      this.setState({ isValid: false, errorMessage: nextProps.errorMessage });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (this.props.title !== nextProps.title) {
      return true;
    }
    if (this.props.valueCompare !== nextProps.valueCompare) {
      return true;
    }
    if (this.props.readonly !== nextProps.readonly) {
      return true;
    }
    if (this.props.type !== nextProps.type) {
      return true;
    }
    if (this.props.value !== nextProps.value) {
      return true;
    }
    if (this.props.icon !== nextProps.icon) {
      return true;
    }
    if (this.props.minLen !== nextProps.minLen) {
      return true;
    }
    if (this.props.maxLen !== nextProps.maxLen) {
      return true;
    }
    if (this.props.minValue !== nextProps.minValue) {
      return true;
    }
    if (this.props.maxValue !== nextProps.maxValue) {
      return true;
    }
    if (this.props.isUpperCase !== nextProps.isUpperCase) {
      return true;
    }
    if (this.props.autoFocus !== nextProps.autoFocus) {
      return true;
    }
    if (this.props.autoFocus !== nextProps.autoFocus) {
      return true;
    }
    if (this.props.handleRef !== nextProps.handleRef) {
      return true;
    }
    if (this.props.isShowError !== nextProps.isShowError) {
      return true;
    }
    if (this.props.className !== nextProps.className) {
      return true;
    }

    if (this.state.value !== nextState.value) {
      return true;
    }
    if (this.state.isFocus !== nextState.isFocus) {
      return true;
    }
    if (this.state.isValid !== nextState.isValid) {
      return true;
    }
    if (this.state.isDirty !== nextState.isDirty) {
      return true;
    }
    if (this.state.errorMessage !== nextState.errorMessage) {
      return true;
    }

    return false;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default InputField;
