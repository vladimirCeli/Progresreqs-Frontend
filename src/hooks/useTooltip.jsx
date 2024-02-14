import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { Tooltip as TippyTooltip } from 'react-tippy';

const Tooltip = ({ content, children, position = 'bottom' }) => {
  return (
    <TippyTooltip
      arrow={true}
      arrowSize="small"
      theme="translucent"
      animation="scale"
      position={position}
      duration={200}
      html={<span className="px-2 py-1 bg-gray-800 text-white rounded">{content}</span>}
    >
      {children}
    </TippyTooltip>
  );
};

export default Tooltip;
