import STYLE from './style';

const StepHeading = ({ longTitle, description, isAllowEdit }) => {
  const containerProps = {
    style: STYLE.stepHeading.container
  };

  return (
    <div {...containerProps}>
      <div style={STYLE.stepHeading.title}>{longTitle}</div>
      {!!description && !!description.length && (
        <div style={Object.assign({}, STYLE.stepHeading.description, !isAllowEdit && STYLE.stepHeading.redDescription)}>
          {description}
        </div>
      )}
    </div>
  );
};

export default StepHeading;
