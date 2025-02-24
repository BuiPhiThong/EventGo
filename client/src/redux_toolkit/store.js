
import {configureStore} from '@reduxjs/toolkit'
import speakerSlice from '../reducer/speakerReducer'

const store = configureStore({
    reducer:{
        speakerList : speakerSlice.reducer
    },
})

export default store