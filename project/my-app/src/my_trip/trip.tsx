import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TripDND from './tripDND';

export default function Trip() {
  return (
    <DndProvider backend={HTML5Backend}>
        <TripDND/>
    </DndProvider>
  )
}
