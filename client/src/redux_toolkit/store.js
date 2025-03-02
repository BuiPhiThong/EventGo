
import {configureStore} from '@reduxjs/toolkit'
import speakerSlice from '../reducer/speakerReducer'
import authenReducer from '../reducer/authenReducer'

const store = configureStore({
    reducer:{
        speakerList : speakerSlice.reducer,
        authen      : authenReducer.reducer
    },
})

export default store