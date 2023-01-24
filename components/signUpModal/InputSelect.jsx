import styles from './Input.module.css';
import { countries } from '../../data/countries';

export default function InputSelect({ label, name, onChange }) {
 return (
  <div>
   <p className={`${styles.label} ${styles[name]}`}>{label}</p>
   <select
    className={styles.input}
    name={name}
    defaultValue={'United States'}
    onChange={onChange}>
    {countries.map((el) => {
     const index = el.name.indexOf(',');
     if (index !== -1) {
      const country = el.name.substring(0, index);
      return (
       <option key={el.code} value={el.name}>
        {country}
       </option>
      );
     }
     return (
      <option key={el.code} value={el.name}>
       {el.name}
      </option>
     );
    })}
   </select>
  </div>
 );
}
