import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'

export default function useNote() {
    return useContext(NoteContext)
}