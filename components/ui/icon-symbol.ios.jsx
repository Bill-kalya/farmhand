import { SymbolView } from 'expo-symbols';

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} [props.size=24]
 * @param {string} props.color
 * @param {Object} [props.style]
 * @param {string} [props.weight='regular']
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
