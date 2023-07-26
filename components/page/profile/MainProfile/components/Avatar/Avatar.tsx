import {AiFillCamera} from 'react-icons/ai';
import styles from './Avatar.module.scss';
import ImageWithFallback from '~/components/common/ImageWithFallback';

function Avatar({src, name, onChange}: any) {
	return (
		<div className={styles.container}>
			{src ? <ImageWithFallback className={styles.avatar} src={src} layout='fill' alt='avatar' /> : null}
			<label className={styles.input}>
				<AiFillCamera />
				<input
					hidden
					type='file'
					name={name}
					onChange={onChange}
					onClick={(e: any) => (e.target.value = null)}
				/>
			</label>
		</div>
	);
}

export default Avatar;
