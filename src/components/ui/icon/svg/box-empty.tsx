const Icon = ({ style, innerStyle }) => (
  <svg style={innerStyle} viewBox="0 0 50 50">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill={style.color}>
        {/* tslint:disable-next-line:max-line-length */}
        <path d="M44.118,11.852c-0.008-0.014-0.022-0.021-0.03-0.034c-0.031-0.046-0.067-0.085-0.109-0.122   c-0.014-0.01-0.023-0.021-0.036-0.03c-0.067-0.05-0.141-0.091-0.225-0.11L23.068,6.721c-0.108-0.024-0.226-0.019-0.336,0.015   L8.002,11.57c-0.042,0.015-0.075,0.043-0.112,0.065c-0.024,0.014-0.053,0.017-0.074,0.033c-0.006,0.005-0.009,0.014-0.015,0.019   c-0.006,0.006-0.016,0.007-0.022,0.014l-7.573,6.81c-0.222,0.202-0.271,0.533-0.116,0.788c0.112,0.187,0.317,0.303,0.535,0.303   c0.076,0,0.149-0.014,0.218-0.039l6.73-2.508v20.163c0,0.286,0.193,0.535,0.471,0.604l19.957,5.092   c0.048,0.014,0.1,0.021,0.158,0.021c0.069,0,0.137-0.011,0.202-0.032l14.935-5.094c0.254-0.085,0.424-0.323,0.424-0.591V24.155   l5.5-1.904c0.177-0.062,0.315-0.196,0.381-0.371s0.051-0.367-0.043-0.53L44.118,11.852z M7.571,15.718l-4.086,1.524l4.086-3.677   V15.718z M27.532,41.505l-18.71-4.773V12.978l18.71,5.012V41.505z M28.136,16.856l-17.749-4.754l12.568-4.124l18.377,4.302   L28.136,16.856z M42.468,36.77l-13.686,4.666V18.815l5.607,8.089c0.118,0.168,0.31,0.27,0.515,0.27   c0.065,0,0.134-0.012,0.205-0.034l7.359-2.55L42.468,36.77L42.468,36.77z M35.147,25.8l-5.619-8.104l13.763-4.772l4.805,8.392   L35.147,25.8z" />
      </g>
    </g>
  </svg>
);

export default Icon;
