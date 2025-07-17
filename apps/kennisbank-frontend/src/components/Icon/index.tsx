import {
  FiInfo,
  FiEdit,
  FiFileText,
  FiList,
  FiAlertTriangle,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiMenu,
  FiPhone,
} from 'react-icons/fi';

export type IconName = keyof typeof mappedIcons;

export const mappedIcons = {
  introduction: FiInfo,
  application: FiEdit,
  proof: FiFileText,
  conditions: FiList,
  objection: FiAlertTriangle,
  costs: FiDollarSign,
  term: FiCalendar,
  what_to_do_if_no_response: FiClock,
  details: FiMenu,
  contact: FiPhone,
} as const;

export interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className, ...restProps }: IconProps) => {
  const IconComponent = mappedIcons[name];

  if (!IconComponent) return null;

  return <IconComponent className={className} {...restProps} />;
};
