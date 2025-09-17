import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chats : []
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        addChat:(state, action)=>{
            state.chats.push({
                "question":action.payload.question,
                "answer":action.payload.answer
            })
        },
        addHistory:(state, action) => {
            state.chats = action.payload
        }
    }
})


export const {addChat, addHistory} = chatSlice.actions
export default chatSlice.reducer