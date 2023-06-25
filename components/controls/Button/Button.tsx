import Image from 'next/image';
import Link from 'next/link';
import {MouseEventHandler} from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import {useStyleClass} from '~/common/hooks/usStyleClass';

interface props {
	onClick?: () => void;
	children?: React.ReactNode;
	href?: string;
	Icon?: any;
	notButton?: boolean;
	[props: string]: any;
}

function Button({
	children,
	onClick,
	href,
	className,
	target,
	Icon,
	notButton,
	...props
}: props): JSX.Element {
	const styleClass = useStyleClass(props, styles);

	let onClickHandler = null;

	let Wapper: any = notButton ? 'div' : 'button';
	let Comp: any = 'div';

	if (href) {
		Wapper = Link;
		Comp = 'div';
	}

	const handleClick = (e: any) => {
		if (props.disable) {
			e.preventDefault();
		}

		if (!props.disable && onClick) {
			onClick();
		}
	};

	if (!href) {
		onClickHandler = {
			onClick: handleClick,
		};
	}

	return (
		<Wapper
			className={styles.container}
			href={href as string}
			{...onClickHandler}
		>
			<Comp
				className={clsx([styleClass, styles.btn, className])}
				target={target}
			>
				{Icon ? <div className={styles.icon}>{Icon}</div> : null}
				<div className={styles.text}>{children}</div>
			</Comp>
		</Wapper>
	);
}

export default Button;
