import {useCallback, useMemo, useState} from 'react';
import {ContextForm} from './context';
import {PropsForm} from './interfaces';

function Form({children, form, setForm, onSubmit}: PropsForm) {
	const convertForm = Object.fromEntries(Object.entries(form).map(([key]) => [key, null]));

	const [countValidate, setCountValidate] = useState<number>(0);
	const [errorText, setErrorText] = useState<any>(convertForm);
	const [validate, setValidate] = useState<any>(null);

	const isDone = useMemo(() => {
		if (!validate) {
			return false;
		}

		for (let i in validate) {
			if (!validate[i]) {
				return false;
			}
		}
		return true;
	}, [validate]);

	const handleSubmit = useCallback(
		(e: any) => {
			e.preventDefault();
			if (isDone) {
				onSubmit();
			} else {
				setCountValidate(countValidate + 1);
			}
		},

		[countValidate, isDone, onSubmit]
	);

	return (
		<ContextForm.Provider
			value={{
				form,
				setForm,
				errorText,
				setErrorText,
				validate,
				setValidate,
				countValidate,
				setCountValidate,
				isDone,
			}}
		>
			<form onSubmit={handleSubmit}>{children}</form>
		</ContextForm.Provider>
	);
}

export default Form;
