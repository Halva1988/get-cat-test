import { memo, useId } from "react";
import styles from "./Checkbox.module.css";
const Checkbox = ({ label, checked, onChange }) => {
	const id = useId();
	return (
		<div className={styles.checkboxWrapper}>
			<input type="checkbox" checked={checked} onChange={onChange} id={id} />
			<label htmlFor={id} className={styles.cbx}></label>
			<label htmlFor={id} className={styles.lbl}>{label}</label>
		</div>
	);
};

export default memo(Checkbox);
