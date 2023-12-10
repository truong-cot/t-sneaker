import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InfoUser {
	_id: string;
	account: string;
	avatar: string | null;
	createdAt?: string;
	dateOfBirth: Date | null;
	email: string;
	fullname: string;
	gender: {id: number | null; name: string | null};
	phone: string | null;
	token: string;
	updatedAt?: string;
	uuid: string;
	uuidAccount: string;
}

interface UserState {
	infoUser: InfoUser | null;
	uuidUser: string | null;
	uuidAccount: string | null;
}

const initialState: UserState = {
	infoUser: null,
	uuidUser: null,
	uuidAccount: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoUser: (state, action: PayloadAction<InfoUser | null>) => {
			state.infoUser = action?.payload;
		},
		setUuidUser: (state, action: PayloadAction<string | null>) => {
			state.uuidUser = action?.payload;
		},
		setUuidAccount: (state, action: PayloadAction<string | null>) => {
			state.uuidAccount = action?.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {setInfoUser, setUuidUser, setUuidAccount} = userSlice.actions;
export default userSlice.reducer;
