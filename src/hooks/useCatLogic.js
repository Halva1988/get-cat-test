import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const url =
	"https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";

export const useCatLogic = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [isAutoRefresh, setIsAutoRefresh] = useState(false);
	const [catImage, setCatImage] = useState(null);

	const handleEnableChange = useCallback((e) => {
		setIsChecked(e.target.checked);
	}, []);

	const handleAutoRefreshChange = useCallback((e) => {
		setIsAutoRefresh(e.target.checked);
	}, []);

	const fetchCatImage = useCallback(async () => {
		if (!isChecked) {
			return;
		}
		try {
			const response = await axios.get(url, {
				headers: {
					"x-api-key": API_KEY,
				},
			});
			if (response.data && response.data.length > 0) {
				setCatImage(response.data[0].url);
			}
		} catch (error) {
			console.error("Error fetching cat image:", error);
		}
	}, [isChecked]);

	useEffect(() => {
		if (isAutoRefresh && isChecked) {
			const interval = setInterval(() => {
				fetchCatImage();
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [isAutoRefresh, isChecked, fetchCatImage]);

  return {
		isChecked,
		isAutoRefresh,
		catImage,
		handleEnableChange,
		handleAutoRefreshChange,
		fetchCatImage,
	};
};
