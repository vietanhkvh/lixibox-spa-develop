const Icon = ({ style, innerStyle, innerClassName }) => (
  <svg style={innerStyle} viewBox="0 0 54 100" className={innerClassName}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-548.000000, -329.000000)" fill={style.color}>
        {/* tslint:disable-next-line:max-line-length */}
        <path d="M551.565217,429 C550.608696,429 549.73913,428.655172 549.043478,427.965517 C547.652174,426.586207 547.652174,424.344828 549.043478,422.965517 L593.391304,379 L549.043478,335.034483 C547.652174,333.655172 547.652174,331.413793 549.043478,330.034483 C550.434783,328.655172 552.695652,328.655172 554.086957,330.034483 L600.956522,376.5 C602.347826,377.87931 602.347826,380.12069 600.956522,381.5 L554.086957,427.965517 C553.391304,428.655172 552.521739,429 551.565217,429 Z" />
      </g>
    </g>
  </svg>
);

export default Icon;
