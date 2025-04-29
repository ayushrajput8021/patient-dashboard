/**
 * Format a date in a human readable format
 * @param date The date to format
 * @returns The formatted date string (e.g. "January 1, 2022")
 */
export const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

/**
 * Format a weight value in kg
 * @param weight The weight value in kg
 * @returns Formatted weight string (e.g. "75.5 kg")
 */
export const formatWeight = (weight: number): string => {
	return `${weight.toFixed(1)} kg`;
};

/**
 * Format a BMI value
 * @param bmi The BMI value
 * @returns Formatted BMI string with category
 */
export const formatBMI = (bmi: number): string => {
	let category = '';

	if (bmi < 18.5) {
		category = 'Underweight';
	} else if (bmi < 25) {
		category = 'Normal';
	} else if (bmi < 30) {
		category = 'Overweight';
	} else {
		category = 'Obese';
	}

	return `${bmi.toFixed(1)} (${category})`;
};
