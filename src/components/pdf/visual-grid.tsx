"use client";

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageThumbnail } from '@/lib/pdf-thumbnails';

interface SortableItemProps {
  id: number;
  thumbnail: PageThumbnail;
  isSelected: boolean;
  onToggle: (id: number) => void;
  mode: 'select' | 'reorder';
}

function SortableItem({ id, thumbnail, isSelected, onToggle, mode }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        isDragging ? 'opacity-50 z-50 shadow-2xl scale-105' : 'opacity-100'
      } ${isSelected ? 'border-primary shadow-md ring-2 ring-primary/20' : 'border-border hover:border-text-faint'}`}
    >
      {/* Drag Handle (Only in Reorder Mode) */}
      {mode === 'reorder' && (
        <div {...listeners} {...attributes} className="absolute top-2 left-2 z-10 p-1 bg-black/50 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
        </div>
      )}

      {/* Selection Checkbox (Only in Select Mode) */}
      {mode === 'select' && (
        <button 
          onClick={() => onToggle(id)}
          className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isSelected ? 'bg-primary text-white' : 'bg-white/80 text-text-muted hover:bg-white'
          }`}
        >
          {isSelected && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </button>
      )}

      {/* Thumbnail Image */}
      <div className="bg-background aspect-[3/4] flex items-center justify-center p-1">
        <img src={thumbnail.dataUrl} alt={`Page ${thumbnail.pageNumber}`} className="max-w-full max-h-full object-contain shadow-sm" />
      </div>

      {/* Page Number Footer */}
      <div className={`py-1.5 text-center text-xs font-semibold ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-muted border-t border-border'}`}>
        Page {thumbnail.pageNumber}
      </div>
    </div>
  );
}

interface VisualGridProps {
  thumbnails: PageThumbnail[];
  selectedPages: number[];
  onSelectionChange: (pages: number[]) => void;
  onReorder: (newOrder: number[]) => void;
  mode: 'select' | 'reorder';
}

export default function VisualGrid({ thumbnails, selectedPages, onSelectionChange, onReorder, mode }: VisualGridProps) {
  const [items, setItems] = useState(thumbnails.map(t => t.pageNumber));

  useEffect(() => {
    setItems(thumbnails.map(t => t.pageNumber));
  }, [thumbnails]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        onReorder(newItems);
        return newItems;
      });
    }
  };

  const handleToggle = (id: number) => {
    if (selectedPages.includes(id)) {
      onSelectionChange(selectedPages.filter(p => p !== id));
    } else {
      onSelectionChange([...selectedPages, id]);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((id) => {
            const thumbnail = thumbnails.find(t => t.pageNumber === id);
            if (!thumbnail) return null;
            return (
              <SortableItem 
                key={id} 
                id={id} 
                thumbnail={thumbnail} 
                isSelected={selectedPages.includes(id)} 
                onToggle={handleToggle}
                mode={mode}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
