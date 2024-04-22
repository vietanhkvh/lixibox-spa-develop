import modals from './modals';

const SharedModal = () => {
  return (
    <>
      {Object.keys(modals).map((key) => {
        const Modal = modals[key];

        return Modal ? <Modal key={key} /> : null;
      })}
    </>
  );
};

export default SharedModal;
