import base from './base.schema'
import heap from './heap.schema'
import list from './list.schema'
import post from './post.schema'

export const schemas = [base, heap, list, post]

// TODO : put this in the backend
export const findableJoins = `["admin", "craft", "notes", "sides", "trips", "wikis"]`