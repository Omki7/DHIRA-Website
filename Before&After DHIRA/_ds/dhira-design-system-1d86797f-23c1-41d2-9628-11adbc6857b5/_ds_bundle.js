/* @ds-bundle: {"format":3,"namespace":"DHIRADesignSystem_1d8679","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"KPICard","sourcePath":"components/data/KPICard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"64b8d03559b3","components/data/Avatar.jsx":"ee0d0de2aedf","components/data/Badge.jsx":"9fbf24759ea5","components/data/Card.jsx":"8d5644e10c4b","components/data/KPICard.jsx":"5a24dda4c8a0","components/forms/Checkbox.jsx":"b9b0b58c1c59","components/forms/Input.jsx":"d78708fdfe07","components/forms/Select.jsx":"f3537bdea9cf","components/forms/Switch.jsx":"161c894ff9f1","components/navigation/Tabs.jsx":"b12bcac5548c","hero/app.jsx":"4e8a2154aeee","hero/conversation.jsx":"fa33721ba0cc","hero/datamodels.jsx":"983ee7ab7659","hero/pipelines.jsx":"a02f5df23165","hero/shared.jsx":"b4f6cfe4315c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DHIRADesignSystem_1d8679 = window.DHIRADesignSystem_1d8679 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
/**
 * Primary action element. Four variants, three sizes, icon slots, loading state.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  children,
  onClick,
  type = 'button'
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const sizeStyles = {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: '12px',
      gap: '4px'
    },
    md: {
      height: '40px',
      padding: '0 16px',
      fontSize: '14px',
      gap: '6px'
    },
    lg: {
      height: '48px',
      padding: '0 20px',
      fontSize: '16px',
      gap: '8px'
    }
  };
  const variantStyles = {
    primary: {
      background: pressed ? 'var(--color-primary-pressed)' : hovered ? 'var(--color-primary-hover)' : 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      border: '1px solid transparent'
    },
    secondary: {
      background: hovered ? 'var(--color-neutral-100)' : 'var(--color-white)',
      color: 'var(--color-on-surface)',
      border: '1px solid var(--color-border-subtle)'
    },
    ghost: {
      background: hovered ? 'var(--color-overlay-hover)' : 'transparent',
      color: 'var(--color-on-surface)',
      border: '1px solid transparent'
    },
    destructive: {
      background: pressed ? '#b91c1f' : hovered ? '#cc3539' : 'var(--color-status-error)',
      color: '#ffffff',
      border: '1px solid transparent'
    }
  };
  const isDisabled = disabled || loading;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: isDisabled,
    onClick: onClick,
    onMouseEnter: () => !isDisabled && setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => !isDisabled && setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1,
      borderRadius: 'var(--rounded-default)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)',
      width: fullWidth ? '100%' : 'auto',
      outline: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      ...sizeStyles[size],
      ...variantStyles[variant]
    }
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, leftIcon), loading ? 'Loading…' : children, rightIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, rightIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
/**
 * User or entity avatar. Shows image if src is provided; falls back to initials.
 */
function Avatar({
  name = '',
  src = null,
  size = 'md',
  color = null
}) {
  const [imgError, setImgError] = React.useState(false);
  const dimMap = {
    sm: '24px',
    md: '32px',
    lg: '40px',
    xl: '56px'
  };
  const fsMap = {
    sm: '10px',
    md: '12px',
    lg: '14px',
    xl: '18px'
  };
  const colorPalette = ['#3E63DD', '#30A46C', '#E5484D', '#8E8F91', '#5C5F60', '#2A4299', '#1C7A4A', '#7C3AED'];
  const colorIndex = name ? name.charCodeAt(0) % colorPalette.length : 0;
  const bgColor = color || colorPalette[colorIndex];
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const dim = dimMap[size];
  if (src && !imgError) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: name,
      onError: () => setImgError(true),
      style: {
        width: dim,
        height: dim,
        borderRadius: 'var(--rounded-full)',
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block'
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": name,
    style: {
      width: dim,
      height: dim,
      borderRadius: 'var(--rounded-full)',
      background: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fsMap[size],
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      color: '#fff',
      flexShrink: 0,
      userSelect: 'none',
      letterSpacing: '0.02em'
    }
  }, initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
/**
 * Compact status indicator. Pill shape with optional dot prefix.
 */
function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children
}) {
  const variants = {
    neutral: {
      bg: 'var(--color-status-neutral-subtle)',
      color: 'var(--color-on-surface-variant)',
      border: '1px solid var(--color-border-strong)',
      dot: 'var(--color-status-neutral)'
    },
    success: {
      bg: 'var(--color-status-success-subtle)',
      color: 'var(--color-status-success)',
      border: '1px solid var(--color-status-success-border)',
      dot: 'var(--color-status-success)'
    },
    warning: {
      bg: 'var(--color-status-warning-subtle)',
      color: '#7a6300',
      border: '1px solid var(--color-status-warning-border)',
      dot: '#c8a800'
    },
    error: {
      bg: 'var(--color-status-error-subtle)',
      color: 'var(--color-status-error)',
      border: '1px solid var(--color-status-error-border)',
      dot: 'var(--color-status-error)'
    },
    info: {
      bg: 'var(--color-accent-blue-subtle)',
      color: 'var(--color-accent-blue)',
      border: '1px solid var(--color-accent-blue-border)',
      dot: 'var(--color-accent-blue)'
    },
    primary: {
      bg: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      border: '1px solid transparent',
      dot: '#fff'
    },
    ai: {
      bg: 'var(--color-accent-blue-subtle)',
      color: 'var(--color-accent-blue)',
      border: '1px solid var(--color-accent-blue-border)',
      dot: 'var(--color-accent-blue)'
    }
  };
  const sizes = {
    sm: {
      fontSize: '11px',
      padding: '1px 6px',
      height: '18px'
    },
    md: {
      fontSize: '12px',
      padding: '2px 8px',
      height: '20px'
    },
    lg: {
      fontSize: '13px',
      padding: '3px 10px',
      height: '24px'
    }
  };
  const v = variants[variant] || variants.neutral;
  const s = sizes[size];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      letterSpacing: '0.01em',
      borderRadius: 'var(--rounded-full)',
      lineHeight: 1,
      background: v.bg,
      color: v.color,
      border: v.border,
      ...s
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: v.dot,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
/**
 * Surface container. White background with optional border, elevated shadow, and interactive state.
 */
function Card({
  children,
  padding = 'md',
  radius = 'default',
  bordered = true,
  elevated = false,
  interactive = false,
  onClick,
  style: customStyle
}) {
  const [hovered, setHovered] = React.useState(false);
  const padMap = {
    none: '0',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  };
  const radMap = {
    none: '0',
    sm: 'var(--rounded-sm)',
    default: 'var(--rounded-default)',
    md: 'var(--rounded-md)',
    lg: 'var(--rounded-lg)'
  };
  const shadow = elevated ? 'var(--shadow-sm)' : interactive && hovered ? 'var(--shadow-xs)' : 'var(--shadow-none)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: interactive ? onClick : undefined,
    onMouseEnter: () => interactive && setHovered(true),
    onMouseLeave: () => interactive && setHovered(false),
    style: {
      background: interactive && hovered ? 'var(--color-neutral-50)' : 'var(--color-white)',
      border: bordered ? '1px solid var(--color-border-subtle)' : 'none',
      borderRadius: radMap[radius],
      padding: padMap[padding],
      boxShadow: shadow,
      transition: 'background var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)',
      cursor: interactive ? 'pointer' : 'default',
      ...customStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/KPICard.jsx
try { (() => {
/**
 * Metric / KPI card. Uppercase label, large numeric value, optional trend indicator.
 */
function KPICard({
  label = '',
  value = '',
  change = null,
  changeLabel = '',
  trend = 'neutral',
  icon = null,
  description = ''
}) {
  const trendColors = {
    up: 'var(--color-status-success)',
    down: 'var(--color-status-error)',
    neutral: 'var(--color-on-surface-muted)'
  };
  const trendArrows = {
    up: '↑',
    down: '↓',
    neutral: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-white)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--rounded-default)',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: '160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--color-on-surface-muted)',
      lineHeight: 1.2
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-on-surface-muted)',
      display: 'flex',
      flexShrink: 0
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      color: 'var(--color-on-surface)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), change !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '3px',
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 500,
      color: trendColors[trend]
    }
  }, trendArrows[trend] && /*#__PURE__*/React.createElement("span", null, trendArrows[trend]), /*#__PURE__*/React.createElement("span", null, change), changeLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-on-surface-muted)',
      fontWeight: 400
    }
  }, ' ', changeLabel)), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      color: 'var(--color-on-surface-muted)',
      lineHeight: 1.4
    }
  }, description));
}
Object.assign(__ds_scope, { KPICard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KPICard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox with optional label, description, and indeterminate state.
 */
function Checkbox({
  label = '',
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  indeterminate = false,
  id,
  description = ''
}) {
  const [hovered, setHovered] = React.useState(false);
  const checkboxRef = React.useRef(null);
  const checkboxId = id || React.useId();
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const isChecked = checked !== undefined ? checked : undefined;
  const isActive = isChecked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: checkboxId,
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0,
      marginTop: description ? '1px' : '0'
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: checkboxRef,
    id: checkboxId,
    type: "checkbox",
    checked: isChecked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      border: `1.5px solid ${isActive ? 'var(--color-accent-blue)' : hovered ? 'var(--color-outline-variant)' : 'var(--color-border-strong)'}`,
      background: isActive ? 'var(--color-accent-blue)' : 'var(--color-white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color var(--duration-fast) var(--ease-default), background var(--duration-fast) var(--ease-default)'
    }
  }, isChecked && !indeterminate && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "8",
    viewBox: "0 0 10 8",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 4L3.5 6.5L9 1",
    stroke: "white",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), indeterminate && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "2",
    viewBox: "0 0 8 2",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1H7",
    stroke: "white",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))), label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: 'var(--color-on-surface)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      lineHeight: 1.4,
      color: 'var(--color-on-surface-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
/**
 * Single-line text input with label, addons, validation, and helper text.
 */
function Input({
  label = '',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  type = 'text',
  size = 'md',
  disabled = false,
  error = '',
  helperText = '',
  leftAddon = null,
  rightAddon = null,
  id,
  name,
  required = false
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || React.useId();
  const heights = {
    sm: '32px',
    md: '40px',
    lg: '48px'
  };
  const fontSizes = {
    sm: '12px',
    md: '14px',
    lg: '16px'
  };
  const padH = {
    sm: '10px',
    md: '12px',
    lg: '14px'
  };
  const borderColor = error ? 'var(--color-status-error)' : focused ? 'var(--color-accent-blue)' : 'var(--color-border-subtle)';
  const boxShadow = focused ? error ? 'var(--focus-ring-error)' : 'var(--focus-ring)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: 'var(--color-on-surface)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-status-error)',
      marginLeft: '3px'
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, leftAddon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: padH[size],
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-on-surface-muted)',
      pointerEvents: 'none',
      zIndex: 1
    }
  }, leftAddon), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    name: name,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      height: heights[size],
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: leftAddon ? `calc(${padH[size]} + 22px)` : padH[size],
      paddingRight: rightAddon ? `calc(${padH[size]} + 22px)` : padH[size],
      fontFamily: 'var(--font-sans)',
      fontSize: fontSizes[size],
      fontWeight: 400,
      color: 'var(--color-on-surface)',
      background: disabled ? 'var(--color-neutral-100)' : 'var(--color-white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--rounded-default)',
      outline: 'none',
      boxShadow,
      transition: 'border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1
    }
  }), rightAddon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: padH[size],
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-on-surface-muted)',
      pointerEvents: 'none'
    }
  }, rightAddon)), (error || helperText) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: error ? 'var(--color-status-error)' : 'var(--color-on-surface-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * Native <select> styled to match the DHIRA design system.
 */
function Select({
  label = '',
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  size = 'md',
  disabled = false,
  error = '',
  helperText = '',
  id,
  required = false
}) {
  const [focused, setFocused] = React.useState(false);
  const selectId = id || React.useId();
  const heights = {
    sm: '32px',
    md: '40px',
    lg: '48px'
  };
  const fontSizes = {
    sm: '12px',
    md: '14px',
    lg: '16px'
  };
  const borderColor = error ? 'var(--color-status-error)' : focused ? 'var(--color-accent-blue)' : 'var(--color-border-subtle)';
  const boxShadow = focused ? error ? 'var(--focus-ring-error)' : 'var(--focus-ring)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: 'var(--color-on-surface)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-status-error)',
      marginLeft: '3px'
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selectId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      height: heights[size],
      padding: `0 36px 0 12px`,
      fontFamily: 'var(--font-sans)',
      fontSize: fontSizes[size],
      fontWeight: 400,
      color: 'var(--color-on-surface)',
      background: disabled ? 'var(--color-neutral-100)' : 'var(--color-white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--rounded-default)',
      outline: 'none',
      boxShadow,
      transition: 'border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      appearance: 'none',
      WebkitAppearance: 'none'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt.value,
    value: opt.value,
    disabled: opt.disabled
  }, opt.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--color-on-surface-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (error || helperText) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      color: error ? 'var(--color-status-error)' : 'var(--color-on-surface-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Toggle switch for binary on/off settings. Controlled or uncontrolled.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label = '',
  size = 'md',
  id
}) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const switchId = id || React.useId();
  const isControlled = checked !== undefined;
  const active = isControlled ? checked : internalChecked;
  const handleChange = e => {
    if (!isControlled) setInternalChecked(e.target.checked);
    if (onChange) onChange(e);
  };
  const sizes = {
    sm: {
      trackW: '28px',
      trackH: '16px',
      thumb: '10px',
      offset: '3px'
    },
    md: {
      trackW: '36px',
      trackH: '20px',
      thumb: '14px',
      offset: '3px'
    },
    lg: {
      trackW: '44px',
      trackH: '24px',
      thumb: '18px',
      offset: '3px'
    }
  };
  const s = sizes[size];
  const thumbLeft = active ? `calc(${s.trackW} - ${s.thumb} - ${s.offset})` : s.offset;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: switchId,
    type: "checkbox",
    checked: isControlled ? checked : internalChecked,
    onChange: handleChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: s.trackW,
      height: s.trackH,
      borderRadius: 'var(--rounded-full)',
      background: active ? 'var(--color-accent-blue)' : 'var(--color-neutral-300)',
      transition: `background var(--duration-normal) var(--ease-default)`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: s.offset,
      left: thumbLeft,
      width: s.thumb,
      height: s.thumb,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
      transition: `left var(--duration-normal) var(--ease-default)`
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: 400,
      color: 'var(--color-on-surface)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Horizontal tab bar. Default (underline) and pill variants.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'default'
}) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || items[0] && items[0].id || '');
  const isControlled = value !== undefined;
  const active = isControlled ? value : activeTab;
  const handleChange = id => {
    if (!isControlled) setActiveTab(id);
    if (onChange) onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: variant === 'pill' ? '2px' : '0',
      borderBottom: variant === 'default' ? '1px solid var(--color-border-subtle)' : 'none',
      padding: variant === 'pill' ? '3px' : '0',
      background: variant === 'pill' ? 'var(--color-neutral-100)' : 'transparent',
      borderRadius: variant === 'pill' ? 'var(--rounded-default)' : '0',
      alignItems: 'center'
    }
  }, items.map(item => {
    const isActive = item.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => !item.disabled && handleChange(item.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: variant === 'pill' ? '5px 12px' : '8px 12px',
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--color-on-surface)' : 'var(--color-on-surface-muted)',
        background: variant === 'pill' && isActive ? 'var(--color-white)' : 'transparent',
        border: 'none',
        borderBottom: variant === 'default' ? isActive ? '2px solid var(--color-primary)' : '2px solid transparent' : 'none',
        marginBottom: variant === 'default' ? '-1px' : '0',
        borderRadius: variant === 'pill' ? 'var(--rounded-sm)' : '0',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? 0.4 : 1,
        transition: 'color var(--duration-fast) var(--ease-default), background var(--duration-fast) var(--ease-default)',
        whiteSpace: 'nowrap',
        outline: 'none',
        boxShadow: variant === 'pill' && isActive ? 'var(--shadow-xs)' : 'none',
        userSelect: 'none'
      }
    }, item.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexShrink: 0
      }
    }, item.icon), item.label, item.count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        fontWeight: 500,
        lineHeight: 1,
        padding: '1px 5px',
        borderRadius: 'var(--rounded-full)',
        background: isActive ? 'var(--color-neutral-100)' : 'transparent',
        color: 'var(--color-on-surface-muted)',
        minWidth: '16px',
        textAlign: 'center'
      }
    }, item.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// hero/app.jsx
try { (() => {
// HERO STAGE — three overlapping app windows with mouse parallax, Hex-style.
const {
  Pipelines,
  Conversation,
  DataModels
} = window;
const LABEL_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.02em",
  color: "#8E8F91",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  gap: 8
};
const Tick = () => /*#__PURE__*/React.createElement("span", {
  style: {
    width: 18,
    height: 1,
    background: "#C6C6CA",
    display: "inline-block"
  }
});

// A parallax layer: shifts opposite the cursor by `depth`px.
const Layer = React.forwardRef(({
  depth,
  z,
  children,
  style
}, ref) => /*#__PURE__*/React.createElement("div", {
  ref: ref,
  "data-depth": depth,
  style: {
    position: "absolute",
    inset: 0,
    zIndex: z,
    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
    willChange: "transform",
    ...style
  }
}, children));
function HeroStage() {
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const layersRef = React.useRef([]);
  const setLayer = i => el => {
    layersRef.current[i] = el;
  };

  // scale-to-fit
  React.useEffect(() => {
    const CW = 1460,
      CH = 900;
    const fit = () => {
      const s = Math.min(window.innerWidth / CW, window.innerHeight / CH, 1.06);
      if (canvasRef.current) canvasRef.current.style.transform = `translate(-50%,-50%) scale(${Math.max(s, 0.32)})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // mouse parallax
  React.useEffect(() => {
    const stage = stageRef.current;
    let raf = null,
      tx = 0,
      ty = 0;
    const onMove = e => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = null;
      layersRef.current.forEach(el => {
        if (!el) return;
        const d = +el.dataset.depth;
        el.style.transform = `translate3d(${-tx * d}px, ${-ty * d}px, 0)`;
      });
      if (canvasRef.current) canvasRef.current.style.setProperty("--rot", `rotateX(${-ty * 0.8}deg) rotateY(${tx * 1.1}deg)`);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      layersRef.current.forEach(el => {
        if (el) el.style.transform = "translate3d(0,0,0)";
      });
      if (canvasRef.current) canvasRef.current.style.setProperty("--rot", "rotateX(0) rotateY(0)");
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    className: "stage"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "contour",
    viewBox: "0 0 1440 900",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, Array.from({
    length: 9
  }).map((_, i) => /*#__PURE__*/React.createElement("ellipse", {
    key: i,
    cx: "720",
    cy: "470",
    rx: 170 + i * 110,
    ry: 90 + i * 64,
    fill: "none",
    stroke: "#E2E4E8",
    strokeWidth: "1"
  }))), /*#__PURE__*/React.createElement("div", {
    ref: canvasRef,
    className: "canvas"
  }, /*#__PURE__*/React.createElement(Layer, {
    ref: setLayer(0),
    depth: 13,
    z: 10
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 110,
      top: 96,
      ...LABEL_STYLE
    }
  }, /*#__PURE__*/React.createElement(Tick, null), " Data pipelines"), /*#__PURE__*/React.createElement("div", {
    className: "win",
    style: {
      left: 0,
      top: 150,
      width: 742,
      height: 600
    }
  }, /*#__PURE__*/React.createElement(Pipelines, null))), /*#__PURE__*/React.createElement(Layer, {
    ref: setLayer(1),
    depth: 13,
    z: 11
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 1140,
      top: 120,
      ...LABEL_STYLE
    }
  }, "Data models ", /*#__PURE__*/React.createElement(Tick, null)), /*#__PURE__*/React.createElement("div", {
    className: "win",
    style: {
      left: 718,
      top: 178,
      width: 742,
      height: 576
    }
  }, /*#__PURE__*/React.createElement(DataModels, null))), /*#__PURE__*/React.createElement(Layer, {
    ref: setLayer(2),
    depth: 24,
    z: 30
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 700,
      top: 6,
      transform: "translateX(-50%)",
      ...LABEL_STYLE
    }
  }, /*#__PURE__*/React.createElement(Tick, null), " Conversational AI ", /*#__PURE__*/React.createElement(Tick, null)), /*#__PURE__*/React.createElement("div", {
    className: "win win-float",
    style: {
      left: 450,
      top: 48,
      width: 500,
      height: 792
    }
  }, /*#__PURE__*/React.createElement(Conversation, null)))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(HeroStage, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero/app.jsx", error: String((e && e.message) || e) }); }

// hero/conversation.jsx
try { (() => {
// CENTER PANEL — Conversational AI (grounded answer with chart, insight, PDF + DB lineage)
const {
  Icons,
  AkashicLogo
} = window;

// stacked horizontal bar: Core Worlds / Mid-Rim / Outer Rim
const regionColors = ["#3E4FB8", "#5C7CE0", "#A9B9F0"];
const bars = [{
  label: "Teleportation pads",
  seg: [68, 22, 10]
}, {
  label: "Quantum drives",
  seg: [60, 26, 14]
}, {
  label: "Wormhole initiators",
  seg: [44, 30, 26]
}, {
  label: "Dark matter lasers",
  seg: [50, 27, 23]
}, {
  label: "Temporal stabilizers",
  seg: [56, 30, 14]
}, {
  label: "Anti-gravity generators",
  seg: [58, 24, 18]
}];
const SourceChip = ({
  icon,
  name,
  meta,
  tone
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "5px 9px 5px 7px",
    background: "#fff",
    border: "1px solid #E8E8E9",
    borderRadius: 8
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 22,
    height: 22,
    borderRadius: 5,
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: tone.bg,
    color: tone.fg
  }
}, icon), /*#__PURE__*/React.createElement("div", {
  style: {
    lineHeight: 1.2
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "#1A1C1D"
  }
}, name), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 9.5,
    color: "#8E8F91",
    fontFamily: "var(--font-mono)"
  }
}, meta)));
function Conversation() {
  return /*#__PURE__*/React.createElement("div", {
    className: "app-window",
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #E8E8E9"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 16px",
      borderBottom: "1px solid #EEEFF1",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(AkashicLogo, {
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "#1A1C1D",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "NexaCorp product line performance (Q3)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost"
  }, "Share"), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary"
  }, "Continue in project"))), /*#__PURE__*/React.createElement("div", {
    className: "conv-scroll",
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 18px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "82%",
      background: "#EEF1FC",
      border: "1px solid #DCE3FA",
      borderRadius: "12px 12px 4px 12px",
      padding: "10px 13px",
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "#1A1C1D"
    }
  }, "Can you break this out by region too? I want to see how each product line performed across the Core Worlds, Mid-Rim, and Outer Rim.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "#2F3132",
      margin: "0 0 12px",
      maxWidth: "none"
    }
  }, "I'll help you analyze NexaCorp's Q3 revenue by product line and region. Let me search for the most relevant data source."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 12px",
      background: "#F7F8FA",
      border: "1px solid #EEEFF1",
      borderRadius: 8,
      color: "#6E6F71",
      fontSize: 12.5,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 13
  }), " Thought for 11 seconds"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #C8D2F5",
      background: "#FAFBFF",
      borderRadius: 10,
      padding: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icons.sparkle, {
    s: 13,
    stroke: "#3E63DD"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.03em",
      color: "#2A4299"
    }
  }, "GROUNDED IN 2 SOURCES"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      color: "#3E63DD",
      fontWeight: 500
    }
  }, "View lineage")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(SourceChip, {
    icon: /*#__PURE__*/React.createElement(Icons.file, {
      s: 13
    }),
    name: "Q3_Financials.pdf",
    meta: "p.14 \xB7 table 3",
    tone: {
      bg: "#FEF1F2",
      fg: "#C0383C"
    }
  }), /*#__PURE__*/React.createElement(SourceChip, {
    icon: /*#__PURE__*/React.createElement(Icons.database, {
      s: 13
    }),
    name: "galactic_sales.revenue",
    meta: "warehouse \xB7 4.2M rows",
    tone: {
      bg: "#EEF1FC",
      fg: "#2A4299"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 10.5,
      color: "#6E6F71",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 7px",
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 5
    }
  }, "sources"), /*#__PURE__*/React.createElement(Icons.arrowRight, {
    s: 12,
    stroke: "#B0B1B3"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 7px",
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 5
    }
  }, "extract + link"), /*#__PURE__*/React.createElement(Icons.arrowRight, {
    s: 12,
    stroke: "#B0B1B3"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 7px",
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 5
    }
  }, "semantic model"), /*#__PURE__*/React.createElement(Icons.arrowRight, {
    s: 12,
    stroke: "#B0B1B3"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 7px",
      background: "#EEF1FC",
      border: "1px solid #C8D2F5",
      borderRadius: 5,
      color: "#2A4299",
      fontWeight: 600
    }
  }, "answer"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "#2F3132",
      margin: "0 0 12px",
      maxWidth: "none"
    }
  }, "I found regional revenue data in the endorsed semantic model ", /*#__PURE__*/React.createElement("strong", null, "\"NexaCorp: Galactic Sales Model.\""), " It links the PDF figures to the warehouse fact table, so every number is traceable to source. Here is a grouped bar chart:"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #E8E8E9",
      borderRadius: 10,
      padding: "13px 15px 15px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "#1A1C1D"
    }
  }, "Galactic Revenue Distribution by Product Line (Q3)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11.5,
      color: "#6E6F71"
    }
  }, /*#__PURE__*/React.createElement(Icons.compass, {
    s: 13
  }), " Explore")), bars.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      textAlign: "right",
      fontSize: 10.5,
      color: "#45474A",
      flex: "none"
    }
  }, b.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      height: 15,
      borderRadius: 3,
      overflow: "hidden"
    }
  }, b.seg.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: w + "%",
      background: regionColors[i]
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      marginLeft: 106,
      marginTop: 4,
      fontSize: 9.5,
      color: "#8E8F91",
      justifyContent: "space-between",
      fontVariantNumeric: "tabular-nums"
    }
  }, ["0%", "20%", "40%", "60%", "80%", "100%"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 11,
      marginLeft: 106
    }
  }, ["Core Worlds", "Mid-Rim", "Outer Rim"].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 10.5,
      color: "#6E6F71"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 2,
      background: regionColors[i]
    }
  }), r)))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "#2F3132",
      margin: 0,
      maxWidth: "none"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Quick insight:"), " Core Worlds lead revenue for Teleportation pads and Quantum drives, while Wormhole initiators see a stronger mix from the Outer Rim.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px 14px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #C8D2F5",
      borderRadius: 12,
      padding: "11px 13px 9px",
      boxShadow: "0 0 0 3px rgba(62,99,221,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#B0B1B3",
      marginBottom: 10
    }
  }, "Ask another question..."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      border: "1px solid #E8E8E9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6E6F71"
    }
  }, /*#__PURE__*/React.createElement(Icons.plus, {
    s: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "#45474A"
    }
  }, /*#__PURE__*/React.createElement(Icons.database, {
    s: 13,
    stroke: "#8E8F91"
  }), " NexaCorp Galactic Warehouse ", /*#__PURE__*/React.createElement(Icons.chevronDown, {
    s: 13,
    stroke: "#8E8F91"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 26,
      borderRadius: 7,
      background: "#1A1C1D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icons.cornerReturn, {
    s: 14
  })))))));
}
window.Conversation = Conversation;
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero/conversation.jsx", error: String((e && e.message) || e) }); }

// hero/datamodels.jsx
try { (() => {
// RIGHT PANEL — Akashic Data Models (entity tables + relationships / star schema)
const {
  Icons,
  AkashicLogo,
  UserChip
} = window;
const TYPE_COLORS = {
  int: {
    bg: "#EEF1FC",
    fg: "#2A4299"
  },
  string: {
    bg: "#F3F3F4",
    fg: "#5C5F60"
  },
  decimal: {
    bg: "#E6F4ED",
    fg: "#1E7C4D"
  },
  date: {
    bg: "#FEFBE8",
    fg: "#8A6D00"
  }
};
const W = 172,
  HEAD = 32,
  ROW = 25;

// Entity table card
const EntityTable = ({
  title,
  accent,
  rows,
  left,
  top,
  selected
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: "absolute",
    left,
    top,
    width: W,
    background: "#fff",
    border: `1px solid ${selected ? "#3E63DD" : "#E2E2E3"}`,
    borderRadius: 9,
    boxShadow: selected ? "0 6px 20px rgba(62,99,221,0.16)" : "0 3px 12px rgba(16,18,20,0.07)",
    overflow: "hidden"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    height: 3,
    background: accent
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "7px 10px",
    borderBottom: "1px solid #F3F3F4"
  }
}, /*#__PURE__*/React.createElement(Icons.layers, {
  s: 13,
  stroke: accent
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12.5,
    fontWeight: 600,
    color: "#1A1C1D",
    fontFamily: "var(--font-mono)"
  }
}, title)), rows.map(r => {
  const t = TYPE_COLORS[r.type];
  return /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      height: ROW,
      padding: "0 10px",
      borderBottom: "1px solid #F7F8FA",
      background: r.pk ? "#FCFCFE" : "#fff"
    }
  }, r.pk ? /*#__PURE__*/React.createElement(Icons.key, {
    s: 11,
    stroke: "#C8930A"
  }) : r.fk ? /*#__PURE__*/React.createElement(Icons.key, {
    s: 11,
    stroke: "#3E63DD"
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: r.pk || r.fk ? "#1A1C1D" : "#45474A",
      fontWeight: r.pk || r.fk ? 600 : 400,
      fontFamily: "var(--font-mono)",
      flex: 1
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 600,
      padding: "1px 5px",
      borderRadius: 4,
      background: t.bg,
      color: t.fg
    }
  }, r.type));
}));
const catalog = [{
  name: "accounts",
  n: 6,
  on: false
}, {
  name: "revenue",
  n: 8,
  on: true
}, {
  name: "product_lines",
  n: 5,
  on: false
}, {
  name: "regions",
  n: 4,
  on: false
}, {
  name: "customers",
  n: 11,
  on: false
}, {
  name: "shipments",
  n: 7,
  on: false
}, {
  name: "invoices",
  n: 9,
  on: false
}];
function DataModels() {
  return /*#__PURE__*/React.createElement("div", {
    className: "app-window",
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #E8E8E9"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: "1px solid #EEEFF1",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(AkashicLogo, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      color: "#8E8F91"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Home"), /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#1A1C1D",
      fontWeight: 500
    }
  }, "Akashic Data Models"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icons.pencil, {
    s: 13
  }), " Edit")), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary"
  }, "Share"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 190,
      borderRight: "1px solid #EEEFF1",
      flex: "none",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px 8px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      color: "#8E8F91"
    }
  }, "MODEL CATALOG"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 12px",
      margin: "0 8px",
      border: "1px solid #E8E8E9",
      borderRadius: 7,
      color: "#B0B1B3"
    }
  }, /*#__PURE__*/React.createElement(Icons.search, {
    s: 13
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "Search entities")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 14px 6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      fontWeight: 600,
      color: "#1A1C1D"
    }
  }, /*#__PURE__*/React.createElement(Icons.chevronDown, {
    s: 13
  }), /*#__PURE__*/React.createElement(Icons.grid, {
    s: 13,
    stroke: "#6E6F71"
  }), " Entities (19)")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 8px",
      overflow: "hidden",
      flex: 1
    }
  }, catalog.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 9px",
      borderRadius: 7,
      background: e.on ? "#EEF1FC" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Icons.layers, {
    s: 13,
    stroke: e.on ? "#3E63DD" : "#8E8F91"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: e.on ? 600 : 500,
      color: e.on ? "#2A4299" : "#45474A",
      fontFamily: "var(--font-mono)",
      flex: 1
    }
  }, e.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#B0B1B3"
    }
  }, e.n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      borderTop: "1px solid #EEEFF1",
      fontSize: 11,
      color: "#B0B1B3"
    }
  }, "Galactic Sales Model")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      background: "#F7F8FA",
      backgroundImage: "radial-gradient(#E2E4E8 1px, transparent 1px)",
      backgroundSize: "18px 18px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "dm-one",
    markerWidth: "10",
    markerHeight: "10",
    refX: "5",
    refY: "5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "5",
    r: "2.6",
    fill: "#fff",
    stroke: "#3E63DD",
    strokeWidth: "1.4"
  })), /*#__PURE__*/React.createElement("marker", {
    id: "dm-many",
    markerWidth: "14",
    markerHeight: "14",
    refX: "9",
    refY: "7",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2 L9 7 L2 12",
    fill: "none",
    stroke: "#3E63DD",
    strokeWidth: "1.3"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M 178 319 C 130 319, 150 88, 190 88",
    fill: "none",
    stroke: "#9FB2EE",
    strokeWidth: "1.6",
    markerStart: "url(#dm-many)",
    markerEnd: "url(#dm-one)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 350 344 C 400 344, 296 88, 332 88",
    fill: "none",
    stroke: "#9FB2EE",
    strokeWidth: "1.6",
    markerStart: "url(#dm-many)",
    markerEnd: "url(#dm-one)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 178 369 C 120 369, 150 344, 190 344",
    fill: "none",
    stroke: "#9FB2EE",
    strokeWidth: "1.6",
    markerStart: "url(#dm-many)",
    markerEnd: "url(#dm-one)"
  })), /*#__PURE__*/React.createElement(EntityTable, {
    title: "accounts",
    accent: "#30A46C",
    left: 18,
    top: 44,
    rows: [{
      name: "id",
      type: "int",
      pk: true
    }, {
      name: "name",
      type: "string"
    }, {
      name: "sector",
      type: "string"
    }, {
      name: "tier",
      type: "string"
    }]
  }), /*#__PURE__*/React.createElement(EntityTable, {
    title: "product_lines",
    accent: "#F5A623",
    left: 332,
    top: 44,
    rows: [{
      name: "id",
      type: "int",
      pk: true
    }, {
      name: "name",
      type: "string"
    }, {
      name: "category",
      type: "string"
    }]
  }), /*#__PURE__*/React.createElement(EntityTable, {
    title: "regions",
    accent: "#8E5BD0",
    left: 18,
    top: 300,
    rows: [{
      name: "id",
      type: "int",
      pk: true
    }, {
      name: "name",
      type: "string"
    }, {
      name: "tier",
      type: "string"
    }]
  }), /*#__PURE__*/React.createElement(EntityTable, {
    title: "revenue",
    accent: "#3E63DD",
    selected: true,
    left: 178,
    top: 250,
    rows: [{
      name: "id",
      type: "int",
      pk: true
    }, {
      name: "account_id",
      type: "int",
      fk: true
    }, {
      name: "product_id",
      type: "int",
      fk: true
    }, {
      name: "region_id",
      type: "int",
      fk: true
    }, {
      name: "amount",
      type: "decimal"
    }, {
      name: "quarter",
      type: "string"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 14,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: 4,
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 9,
      boxShadow: "0 4px 14px rgba(16,18,20,0.08)",
      color: "#6E6F71"
    }
  }, /*#__PURE__*/React.createElement(Icons.plus, {
    s: 15
  }), /*#__PURE__*/React.createElement(Icons.minus, {
    s: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 14,
      bottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "6px 11px",
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 9999,
      fontSize: 11,
      color: "#45474A",
      boxShadow: "0 4px 14px rgba(16,18,20,0.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 1.6,
      background: "#9FB2EE",
      display: "inline-block"
    }
  }), " 3 relationships"))));
}
window.DataModels = DataModels;
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero/datamodels.jsx", error: String((e && e.message) || e) }); }

// hero/pipelines.jsx
try { (() => {
// LEFT PANEL — Akashic Data Pipeline (drag-and-drop ETL connector canvas)
const {
  Icons,
  AkashicLogo,
  UserChip
} = window;
const connectors = [{
  name: "AWS Redshift",
  color: "#C8511B",
  glyph: "redshift"
}, {
  name: "Azure SQL Server",
  color: "#0078D4",
  glyph: "azure"
}, {
  name: "MariaDB",
  color: "#003545",
  glyph: "maria"
}, {
  name: "MySQL",
  color: "#00758F",
  glyph: "mysql"
}, {
  name: "Oracle",
  color: "#C74634",
  glyph: "oracle"
}, {
  name: "Postgres",
  color: "#336791",
  glyph: "pg"
}, {
  name: "Snowflake",
  color: "#29B5E8",
  glyph: "snow"
}];
const ConnGlyph = ({
  color
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: 22,
    height: 22,
    borderRadius: 5,
    background: color + "1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 11,
    height: 11,
    borderRadius: 3,
    background: color
  }
}));

// A draggable connector row in the sidebar
const ConnRow = ({
  c
}) => /*#__PURE__*/React.createElement("div", {
  className: "conn-row",
  style: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "7px 8px",
    borderRadius: 6,
    cursor: "grab"
  }
}, /*#__PURE__*/React.createElement(Icons.dots6, null), /*#__PURE__*/React.createElement(ConnGlyph, {
  color: c.color
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12.5,
    color: "#2F3132",
    fontWeight: 500
  }
}, c.name));

// A pipeline node on the canvas
const Node = ({
  kind,
  title,
  sub,
  icon,
  accent,
  style,
  draggable
}) => {
  const headColors = {
    Source: {
      bg: "#E6F4ED",
      fg: "#1E7C4D",
      bar: "#30A46C"
    },
    Transformation: {
      bg: "#FEFBE8",
      fg: "#8A6D00",
      bar: "#F5D90A"
    },
    Destination: {
      bg: "#EEF1FC",
      fg: "#2A4299",
      bar: "#3E63DD"
    }
  }[kind];
  return /*#__PURE__*/React.createElement("div", {
    className: draggable ? "pl-node pl-node-drag" : "pl-node",
    style: {
      position: "absolute",
      width: 158,
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 8,
      boxShadow: "0 4px 14px rgba(16,18,20,0.07)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 8px",
      background: headColors.bg,
      borderRadius: "8px 8px 0 0",
      borderBottom: "1px solid rgba(0,0,0,0.04)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.03em",
      color: headColors.fg
    }
  }, kind), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      color: headColors.fg,
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Icons.gear, {
    s: 11
  }), /*#__PURE__*/React.createElement(Icons.compass, {
    s: 11
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 9px 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: accent + "1A",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: accent
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "#1A1C1D",
      lineHeight: 1.2
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#8E8F91",
      marginTop: 1,
      fontFamily: "var(--font-mono)"
    }
  }, sub))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 9px",
      borderTop: "1px solid #F3F3F4",
      color: "#B0B1B3"
    }
  }, /*#__PURE__*/React.createElement(Icons.lock, {
    s: 11
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icons.copy, {
    s: 11
  }), /*#__PURE__*/React.createElement(Icons.trash, {
    s: 11,
    stroke: "#E5484D"
  }))));
};
const TbBtn = ({
  icon,
  label,
  active,
  color = "#45474A"
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 8px",
    borderRadius: 6,
    color,
    fontSize: 12.5,
    fontWeight: 500,
    cursor: "default"
  }
}, icon, label && /*#__PURE__*/React.createElement("span", null, label));
function Pipelines() {
  // node centers for wiring (relative to canvas)
  return /*#__PURE__*/React.createElement("div", {
    className: "app-window",
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #E8E8E9"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: "1px solid #EEEFF1",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(AkashicLogo, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      color: "#8E8F91"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Home"), /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 12
  }), /*#__PURE__*/React.createElement("span", null, "Akashic Data Pipeline"), /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#1A1C1D",
      fontWeight: 500
    }
  }, "Assets"))), /*#__PURE__*/React.createElement(UserChip, {
    name: "Vipul G",
    initials: "VG"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "8px 14px",
      borderBottom: "1px solid #EEEFF1",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.chevronDown, {
      s: 13
    }),
    label: "Actions"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 10px",
      marginLeft: 4,
      border: "1px solid #E8E8E9",
      borderRadius: 7,
      fontSize: 12.5,
      color: "#1A1C1D",
      fontFamily: "var(--font-mono)"
    }
  }, "My_ADP_Pipeline_8n2MMa ", /*#__PURE__*/React.createElement(Icons.pencil, {
    s: 12,
    stroke: "#8E8F91"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 18,
      background: "#E8E8E9",
      margin: "0 6px"
    }
  }), /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.check, {
      s: 14,
      stroke: "#30A46C"
    }),
    label: "Validated"
  }), /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.play, {
      s: 13,
      stroke: "#1A1C1D",
      fill: "#1A1C1D"
    }),
    label: "Run",
    color: "#1A1C1D"
  }), /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.stop, {
      s: 13,
      stroke: "#B0B1B3"
    }),
    label: "Stop",
    color: "#B0B1B3"
  }), /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.calendar, {
      s: 13
    }),
    label: "Schedule"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      borderRadius: 9999,
      background: "#E6F4ED",
      color: "#1E7C4D",
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icons.check, {
    s: 13
  }), " Finished"), /*#__PURE__*/React.createElement(TbBtn, {
    icon: /*#__PURE__*/React.createElement(Icons.more, {
      s: 16,
      stroke: "#8E8F91"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      borderRight: "1px solid #EEEFF1",
      display: "flex",
      flexDirection: "column",
      flex: "none",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 14px 4px",
      fontSize: 12,
      color: "#6E6F71",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 13
  }), " Modules Menu"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "6px 12px 0",
      margin: "0 2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "6px 0",
      fontSize: 12.5,
      fontWeight: 600,
      color: "#1A1C1D",
      borderBottom: "2px solid #1A1C1D"
    }
  }, "Assets"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "6px 0",
      fontSize: 12.5,
      fontWeight: 500,
      color: "#8E8F91",
      borderBottom: "2px solid transparent"
    }
  }, "Pipelines")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "6px 9px",
      border: "1px solid #E8E8E9",
      borderRadius: 7,
      color: "#B0B1B3"
    }
  }, /*#__PURE__*/React.createElement(Icons.search, {
    s: 13
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "Search"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      padding: "0 8px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#B0B1B3",
      padding: "4px 9px 6px"
    }
  }, "File"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "7px 9px",
      background: "#EEF1FC",
      borderRadius: 7,
      color: "#2A4299",
      fontWeight: 600,
      fontSize: 12.5
    }
  }, "RDBMS ", /*#__PURE__*/React.createElement(Icons.chevronDown, {
    s: 13
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2
    }
  }, connectors.map(c => /*#__PURE__*/React.createElement(ConnRow, {
    key: c.name,
    c: c
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 9px",
      color: "#6E6F71",
      fontSize: 12.5,
      fontWeight: 500,
      borderTop: "1px solid #F3F3F4",
      marginTop: 4
    }
  }, "No SQL ", /*#__PURE__*/React.createElement(Icons.chevronRight, {
    s: 13
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      background: "#F7F8FA",
      backgroundImage: "radial-gradient(#E2E4E8 1px, transparent 1px)",
      backgroundSize: "18px 18px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "pl-dot",
    markerWidth: "8",
    markerHeight: "8",
    refX: "4",
    refY: "4"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "4",
    cy: "4",
    r: "3",
    fill: "#fff",
    stroke: "#B0B1B3",
    strokeWidth: "1.2"
  }))), ["M 168 92 C 210 92, 196 150, 238 150", "M 320 178 C 356 178, 344 226, 380 226", "M 462 254 C 496 254, 486 300, 520 300", "M 600 330 C 632 330, 624 372, 654 372"].map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d,
    fill: "none",
    stroke: "#B0B1B3",
    strokeWidth: "1.6",
    markerStart: "url(#pl-dot)",
    markerEnd: "url(#pl-dot)"
  }))), /*#__PURE__*/React.createElement(Node, {
    kind: "Source",
    title: "AWS S3",
    sub: "AWS_S3_source_TFFCi6",
    accent: "#C8511B",
    icon: /*#__PURE__*/React.createElement(Icons.database, {
      s: 15
    }),
    style: {
      left: 14,
      top: 60
    }
  }), /*#__PURE__*/React.createElement(Node, {
    kind: "Transformation",
    title: "Transpose",
    accent: "#8A6D00",
    icon: /*#__PURE__*/React.createElement(Icons.transpose, {
      s: 15
    }),
    style: {
      left: 240,
      top: 118
    }
  }), /*#__PURE__*/React.createElement(Node, {
    kind: "Transformation",
    title: "Split",
    accent: "#8A6D00",
    icon: /*#__PURE__*/React.createElement(Icons.split, {
      s: 15
    }),
    style: {
      left: 382,
      top: 194
    }
  }), /*#__PURE__*/React.createElement(Node, {
    kind: "Transformation",
    title: "Drop Fields",
    draggable: true,
    accent: "#8A6D00",
    icon: /*#__PURE__*/React.createElement(Icons.layers, {
      s: 15
    }),
    style: {
      left: 522,
      top: 268
    }
  }), /*#__PURE__*/React.createElement(Node, {
    kind: "Destination",
    title: "Postgres",
    sub: "ndap_data",
    accent: "#3E63DD",
    icon: /*#__PURE__*/React.createElement(Icons.database, {
      s: 15
    }),
    style: {
      left: 656,
      top: 340
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      bottom: 56,
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "7px 12px",
      background: "#fff",
      border: "1px solid #B4DFCA",
      borderRadius: 9999,
      color: "#1E7C4D",
      fontSize: 12,
      fontWeight: 600,
      boxShadow: "0 4px 14px rgba(16,18,20,0.08)"
    }
  }, /*#__PURE__*/React.createElement(Icons.checkCircle, {
    s: 14
  }), " Pipeline validated"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 14,
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "5px 8px",
      background: "#fff",
      border: "1px solid #E8E8E9",
      borderRadius: 9999,
      boxShadow: "0 4px 14px rgba(16,18,20,0.08)",
      color: "#6E6F71"
    }
  }, /*#__PURE__*/React.createElement(Icons.refresh, {
    s: 14
  }), /*#__PURE__*/React.createElement(Icons.undo, {
    s: 14
  }), /*#__PURE__*/React.createElement(Icons.redo, {
    s: 14
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 14,
      background: "#E8E8E9"
    }
  }), /*#__PURE__*/React.createElement(Icons.lock, {
    s: 14
  }), /*#__PURE__*/React.createElement(Icons.minus, {
    s: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#45474A",
      minWidth: 30,
      textAlign: "center"
    }
  }, "68%"), /*#__PURE__*/React.createElement(Icons.plus, {
    s: 14
  })))));
}
window.Pipelines = Pipelines;
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero/pipelines.jsx", error: String((e && e.message) || e) }); }

// hero/shared.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Shared logo, icons, and helpers for the Akashic hero screens.
// Icons are 1.5px-stroke Lucide-style line icons, sized via the `s` prop.

const Ic = ({
  d,
  s = 16,
  sw = 1.5,
  fill = "none",
  stroke = "currentColor",
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: s,
  height: s,
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: stroke,
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    flex: "none",
    ...style
  }
}, d);
const Icons = {
  chevronDown: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M6 9l6 6 6-6"
    })
  })),
  chevronRight: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })
  })),
  search: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4-4"
    }))
  })),
  play: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M7 5l12 7-12 7z"
    })
  })),
  stop: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("rect", {
      x: "7",
      y: "7",
      width: "10",
      height: "10",
      rx: "1.5"
    })
  })),
  check: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M5 13l4 4L19 7"
    })
  })),
  checkCircle: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.5 12l2.5 2.5L16 9"
    }))
  })),
  calendar: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "5",
      width: "16",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 3v4M16 3v4M4 10h16"
    }))
  })),
  gear: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
    }))
  })),
  copy: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "9",
      width: "11",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 15V5a2 2 0 0 1 2-2h8"
    }))
  })),
  trash: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"
    }))
  })),
  lock: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "11",
      width: "14",
      height: "9",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 11V8a4 4 0 0 1 8 0v3"
    }))
  })),
  plus: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })
  })),
  minus: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    })
  })),
  undo: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"
    })
  })),
  redo: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h3"
    })
  })),
  refresh: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M4 4v6h6M20 20v-6h-6M20 9a8 8 0 0 0-14-3M4 15a8 8 0 0 0 14 3"
    })
  })),
  share: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 3v13M8 7l4-4 4 4"
    }))
  })),
  arrowRight: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M13 6l6 6-6 6"
    })
  })),
  cornerReturn: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 10l-4 4 4 4M5 14h10a4 4 0 0 0 4-4V6"
    })
  })),
  database: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "12",
      cy: "6",
      rx: "8",
      ry: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"
    }))
  })),
  file: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 3v5h5"
    }))
  })),
  key: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "15",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M11 12l8-8M17 6l2 2M14 9l2 2"
    }))
  })),
  sparkle: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"
    })
  })),
  transpose: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M4 8h12l-3-3M20 16H8l3 3"
    })
  })),
  split: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "6",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "18",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 12l8-5M8 12l8 5"
    }))
  })),
  layers: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"
    })
  })),
  grid: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "4",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "13",
      y: "4",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "13",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "13",
      y: "13",
      width: "7",
      height: "7",
      rx: "1"
    }))
  })),
  more: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1.4",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.4",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1.4",
      fill: "currentColor",
      stroke: "none"
    }))
  })),
  pencil: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M4 20h4l11-11-4-4L4 16zM14 5l4 4"
    })
  })),
  compass: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15.5 8.5l-2 5-5 2 2-5z"
    }))
  })),
  table: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "4",
      width: "16",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 10h16M10 4v16"
    }))
  })),
  close: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M6 6l12 12M18 6L6 18"
    })
  })),
  dots6: ({
    s = 12
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 12 16",
    style: {
      flex: "none"
    }
  }, [3, 9].map(x => [3, 8, 13].map(y => /*#__PURE__*/React.createElement("circle", {
    key: `${x}-${y}`,
    cx: x,
    cy: y,
    r: "1.1",
    fill: "#B0B1B3"
  }))))
};

// Akashic wordmark + brain-network mark
const AkashicLogo = ({
  size = 22
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 7
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 28 28",
  fill: "none",
  style: {
    flex: "none"
  }
}, /*#__PURE__*/React.createElement("rect", {
  x: "1",
  y: "1",
  width: "26",
  height: "26",
  rx: "8",
  fill: "#1A1C1D"
}), /*#__PURE__*/React.createElement("g", {
  stroke: "#FAFAFB",
  strokeWidth: "1.4",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "14",
  cy: "9",
  r: "1.6",
  fill: "#FAFAFB",
  stroke: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "17",
  r: "1.6",
  fill: "#FAFAFB",
  stroke: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "19",
  cy: "17",
  r: "1.6",
  fill: "#FAFAFB",
  stroke: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "14",
  cy: "20.5",
  r: "1.3",
  fill: "#3E63DD",
  stroke: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 9L9 17M14 9l5 8M9 17h10M9 17l5 3.5M19 17l-5 3.5"
}))), /*#__PURE__*/React.createElement("span", {
  style: {
    fontWeight: 700,
    fontSize: size * 0.62,
    letterSpacing: "0.06em",
    color: "#1A1C1D"
  }
}, "AKASHIC"));

// Tiny user avatar with initials
const UserChip = ({
  name = "Vipul G",
  initials = "VG",
  color = "#3E63DD"
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: "#45474A"
  }
}, name), /*#__PURE__*/React.createElement("div", {
  style: {
    width: 26,
    height: 26,
    borderRadius: 9999,
    background: color,
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}, initials));
Object.assign(window, {
  Ic,
  Icons,
  AkashicLogo,
  UserChip
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KPICard = __ds_scope.KPICard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
