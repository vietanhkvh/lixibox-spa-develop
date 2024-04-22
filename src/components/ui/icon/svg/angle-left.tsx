const Icon = ({ style, innerStyle, innerClassName }) => (
  <svg style={innerStyle} viewBox="0 0 54 100" className={innerClassName}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-423.000000, -329.000000)" fill={style.color}>
        {/* tslint:disable-next-line:max-line-length */}
        <path d="M473.440514,429 C474.395498,429 475.263666,428.655172 475.958199,427.965517 C477.347267,426.586207 477.347267,424.344828 475.958199,422.965517 L431.681672,379 L475.958199,335.034483 C477.347267,333.655172 477.347267,331.413793 475.958199,330.034483 C474.569132,328.655172 472.311897,328.655172 470.92283,330.034483 L424.041801,376.5 C422.652733,377.87931 422.652733,380.12069 424.041801,381.5 L470.92283,427.965517 C471.617363,428.655172 472.485531,429 473.440514,429 Z" />
      </g>
    </g>
  </svg>
);

export default Icon;
