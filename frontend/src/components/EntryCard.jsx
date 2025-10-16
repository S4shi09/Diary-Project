import React from 'react'

export default function EntryCard({ entry, onDelete }){
  return (
    <article className="card">
      <div className="card-header">
        <h3>{entry.title}</h3>
        <button className="delete" onClick={onDelete} title="Delete">✕</button>
      </div>
      <p className="meta">{new Date(entry.createdAt).toLocaleString()}</p>
      <p className="body">{entry.body}</p>
    </article>
  )
}
