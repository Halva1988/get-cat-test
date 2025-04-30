import Cat from "../../assets/cat.jpg";
import styles from "./ImageCat.module.css";
const ImageCat = ({ catImage }) => {
	return (
		<div className={styles.imgContainer}>
			{catImage ? (
				<img src={catImage} alt="Cat" />
			) : (
				<img src={Cat} alt="Default Cat" />
			)}
		</div>
	);
};

export default ImageCat;
