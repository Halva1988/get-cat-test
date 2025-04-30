import styles from './Tooltip.module.css';

const Tooltip = ({ catDescription }) => {
	return <p className={styles.description}>{catDescription}</p>;
};

export default Tooltip