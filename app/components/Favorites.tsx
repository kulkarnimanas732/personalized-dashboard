// // import { useSelector } from 'react-redux'
// // import Card from '@/components/Card'

// // export default function FavoritesPage() {
// //   const favorites = useSelector((state: any) => state.favorites)

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">⭐ Your Favorites</h1>
// //       {favorites.length === 0 ? (
// //         <p className="text-gray-500">You haven’t added any favorites yet.</p>
// //       ) : (
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {favorites.map((fav: any) => (
// //             <Card key={fav.id} item={fav.data} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
// 'use client'

// import Dashboard from '../Layout/Dashboard'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../store'
// import ContentCard from '../components/ContentCard'
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from '@dnd-kit/core'
// import {
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
//   arrayMove,
// } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { reorderFavorites, clearFavorites } from '../features/favoritesSlice'

// function SortableCard({ item }: { item: any }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: String(item.id) })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     cursor: 'grab',
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <ContentCard {...item} />
//     </div>
//   )
// }

// export default function FavoritesPage() {
//   const dispatch = useDispatch()
//   const favorites = useSelector((state: RootState) => state.favorites)

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
//   )

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     if (!over || active.id === over.id) return

//     const oldIndex = favorites.findIndex((item) => String(item.id) === active.id)
//     const newIndex = favorites.findIndex((item) => String(item.id) === over.id)

//     const newOrder = arrayMove(favorites, oldIndex, newIndex)
//     dispatch(reorderFavorites(newOrder))
//   }

//   return (
//     <Dashboard>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">⭐ Your Favorites (Drag & Drop)</h1>
//           {favorites.length > 0 && (
//             <button
//               className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
//               onClick={() => dispatch(clearFavorites())}
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {favorites.length === 0 ? (
//           <p className="text-gray-500">You haven’t added any favorites yet.</p>
//         ) : (
//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext
//               items={favorites.map((item) => String(item.id))}
//               strategy={verticalListSortingStrategy}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {favorites.map((item) => (
//                   <SortableCard key={String(item.id)} item={{ ...item, id: String(item.id) }} />
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         )}
//       </div>
//     </Dashboard>
//   )
// }
