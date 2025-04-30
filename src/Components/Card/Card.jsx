import styles from "./Card.module.css";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import ImageCat from "../ImageCat/ImageCat";
import { useCatLogic } from "../../hooks/useCatLogic";
import Tooltip from "../Tooltip/Tooltip";
import { useState } from "react";

const Card = () => {
	const {
		isChecked,
		isAutoRefresh,
		catImage,
		catDescription,
		handleEnableChange,
		handleAutoRefreshChange,
		fetchCatImage,
	} = useCatLogic();
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const handleMouseEnter = () => {
		setIsTooltipVisible(true);
	};

	const handleMouseLeave = () => {
		setIsTooltipVisible(false);
	};

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
				<Button label="Get Cat" onClick={fetchCatImage} />
			</div>
			<div
				className={styles.bottom}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<ImageCat catImage={catImage} />
				{isTooltipVisible && catDescription && (
					<Tooltip catDescription={catDescription} />
				)}
			</div>
		</div>
	);
};

export default Card;
