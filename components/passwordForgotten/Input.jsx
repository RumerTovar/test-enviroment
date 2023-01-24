import styles from './Input.module.css';

export default function Input({
 label,
 type,
 name,
 placeholder,
 onChange,
 value,
 error,
}) {
 const className = () => {
  if (error === false) {
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
    onChange={onChange}
    value={value[name]}
   />
   {error === true ? null : <p className={styles.errors}>{error}</p>}
  </div>
 );
}
