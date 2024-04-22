import classNames from 'classnames';

import Popover from '../../../presentation-component/ui/popover';
import SubmitButton from '../../../presentation-component/ui/submit-button';
import style from './style.module.scss';

interface Button {
  title: string;
  icon?: string;
  color?: string;
  loading?: boolean;
  onClick?: (data: any) => any;
}
interface ConfirmationPopoverProps {
  isOpen: boolean;
  title?: string;
  prompt?: string | React.ReactNode;
  anchor: React.MutableRefObject<HTMLElement>;
  classes?: { container?: string };
  acceptButton: Button;
  rejectButton: Button;
  data?: any;
}
const ConfirmationPopover = ({
  isOpen,
  title,
  prompt,
  anchor,
  data,
  acceptButton,
  rejectButton,
  classes
}: ConfirmationPopoverProps) => {
  return (
    <Popover
      anchorEl={anchor}
      isOpen={isOpen}
      onRequestClose={() => rejectButton.onClick && rejectButton.onClick(data)}
    >
      <div className={classNames(style.confirmationPopover, classes && classes.container)}>
        <div className={style.header}>{title}</div>
        <div className={style.prompt}>{prompt}</div>
        <div className={style.actions}>
          <SubmitButton
            title={acceptButton.title}
            icon={{ name: acceptButton.icon }}
            color={acceptButton.color || 'pink'}
            loading={!!acceptButton.loading}
            classes={{ container: style.acceptButton, icon: style.icon }}
            onSubmit={() => acceptButton.onClick && acceptButton.onClick(data)}
          />
          <SubmitButton
            title={rejectButton.title}
            icon={{ name: rejectButton.icon }}
            color={rejectButton.color || 'pink'}
            loading={!!rejectButton.loading}
            classes={{ container: style.rejectButton, icon: style.icon }}
            onSubmit={() => rejectButton.onClick && rejectButton.onClick(data)}
          />
        </div>
      </div>
    </Popover>
  );
};
ConfirmationPopover.defaultProps = {
  title: '',
  prompt: '',
  acceptButton: { title: '' },
  rejectButton: { title: '' }
};

export default ConfirmationPopover;
