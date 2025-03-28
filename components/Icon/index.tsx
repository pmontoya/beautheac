import * as Lucide from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type IconProps = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

const icons: Record<string, IconProps> = {
  sun: Lucide.Sun,
  coffee: Lucide.Coffee,
  utensils: Lucide.Utensils,
  target: Lucide.Target,
  paw: Lucide.PawPrint,
  wifi: Lucide.Wifi,
  pin: Lucide.MapPin,
  wine: Lucide.Wine,
  leaf: Lucide.Leaf,
  landmark: Lucide.Landmark,
};

type IconName = 'pin' | 'sun' | 'coffee' | 'utensils' | 'target' | 'paw' | 'wifi' | 'wine' | 'leaf' | 'landmark';

type Props = LucideProps & {
  name: IconName;
};

const Index = ({name, ...props}: Props) => {
  const Component = icons[name];

  return <Component {...props} />;
};

export default Index;
