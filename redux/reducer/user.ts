import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InfoUser {
	_id: string;
	account: {
		_id: string;
		account: string;
		email: string;
		isAdmin: boolean;
	};
	avatar: string | null;
	fullname: string;
	gender: {
		id: number | null;
		name: string | null;
	};
	dateOfBirth: Date | null;
	phone: string | null;
	email: string;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}

interface UserState {
	infoUser: InfoUser | null;
}

const initialState: UserState = {
	infoUser: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoUser: (state, action: PayloadAction<InfoUser | null>) => {
			state.infoUser = action?.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {setInfoUser} = userSlice.actions;
export default userSlice.reducer;
