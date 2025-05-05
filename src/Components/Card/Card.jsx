import styles from "./Card.module.css";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import ImageCat from "../ImageCat/ImageCat";
import { useCatLogic } from "../../hooks/useCatLogic";

const Card = () => {
	const {
		isChecked,
		isAutoRefresh,
		catImage,
		handleEnableChange,
		handleAutoRefreshChange,
		fetchCatImage,
	} = useCatLogic();

	return (
		<div className={styles.card}>
			<div className={styles.top}>
				<Checkbox
					label="Enable"
					checked={isChecked}
					onChange={handleEnableChange}
				/>
				<Checkbox
					label="Auto-refresh every 5 second"
					checked={isAutoRefresh}
					onChange={handleAutoRefreshChange}
				/>
				<div className={styles.fetchWrapper}>
					<Button label="Get Cat" onClick={fetchCatImage} />
				</div>
			</div>
			<div
				className={styles.bottom}
			>
				<ImageCat catImage={catImage} />
			</div>
		</div>
	);
};

export default Card;
