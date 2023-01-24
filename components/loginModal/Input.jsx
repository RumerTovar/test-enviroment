import styles from './Input.module.css';

export default function Input({
 label,
 type,
 name,
 placeholder,
 onBlur,
 onChange,
 value,
}) {
 return (
  <>
   <p className={styles.label}>{label}</p>
   <input
    className={styles.input}
    type={type}
    name={name}
    placeholder={placeholder}
    onBlur={onBlur}
    onChange={onChange}
    onKeyUp={onBlur}
    value={value[name]}
   />
  </>
 );
}
