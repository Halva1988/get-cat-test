import { memo } from "react";
import Cat from "../../assets/cat.jpg";
import styles from "./ImageCat.module.css";

const ImageCat = ({ catImage, wikiUrl }) => {
	return (
		<div className={styles.imgContainer}>
			{catImage ? (
				<a href={wikiUrl} target="_blank" rel="noopener noreferrer">
					<img src={catImage} alt="Cat" />
				</a>
			) : (
				<img src={Cat} alt="Default Cat" />
			)}
		</div>
	);
};

export default memo(ImageCat);
