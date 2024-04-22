import classNames from 'classnames';
import styles from './style.module.scss';
import Icon from 'presentation-component/ui/icon';

interface InstructionItemProps {
  icon: string;
  title: string;
  info?: string;
  classes?: { container?: string };
}

const InstructionItem: React.FC<InstructionItemProps> = ({ icon, title, info, classes }) => {
  return (
    <div className={classNames(styles.instructionItem, classes?.container)}>
      <Icon name={icon} className={styles.iconSection} />
      <div className={styles.infoSection}>
        <div className={styles.title}>{title}</div>
        {!!info && <div className={styles.info}>{info}</div>}
      </div>
    </div>
  );
};

interface CashbackInstructionProps {
  classes?: { container?: string };
}

const CashbackInstruction: React.FC<CashbackInstructionProps> = ({ classes }) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={styles.title}>Hướng dẫn tích lũy hoàn tiền</div>
      <div className={styles.instructions}>
        <InstructionItem
          icon="cart"
          title="THAM GIA MUA HÀNG"
          info="Mỗi sản phẩm bạn sẽ có cơ hội nhận được giá trị hoàn tiền khác nhau"
          classes={{ container: styles.instructionItem }}
        />
        <InstructionItem
          icon="dollar-time"
          title="Nhận hoàn tiền"
          info="Bạn sẽ nhận được hoàn tiền sau khi đơn hàng giao thành công. Hạng thành viên càng cao, hoàn tiền càng nhiều"
          classes={{ container: styles.instructionItem }}
        />
        <InstructionItem
          icon="verify"
          title="Sử dụng hoàn tiền"
          info="Bạn có thể sử dụng trực tiếp hoàn tiền để được giảm giá khi mua hàng. Thời hạn sử dụng hoàn tiền sẽ tăng thêm sau mỗi đơn hàng giao thành công"
          classes={{ container: styles.instructionItem }}
        />
      </div>
    </div>
  );
};

export default CashbackInstruction;
