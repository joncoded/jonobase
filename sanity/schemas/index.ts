import base from './base.schema'
import heap from './heap.schema'
import list from './list.schema'
import post from './post.schema'
import side from './side.schema'
import wiki from './wiki.schema'
import zine from './zine.schema'

export const schemas = [base, heap, list, post, side, wiki, zine]

// the content "_type"s that one can "find" ("omnisearch" functionality)
export const findableTypes = `["post", "side", "wiki", "zine"]`