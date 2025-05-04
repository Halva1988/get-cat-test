import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const url =
	"https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";

export const useCatLogic = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [isAutoRefresh, setIsAutoRefresh] = useState(false);
	const [catImage, setCatImage] = useState(null);
	const [catDescription, setCatDescription] = useState(null);
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	const [wikiUrl, setWikiUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleMouseEnter = useCallback(() => {
		setIsTooltipVisible(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsTooltipVisible(false);
	}, []);

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
			setIsLoading(true);
			const response = await axios.get(url, {
				headers: {
					"x-api-key": API_KEY,
				},
			});
			if (response.data && response.data.length > 0) {
				const newImageUrl = response.data[0].url;
				const newWikiUrl = response.data[0].breeds[0]?.wikipedia_url;
				const newDescription = response.data[0].breeds[0]?.description;

				await new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = resolve;
					img.onerror = reject;
					img.src = newImageUrl;
				});
				
				setIsLoading(false);
				setCatImage(newImageUrl);
				setWikiUrl(newWikiUrl);
				setCatDescription(newDescription);
			}
		} catch (error) {
			console.error("Error fetching cat image:", error);
		}
	}, [isChecked]);

	useEffect(() => {
		if (isAutoRefresh && isChecked) {
			let isCancelled = false;

			const fetchWithDelay = async () => {
				while (!isCancelled) {
					await fetchCatImage();
					await new Promise((resolve) => setTimeout(resolve, 5000));
				}
			};

			fetchWithDelay();

			return () => {
				isCancelled = true;
			};
		}
	}, [isAutoRefresh, isChecked, fetchCatImage]);

	return {
		isChecked,
		isAutoRefresh,
		catImage,
		catDescription,
		handleEnableChange,
		handleAutoRefreshChange,
		fetchCatImage,
		handleMouseEnter,
		handleMouseLeave,
		isTooltipVisible,
		wikiUrl,
		isLoading
	};
};
