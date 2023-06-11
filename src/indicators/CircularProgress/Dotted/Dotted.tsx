import React from "react";

import "./Dotted.scss";
import { DottedProps } from "./Dotted.types";
import Text from "../../../utils/Text";
import useStylesPipeline from "../../../hooks/useStylesPipeline";
import useAnimationPacer from "../../../hooks/useAnimationPacer";

const Dotted = (props: DottedProps) => {
	// Styles
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	const easingFn: string | undefined = props?.easing;
	const DEFAULT_ANIMATION_DURATION = "1.2s"; // Animation's default duration
	const { animationPeriod } = useAnimationPacer(
		props?.speedPlus,
		DEFAULT_ANIMATION_DURATION
	);

	/* Color SETTINGS */
	// Accept Array or String color prop and set all dots color
	let colorProp: string | string[] = props?.color ?? "";
	const dotsColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b dot-rli-bounding-box"
			style={
				{
					...(fontSize && { fontSize }),
					...(animationPeriod && {
						"--rli-animation-duration": animationPeriod
					}),
					...(easingFn && { "--rli-animation-function": easingFn })
				} as React.CSSProperties
			}
		>
			<span
				className="rli-d-i-b fading-dot-throbber"
				style={{ ...dotsColorStyles, ...styles }}
			>
				{Array.from({ length: 12 }).map((item, i) => (
					<span
						key={`fading-dot-${i}`}
						className={`rli-d-i-b fading-dot${i + 1} fading-dot-matter`}
						style={{ "--elem-pos": `${i + 1}` } as React.CSSProperties}
					></span>
				))}

				<Text
					className="fading-dot-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { Dotted };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		// Pick first item as the color
		const [color] = colorProp;

		stylesObject["color"] = color;

		return stylesObject;
	}

	stylesObject["color"] = colorProp;

	return stylesObject;
}
