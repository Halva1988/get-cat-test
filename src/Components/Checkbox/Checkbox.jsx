import { memo, useId } from 'react';
import styles from './Checkbox.module.css';
const Checkbox = ({ label, checked, onChange }) => {
	const id = useId();
	return (
		<div className={styles.checkbox}>
			<input type="checkbox" checked={checked} onChange={onChange} id={id} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

export default memo(Checkbox);
