import styles from './Input.module.css';

export default function Input({
 label,
 type,
 name,
 placeholder,
 onBlur,
 onChange,
 value,
 errors,
}) {
 const className = () => {
  if (errors[name] === undefined || errors[name] === true) {
   return;
  }
  return styles.inputError;
 };

 return (
  <div className={`${styles.inputContainer} ${styles[name]}`}>
   <p className={styles.label}>{label}</p>
   <input
    className={`${styles.input} ${className()}`}
    type={type}
    name={name}
    placeholder={placeholder}
    onBlur={onBlur}
    onChange={onChange}
    onKeyUp={onBlur}
    value={value[name]}
   />
   {errors[name] === undefined || errors[name] === true ? null : (
    <p className={styles.errors}>{errors[name]}</p>
   )}
  </div>
 );
}
